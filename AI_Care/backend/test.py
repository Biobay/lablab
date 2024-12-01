import asyncio
from ai_service import analyze_with_ai

async def test_ai_service():
    input_text = "C'è una buca sulla strada in Via Roma, vicino al civico 10."
    response = await analyze_with_ai(input_text)
    print(response)

if __name__ == "__main__":
    asyncio.run(test_ai_service())