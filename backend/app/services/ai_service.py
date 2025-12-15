import os
from groq import Groq

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

async def ai_response(prompt: str) -> str:
    res = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[{"role": "user", "content": prompt}]
    )
    return res.choices[0].message.content
