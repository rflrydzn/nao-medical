"use client"
import { useScribe } from "@elevenlabs/react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { languages } from "@/lib/constants"

export default function MyComponent() {
  const [transcribed, setTranscribed] = useState("")
  const [translated, setTranslated] = useState("")
  const [language, setLanguage] = useState("")
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    onPartialTranscript: (data) => {
      console.log("Partial:", data.text)
    },
    onCommittedTranscript: (data) => {
      console.log("Committed:", data.text)
      setTranscribed(data.text)
      handleTranslate(data.text) // pass fresh text directly
    },
  })

  const fetchTokenFromServer = async () => {
    const res = await fetch("/api/transcribe")
    const data = await res.json()
    const token = data.token
    return token
  }

  const handleStart = async () => {
    // Fetch a single use token from the server
    const token = await fetchTokenFromServer()

    await scribe.connect({
      token,
      microphone: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    })
  }

  const handleStop = async () => {
    scribe.commit()
    setTimeout(() => {
      scribe.disconnect()
    }, 2000)
  }

  const handleTranslate = async (text?: string) => {
    const textToTranslate = text ?? transcribed
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcribed: textToTranslate, language }),
    })
    const data = await res.json()
    setTranslated(data)
    return data
  }

  return (
    <div>
      <button onClick={handleStart} disabled={scribe.isConnected}>
        Start Recording
      </button>
      <button onClick={handleStop} disabled={!scribe.isConnected}>
        Stop
      </button>

      {scribe.partialTranscript && <p>Live: {scribe.partialTranscript}</p>}

      <div>
        {scribe.committedTranscripts.map((t) => (
          <p key={t.id}>{t.text}</p>
        ))}
      </div>
      <p>transcribed: {transcribed}</p>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline">{language || "Select Language"}</Button>
          }
        />
        <DropdownMenuContent>
          {languages.map((language) => (
            <DropdownMenuItem
              key={language}
              onClick={() => setLanguage(language)}
            >
              {language}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <p>translated: {translated}</p>
    </div>
  )
}
