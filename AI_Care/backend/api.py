from datetime import datetime
from typing import Dict, List, Optional
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from config import get_settings, Settings
from ai_service import analyze_with_ai
from database import get_db_connection

router = APIRouter()

class Segnalazione(BaseModel):
    descrizione: str
    tipo: str
    posizione: Dict[str, float]  # {lat: float, lng: float}
    foto_url: Optional[str] = None

class RispostaSegnalazione(BaseModel):
    id: int
    stato: str
    priorita: str
    analisi: str
    data_creazione: str

@router.post("/segnalazioni", response_model=RispostaSegnalazione)
async def crea_segnalazione(segnalazione: Segnalazione):
    try:
        # Analisi con AI
        input_text = f"Tipo: {segnalazione.tipo}\nDescrizione: {segnalazione.descrizione}\nPosizione: {segnalazione.posizione}"
        analisi = await analyze_with_ai(input_text)

        # Connessione al database
        conn = get_db_connection()
        cursor = conn.cursor()

        # Inserimento nel database
        cursor.execute("""
            INSERT INTO segnalazioni (tipo, descrizione, posizione_lat, posizione_lng, foto_url, stato, priorita, analisi, data_creazione)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            segnalazione.tipo,
            segnalazione.descrizione,
            segnalazione.posizione["lat"],
            segnalazione.posizione["lng"],
            segnalazione.foto_url,
            "Aperta",  # Stato iniziale
            "Media",   # Priorità default
            analisi,
            datetime.now().isoformat()
        ))
        
        # Get the ID of the inserted row
        segnalazione_id = cursor.lastrowid
        
        conn.commit()
        conn.close()

        # Restituisci la segnalazione creata
        return {
            "id": segnalazione_id,
            "stato": "Aperta",
            "priorita": "Media",
            "analisi": analisi,
            "data_creazione": datetime.now().isoformat()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/segnalazioni", response_model=List[RispostaSegnalazione])
async def lista_segnalazioni():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, stato, priorita, analisi, data_creazione FROM segnalazioni")
        segnalazioni = cursor.fetchall()
        conn.close()

        return [
            {
                "id": s[0],
                "stato": s[1],
                "priorita": s[2],
                "analisi": s[3],
                "data_creazione": s[4]
            }
            for s in segnalazioni
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/segnalazioni/{segnalazione_id}", response_model=RispostaSegnalazione)
async def dettaglio_segnalazione(segnalazione_id: int):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, stato, priorita, analisi, data_creazione
            FROM segnalazioni
            WHERE id = ?
        """, (segnalazione_id,))
        
        segnalazione = cursor.fetchone()
        conn.close()

        if segnalazione is None:
            raise HTTPException(status_code=404, detail="Segnalazione non trovata")

        return {
            "id": segnalazione[0],
            "stato": segnalazione[1],
            "priorita": segnalazione[2],
            "analisi": segnalazione[3],
            "data_creazione": segnalazione[4]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))