from fastapi import APIRouter, HTTPException
from models import Segnalazione, RispostaSegnalazione
from ai_service import analyze_with_ai
from utils import save_to_database

router = APIRouter()

@router.post("/segnalazioni", response_model=RispostaSegnalazione)
async def crea_segnalazione(segnalazione: Segnalazione):
    """
    Crea una segnalazione, genera consigli e salva la segnalazione nel database.
    """
    try:
        # Analizza la segnalazione e genera consigli
        analisi = await analyze_with_ai(segnalazione.descrizione)
        
        # Salva la segnalazione nel database
        segnalazione_id = save_to_database(segnalazione, analisi["classificazione"])

        # Restituisci la segnalazione creata con i consigli
        return {
            "id": segnalazione_id,
            "stato": "Aperta",
            "priorita": analisi["priorita"],
            "analisi": analisi,
            "data_creazione": datetime.now().isoformat(),
            "suggerimenti": analisi["suggerimenti"],
            "tempo_stimato": analisi["tempo_stimato"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))