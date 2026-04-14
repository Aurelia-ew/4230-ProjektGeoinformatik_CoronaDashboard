import pandas as pd
from sqlalchemy import create_engine

print("START")

engine = create_engine(
    "postgresql+psycopg2://postgres:2307@127.0.0.1:5432/Corona_DB"
)

# -------------------------------
# CSV LADEN
# -------------------------------
csv_path = r"C:\Users\schmi\OneDrive - FHNW\W-4230-Projekt-Geoinformatik_M365 - General\einwohner_kantone_2021.csv"

print("Lade CSV...")

df = pd.read_csv(csv_path)

print(df.head())  # Kontrolle

# -------------------------------
# SPALTEN UMBENENNEN
# -------------------------------
df = df.rename(columns={
    "Kanton": "kantonskuerzel",
    "Einwohner_2021": "einwohner"
})

# Datentyp sichern
df["einwohner"] = df["einwohner"].astype(int)

# -------------------------------
# IN DB SPEICHERN
# -------------------------------
print("Importiere in Datenbank...")

df.to_sql(
    name="kantone_einwohner",
    con=engine,
    if_exists="replace",
    index=False
)

print("FERTIG!")