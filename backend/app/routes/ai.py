from fastapi import APIRouter
from app.services.ai_service import ai_response

router = APIRouter()

@router.post("/ai")
async def ask_ai(prompt: str):
    reply = await ai_response(prompt)
    return {"response": reply}
