import { GoogleGenAI } from "@google/genai"
import { NextResponse } from "next/server"

const ai = new GoogleGenAI({})

export async function POST(req: Request) {
  try {
    const { transcribed, language } = await req.json()
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Translate the following text into ${language}:

"${transcribed}"`,
      config: {
        systemInstruction: `
You are a professional medical translator.

Rules:
- Output ONLY the translated sentence.
- Do NOT explain anything.
- Do NOT use bullet points, asterisks, or formatting.
- Do NOT include quotes.
- Do NOT add extra words.
- Keep it natural and grammatically correct.
- If input is informal or contains typos, correct it before translating.
- Preserve medical meaning and use proper medical terminology when appropriate.

Your output must look like Google Translate.
        `,
      },
    })
    console.log(response.text)
    return NextResponse.json(response.text)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Translation failed" }, { status: 500 })
  }
}
