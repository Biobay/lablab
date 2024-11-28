import os
import requests
from crewai_tools import tool
from dotenv import load_dotenv

# Carica le variabili di ambiente
load_dotenv()

API_KEY = os.getenv("OPENROUTER_API_KEY")
SITE_URL = os.getenv("YOUR_SITE_URL", "https://default-site.com")
APP_NAME = os.getenv("YOUR_APP_NAME", "DefaultAppName")
API_BASE_URL = "https://openrouter.ai/api/v1"


@tool
def call_openrouter(model: str, prompt: str) -> str:
    """
    Utilizza l'API OpenRouter per generare una risposta da un modello AI.

    Args:
        model (str): Nome del modello da utilizzare (es. "openai/gpt-3.5-turbo").
        prompt (str): Testo inviato al modello.

    Returns:
        str: Risposta generata dal modello.
    """
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "HTTP-Referer": SITE_URL,
        "X-Title": APP_NAME,
        "Content-Type": "application/json",
    }

    data = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}]
    }

    try:
        response = requests.post(f"{API_BASE_URL}/chat/completions", headers=headers, json=data)
        response.raise_for_status()  # Solleva eccezioni in caso di errori HTTP
        return response.json()["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        return f"Errore durante la richiesta a OpenRouter: {e}"
