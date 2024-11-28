from crewai_tools import tool

#PER INSTRADARE LE RICHIESTE
@tool
def route_request(category: str) -> str:
    routes = {
        "health": "health_monitor",
        "transport": "transport_manager",
    }
    return routes.get(category, "orchestrator")
