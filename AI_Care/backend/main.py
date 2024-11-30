from fastapi import FastAPI
from crewai import Agent, Task, Crew
from crewai.tasks import TaskOutput
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Define your agents
researcher = Agent(
    role='Researcher',
    goal='Research and analyze patient data',
    backstory='You are an expert medical researcher with years of experience in analyzing patient data.',
    verbose=True,
    allow_delegation=False
)

doctor = Agent(
    role='Doctor',
    goal='Provide medical recommendations',
    backstory='You are an experienced doctor specializing in providing medical recommendations based on patient data.',
    verbose=True,
    allow_delegation=False
)

@app.post("/analyze-patient")
async def analyze_patient(patient_data: dict):
    # Create tasks for your agents
    research_task = Task(
        description=f"Analyze the following patient data and create a detailed report: {patient_data}",
        agent=researcher
    )
    
    recommendation_task = Task(
        description="Based on the research report, provide medical recommendations",
        agent=doctor
    )

    # Create a crew with your agents
    crew = Crew(
        agents=[researcher, doctor],
        tasks=[research_task, recommendation_task],
        verbose=True
    )

    # Execute the crew's tasks
    result = crew.kickoff()
    
    return {"analysis": result}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
