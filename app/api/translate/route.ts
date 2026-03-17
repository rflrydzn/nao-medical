import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const ai = new GoogleGenAI({})

export async function POST(req: Request) {
  try {
    const { transcribed, language } = await req.json()
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate ${transcribed} to ${language}`,
      config: {
        systemInstruction: "You are a translator.",
      },
    })
    console.log(response.text)
    return NextResponse.json(response.text)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}
