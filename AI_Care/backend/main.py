import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from api import router as api_router

# Inizializzazione del server FastAPI
app = FastAPI(title="AI CARE - Sistema Segnalazioni Intelligenti")

# Configurazione CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In produzione, specificare i domini consentiti
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include le rotte definite nell'API
app.include_router(api_router)

if __name__ == "__main__":import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import init_db
from api import router as api_router

# Inizializzazione del server FastAPI
app = FastAPI(title="AI CARE - Sistema Segnalazioni Intelligenti")

# Configurazione CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In produzione, specificare i domini consentiti
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include le rotte definite nell'API
app.include_router(api_router)

# Aggiungi un endpoint di base
@app.get("/")
async def read_root():
    return {"message": "Benvenuto nell'API AI CARE"}

if __name__ == "__main__":
    print("Inizializzazione del database...")
    init_db()  # Inizializza il database
    print("Avvio del server AI CARE...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, log_level="info")
    print("Inizializzazione del database...")
    init_db()  # Inizializza il database
    print("Avvio del server AI CARE...")
    uvicorn.run(app, host="0.0.0.0", port=8000)