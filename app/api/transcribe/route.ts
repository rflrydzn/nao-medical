import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js"
import { NextResponse } from "next/server"

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
})

export async function GET(req: Request) {
  try {
    const token = await elevenlabs.tokens.singleUse.create("realtime_scribe")
    return NextResponse.json({ token: token.token }) // send string, not object
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to get token" }, { status: 500 })
  }
}
