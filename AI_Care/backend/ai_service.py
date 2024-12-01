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
system = """Sei un assistente specializzato nell'analisi di segnalazioni urbane.
Analizza la segnalazione e fornisci una risposta strutturata che includa:
1. Classificazione del problema
2. Livello di priorità (alta/media/bassa)
3. Suggerimenti per la risoluzione
4. Tempo stimato per l'intervento."""

human = "{input}"

prompt = ChatPromptTemplate.from_messages([
    ("system", system),
    ("human", human)
])

# Catena per generare la risposta
chain = prompt | chat

async def analyze_with_ai(input_text: str) -> str:
    response = await chain.ainvoke({"input": input_text})
    return response.content
