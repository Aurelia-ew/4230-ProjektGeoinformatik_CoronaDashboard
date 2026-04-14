import geopandas as gpd
from sqlalchemy import create_engine

# DB Verbindung
engine = create_engine(
    "postgresql+psycopg2://postgres:2307@127.0.0.1:5432/Corona_DB"
)

try:
    with engine.connect() as conn:
        print("DB Verbindung erfolgreich!")
except Exception as e:
    print("DB Fehler:", e)
    exit()

shapefile_path = r"C:\Users\schmi\OneDrive - FHNW\W-4230-Projekt-Geoinformatik_M365 - General\swissboundaries3d_2026-01_2056_5728.shp\swissBOUNDARIES3D_1_5_TLM_KANTONSGEBIET.shp"

# Datei laden
gdf = gpd.read_file(shapefile_path)

print("Spalten im Datensatz:")
print(gdf.columns)

# Spalten anpassen
if "KANTON" in gdf.columns:
    gdf = gdf.rename(columns={"KANTON": "kantonskuerzel"})

if "NAME" in gdf.columns:
    gdf = gdf.rename(columns={"NAME": "name"})

# Nur relevante Spalten behalten
keep_cols = [col for col in ["kantonskuerzel", "name", "geometry"] if col in gdf.columns]
gdf = gdf[keep_cols]

print("Importiere in Datenbank...")

# In PostgreSQL speichern
gdf.to_postgis(
    name="kantonsflaechen",
    con=engine,
    if_exists="replace",
    index=False
)

print("Fertig! Kantonsflächen importiert.")