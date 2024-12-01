from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from config import get_settings

settings = get_settings()

# Configurazione del modello AI
chat = ChatGroq(
    model_name=settings.model_name,
    temperature=settings.temperature,
    groq_api_key=settings.groq_api_key
)

# Template per analisi
system_prompt = """
Sei un assistente che analizza segnalazioni urbane.
Per ogni segnalazione, fornisci una risposta strutturata che includa:
1. Classificazione del problema (es. buca, lampione rotto, rifiuti).
2. Livello di priorità del problema (alta, media, bassa).
3. Suggerimenti per la risoluzione.
4. Tempo stimato per l'intervento.
5. Se possibile, suggerisci una modalità per aggirare o schivare il problema (es. percorso alternativo, evitare la zona, ecc.).
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}")
])

# Funzione per analizzare con l'AI
async def analyze_with_ai(input_text: str) -> dict:
    """
    Analizza il testo fornito dall'utente utilizzando un modello AI
    e restituisce una risposta strutturata.
    
    :param input_text: Descrizione fornita dall'utente.
    :return: Dizionario con classificazione, priorità, suggerimenti, tempo stimato e suggerimenti per aggirare il problema.
    """
    # Crea la catena di analisi
    chain = prompt | chat
    response = await chain.ainvoke({"input": input_text})
    
    # Parsing della risposta AI
    try:
        lines = response.content.strip().split("\n")
        result = {
            "classificazione": lines[0].split(":")[1].strip(),
            "priorita": lines[1].split(":")[1].strip(),
            "suggerimenti": lines[2].split(":")[1].strip(),
            "tempo_stimato": lines[3].split(":")[1].strip(),
            "aggirare": lines[4].split(":")[1].strip()  # Nuovo campo per il suggerimento
        }
        return result
    except Exception as e:
        raise ValueError(f"Errore nel parsing della risposta AI: {e}")
