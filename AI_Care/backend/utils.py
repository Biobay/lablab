import sqlite3
from datetime import datetime
from models import Segnalazione
from database import get_db_connection

def save_to_database(segnalazione: Segnalazione, classificazione: str) -> int:
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO segnalazioni (tipo, descrizione, posizione_lat, posizione_lng, foto_url, stato, priorita, analisi_ai, data_creazione)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        segnalazione.tipo,
        segnalazione.descrizione,
        segnalazione.posizione["lat"],
        segnalazione.posizione["lng"],
        segnalazione.foto_url,
        "Aperta",  # Stato iniziale
        "Media",   # Priorità default
        classificazione,
        datetime.now().isoformat()
    ))
    segnalazione_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return segnalazione_id