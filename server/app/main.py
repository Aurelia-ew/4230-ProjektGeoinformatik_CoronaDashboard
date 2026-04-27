from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from psycopg2 import pool
from datetime import date, datetime

app = FastAPI()

# -----------------------------
# CORS Einstellungen
# -----------------------------
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Root
# -----------------------------
@app.get("/")
async def root():
    return {"message": "Backend läuft!"}

# -----------------------------
# Datenbank Verbindung
# -----------------------------
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "Corona_DB"
DB_USER = "postgres"
DB_PASSWORD = "Postgres2026"

db_pool = pool.SimpleConnectionPool(
    1,
    10,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)

# -----------------------------
# Mapping Funktion
# -----------------------------
def get_column(thema: str, is_ch: bool = False):

    if is_ch:
        # 🔥 SCHWEIZ (mit _CH und Anführungszeichen!)
        if thema == "Tägliche Neuansteckungen CH":
            return '"Tägliche Neuansteckungen CH"'
        elif thema == "Ansteckungen CH":
            return '"Ansteckungen CH"'
        elif thema == "Todesfälle CH":
            return '"Todesfälle CH"'
        elif thema == "Hospitalisierungen CH":
            return '"Hospitalisierungen CH"'
    else:
        if thema == "Tägliche_Neuansteckungen":
            return '"Tägliche_Neuansteckungen"'
        elif thema == "Ansteckungen":
            return '"Ansteckungen"'
        elif thema == "Todesfaelle":
            return '"Todesfälle"'
        elif thema == "Hospitalisierungen":
            return '"Hospitalisierungen"'

    raise HTTPException(status_code=400, detail="Ungültiges Thema")

# --------------------------------
# ENDPOINT Diagramme (corona_data)
# --------------------------------
@app.get("/corona")
async def get_corona(kanton: str):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()

        query = """
            SELECT
                date,
                "Ansteckungen",
                "Hospitalisierungen",
                "Todesfälle",
                "Tägliche Neuansteckungen"
            FROM public.corona_data
            WHERE kantonskuerzel = %s
            ORDER BY date """

        cur.execute(query, (kanton,))
        rows = cur.fetchall()

        if not rows:
            return []

        return [
            {
                "date": row[0].replace("\n", "").strip() if row[0] else None,
                "Ansteckungen": row[1],
                "Hospitalisierungen": row[2],
                "Todesfaelle": row[3],
                "Taegliche_Neuansteckungen": row[4],
            }
            for row in rows
        ]

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

    finally:
        if conn:
            db_pool.putconn(conn)

# -----------------------------
# ENDPOINT Karten (corona_data)
# -----------------------------
@app.get("/corona-map")
async def get_corona_map(datum: str):
    conn = None
    try:
        conn= db_pool.getconn()
        cur = conn.cursor()
        query = """
            SELECT
                kantonskuerzel,
                date,
                "Ansteckungen",
                "Hospitalisierungen",
                "Todesfälle",
                "Tägliche Neuansteckungen"
            FROM public.corona_data
            WHERE date = %s
            ORDER BY kantonskuerzel"""
        
        cur.execute(query, (datum, ))
        rows = cur.fetchall()

        return [{
                "kanton": row[0],
                "date": row[1],
                "Ansteckungen": row[2],
                "Hospitalisierungen": row[3],
                "Todesfaelle": row[4],
                "Taegliche_Neuansteckungen": row[5],
        } for row in rows]
    
    finally:
        if conn:
            db_pool.putconn(conn)

# -----------------------------
# SCHWEIZ ENDPOINT (_CH)
# -----------------------------
@app.get("/schweiz")
async def get_schweiz(datum: str, thema: str):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()

        column = get_column(thema, is_ch=True)

        query = f"""
            SELECT date, {column}
            FROM public.schweiz
            WHERE date = %s
        """

        cur.execute(query, (datum,))
        result = cur.fetchone()

        if not result:
            return {"message": "Keine Daten gefunden"}

        return {
            "datum": result[0],
            f"{thema}_CH": result[1]
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

    finally:
        if conn:
            db_pool.putconn(conn)

# -----------------------------
# EINWOHNER
# -----------------------------
@app.get("/einwohner")
async def get_einwohner(kanton: str):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()

        query = """
            SELECT kantonskuerzel, einwohner
            FROM public.kantone_einwohner
            WHERE kantonskuerzel = %s
        """

        cur.execute(query, (kanton,))
        result = cur.fetchone()

        if not result:
            return {"message": "Keine Daten gefunden"}

        return {
            "kanton": result[0],
            "einwohner": result[1]
        }

    finally:
        if conn:
            db_pool.putconn(conn)

# -----------------------------
# DURCHSCHNITT
# -----------------------------
@app.get("/durchschnitt")
async def get_durchschnitt(kanton: str):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()

        query = """
            SELECT kantonskuerzel, durchschnitt_faelle_pro_tag
            FROM public.durchschnitt_faelle_kanton
            WHERE kantonskuerzel = %s
        """

        cur.execute(query, (kanton,))
        result = cur.fetchone()

        if not result:
            return {"message": "Keine Daten gefunden"}

        return {
            "kanton": result[0],
            "durchschnitt": result[1]
        }

    finally:
        if conn:
            db_pool.putconn(conn)