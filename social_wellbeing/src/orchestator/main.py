from crew import initialize_crew

if __name__ == "__main__":
    crew = initialize_crew()
    inputs = {"category": "health", "patient_id": "12345"}
    result = crew.kickoff(inputs=inputs)
    print(result)
