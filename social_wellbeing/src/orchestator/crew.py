from crewai import Agent, Task, Crew, Process  # Importa le classi principali
from tools.openrouter_tool import call_openrouter  # Tool OpenRouter

def initialize_crew():
    # Configura l'agente orchestratore
    orchestrator = Agent.from_yaml("src/orchestrator/config/agents.yaml", "orchestrator")
    orchestrator.tools.append(call_openrouter)

    # Configura i task principali
    dispatch_task = Task.from_yaml("src/orchestrator/config/tasks.yaml", "dispatch_task")

    # Configura il Crew
    crew = Crew(
        agents=[orchestrator],
        tasks=[dispatch_task],
        process=Process.sequential
    )
    return crew
