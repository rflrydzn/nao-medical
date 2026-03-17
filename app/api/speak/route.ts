import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js"

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { inputs } = await req.json()

    const audio = await elevenlabs.textToDialogue.convert({ inputs })

    return new Response(audio, {
      headers: { "Content-Type": "audio/mpeg" },
    })
  } catch (err) {
    console.error("ELEVENLABS ERROR:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}
