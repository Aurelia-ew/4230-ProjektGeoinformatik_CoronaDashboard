from fastapi import FastAPI, HTTPException, status
from fastapi.responses import HTMLResponse, ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware
from psycopg2 import pool
from pydantic import BaseModel

app = FastAPI()

# -----------------------------
# CORS Einstellungen
# -----------------------------
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
async def root():
    return {"message": "Hello GDI Project"}

# -----------------------------
# About Seite
# -----------------------------
@app.get("/about/")
def about():
    return HTMLResponse(
    """
    <html>
      <head>
        <title>FAST API Service</title>
      </head>
      <body>
        <div align="center">
          <h1>Simple FastAPI Server</h1>
          <p>API Docs: <a href="http://localhost:8000/docs">/docs</a></p> 
        </div>
      </body>
    </html>
    """
    )

# -----------------------------
# Beispiel GeoJSON Endpoint
# -----------------------------
@app.get("/points/", response_class=ORJSONResponse)
async def read_points():
    return ORJSONResponse({
        "type": "FeatureCollection",
        "features": []
    })

# -----------------------------
# Test Endpoint
# -----------------------------
@app.post("/square")
def square(some_number: int) -> dict:
    return {"result": some_number**2}

# -----------------------------
# Datenbank Verbindung
# -----------------------------
DB_HOST = "localhost"
DB_PORT = 5432
DB_NAME = "Corona_DB"
DB_USER = "postgres"
DB_PASSWORD = "2307"
DB_POOL_MIN_CONN = 1
DB_POOL_MAX_CONN = 10

db_pool = pool.SimpleConnectionPool(
    DB_POOL_MIN_CONN,
    DB_POOL_MAX_CONN,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD
)

# -----------------------------
# Corona Endpoint (WICHTIG)
# -----------------------------
@app.get("/corona")
async def get_corona_data(kanton: str, datum: str, thema: str):
    conn = None
    try:
        conn = db_pool.getconn()
        cur = conn.cursor()

        # Thema → Spalte mapping
        if thema == "faelle":
            column = "neue_faelle"
        elif thema == "todesfaelle":
            column = "total_tod"
        elif thema == "hospitalisiert":
            column = "aktuelle_hosp"
        else:
            raise HTTPException(status_code=400, detail="Ungültiges Thema")

        # SQL Query
        query = f"""
            SELECT date, kantonskuerzel, {column}
            FROM corona_data
            WHERE kantonskuerzel = %s AND date = %s
        """

        cur.execute(query, (kanton, datum))
        result = cur.fetchone()

        if not result:
            return {"message": "Keine Daten gefunden"}

        return {
            "datum": result[0],
            "kanton": result[1],
            "wert": result[2]
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

    finally:
        if conn:
            db_pool.putconn(conn)