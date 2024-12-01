from pydantic import BaseModel
from typing import Dict, Optional

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
