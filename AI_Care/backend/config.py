from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """
    Classe per gestire le configurazioni dell'applicazione.
    """
    groq_api_key: str
    model_name: str = "mixtral-8x7b-32768"
    temperature: float = 0.7
    database_url: str = "sqlite:///./segnalazioni.db"

    class Config:
        """
        Configurazione della classe Settings.
        """
        env_file = ".env"
        env_file_encoding = "utf-8"
        protected_namespaces = ("settings_",)  # Cambia il namespace protetto

@lru_cache()
def get_settings():
    """
    Restituisce un'istanza della classe Settings.
    """
    return Settings()
