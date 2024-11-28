from crewai_tools import tool

@tool
def fetch_health_data(patient_id: str) -> str:
    # Simulazione di raccolta dati
    return f"Dati raccolti per il paziente {patient_id}: battito cardiaco 72 bpm, pressione 120/80."
