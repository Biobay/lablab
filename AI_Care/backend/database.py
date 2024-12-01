import sqlite3
from config import get_settings

settings = get_settings()

def init_db():
    """Inizializza il database SQLite con la tabella necessaria."""
    conn = sqlite3.connect(settings.database_url.split("///")[1])  # Estrarre il percorso per SQLite
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS segnalazioni (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            descrizione TEXT,
            tipo TEXT,
            posizione_lat REAL,
            posizione_lng REAL,
            priorita TEXT,
            stato TEXT,
            analisi_ai TEXT,
            data_creazione TIMESTAMP,
            data_aggiornamento TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def get_db_connection():
    """Ottieni una connessione al database."""
    return sqlite3.connect(settings.database_url.split("///")[1])
