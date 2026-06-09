from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from psycopg2 import pool

app = FastAPI()

# -----------------------------
# CORS Einstellungen
# -----------------------------
origins = [
    "http://localhost",
    "http://10.175.27.52:8080",
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
# ENDPOINT Coronadaten für Diagramme pro Kanton 
# Datenbank: corona_data
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
# ENDPOINT Corondaten für die Karte nach Datum 
# Datenbank: corona_data
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
        result = cur.fetchall()

        return [{
                "kanton": res[0],
                "date": res[1],
                "Ansteckungen": res[2],
                "Hospitalisierungen": res[3],
                "Todesfaelle": res[4],
                "Taegliche_Neuansteckungen": res[5],
        } for res in result]
    
    finally:
        if conn:
            db_pool.putconn(conn)

# -----------------------------
# ENDPOINT Coronadaten der Schweiz nach Datum
# Datenbank: schweiz
# -----------------------------
@app.get("/schweiz")
async def get_schweiz(datum: str):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()
        query = """
            SELECT 
            date,
            "Tägliche Neuansteckungen CH",
            "Ansteckungen CH",
            "Hospitalisierungen CH",
            "Todesfälle CH"
            FROM public.schweiz
            WHERE date = %s
        """

        cur.execute(query, (datum,))
        result = cur.fetchall()

        return [{
            "datum": res[0],
            "Ansteckungen":res[2],
            "Taegliche_Neuansteckungen":res[1],
            "Todesfaelle": res[4],
            "Hospitalisierungen": res[3],
        } for res in result]

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

    finally:
        if conn:
            db_pool.putconn(conn)

# -----------------------------
# ENDPOINT Corondadaten Schweiz für Diagramm
# Datenbank: schweiz
# -----------------------------
@app.get("/schweiz-verlauf")
async def get_schweiz_verlauf():
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()
        query = """
            SELECT 
            date,
            "Tägliche Neuansteckungen CH",
            "Ansteckungen CH",
            "Hospitalisierungen CH",
            "Todesfälle CH"
            FROM public.schweiz
            ORDER BY date
        """

        cur.execute(query, ())
        result = cur.fetchall()

        return [{
            "date": res[0].replace("\n", "").strip() if res[0] else None,
            "Ansteckungen":res[2],
            "Taegliche_Neuansteckungen":res[1],
            "Todesfaelle": res[4],
            "Hospitalisierungen": res[3],
        } for res in result]

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

    finally:
        if conn:
            db_pool.putconn(conn)

# -----------------------------
# ENDPOINT Durchschnittscoronazaheln der Kantone für Sidebar
# Datenbank: durchschnitt_faelle_kanton
# -----------------------------
@app.get("/durchschnitt")
async def get_durchschnitt(kanton: str):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()

        query = """
            SELECT 
            kantonskuerzel, 
            einwohner,
            total_faelle,
            anzahl_tage,
            durchschnitt_faelle_pro_tag,
            totale_todesfaelle
            FROM public.durchschnitt_faelle_kanton
            WHERE kantonskuerzel = %s
        """

        cur.execute(query, (kanton,))
        result = cur.fetchall()

        return [{
            "kanton": res[0],
            "einwohner": res[1],
            "total_faelle": res[2],
            "aufzeichnungstage": res[3],
            "durchschnitt": res[4],
            "total_todesfaelle": res[5]
        } for res in result]

    finally:
        if conn:
            db_pool.putconn(conn)

# -----------------------------
# ENDPOINT Kantonsflächen in km^2 für die Sidebar
# Datenbank: kantonsflaechen
# -----------------------------
@app.get("/flaeche")
async def get_flaechen(kanton: str):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()

        query = """
            SELECT 
            kantonskuerzel, 
            flaeche_km2
            FROM public.kantonsflaechen
            WHERE kantonskuerzel = %s
        """

        cur.execute(query, (kanton,))
        result = cur.fetchall()

        return [{
            "kanton": res[0],
            "flaeche": res[1],
        } for res in result]

    finally:
        if conn:
            db_pool.putconn(conn)