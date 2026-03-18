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
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"

export default function MyComponent() {
  const [transcribed, setTranscribed] = useState("")
  const [translated, setTranslated] = useState("")
  const [language, setLanguage] = useState("English")
  const [hasStarted, setHasStarted] = useState(false)
  const [loading, setLoading] = useState(false)

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
    setHasStarted(true)
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
    setHasStarted(false)
  }

  const handleTranslate = async (text?: string) => {
    const textToTranslate = text ?? transcribed
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcribed: textToTranslate, language }),
    })
    const data = await res.json()
    if (data.error) {
      setTranslated("Translation failed")
      return
    }
    setTranslated(data)
    return data
  }

  const handleSpeak = async () => {
    setLoading(true)

    const inputs = [
      {
        text: translated,
        voiceId: "IKne3meq5aSn9XLyUdCD",
      },
    ]

    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        body: JSON.stringify({ inputs }),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error("API ERROR:", errText)
        setLoading(false)
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const audio = new Audio(url)
      audio.play()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display min-h-screen text-slate-900 dark:text-slate-100">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="bg-background-light dark:bg-background-dark relative flex flex-1 flex-col">
          <Header
            language={language}
            onSetLanguage={(value) => setLanguage(value)}
          />
          <div className="flex flex-1 flex-col divide-x divide-primary/10 overflow-hidden md:flex-row">
            <section className="dark:bg-background-dark/50 flex flex-col bg-white md:flex-1">
              <div className="flex items-center justify-between border-b border-primary/5 px-8 py-4">
                <h3 className="flex items-center gap-2 font-bold text-slate-500">
                  <span className="material-symbols-outlined text-primary">
                    person_outline
                  </span>
                  PATIENT
                </h3>
                {hasStarted && (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-500">
                    <span className="size-2 animate-pulse rounded-full bg-green-500"></span>
                    Live Listening
                  </span>
                )}
              </div>
              <div className="flex-1 space-y-6 overflow-y-auto p-8">
                <div className="mx-auto max-w-2xl">
                  <div className="rounded-2xl border border-primary/5 bg-slate-50 p-6 dark:bg-slate-800/50">
                    <p className="text-xl leading-relaxed text-slate-700 italic dark:text-slate-300">
                      {scribe.partialTranscript ||
                        "Tap the mic and start talking"}
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section className="dark:bg-background-dark/80 flex hidden flex-1 flex-col bg-slate-50 md:inline">
              <div className="flex items-center justify-between border-b border-primary/5 px-8 py-4">
                <h3 className="flex items-center gap-2 font-bold text-slate-500">
                  <span className="material-symbols-outlined text-primary">
                    medical_services
                  </span>
                  PROVIDER
                </h3>
                <button
                  onClick={handleSpeak}
                  className="flex items-center gap-1 text-sm font-semibold text-primary"
                >
                  <span className="material-symbols-outlined text-sm">
                    volume_up
                  </span>
                  Listen
                </button>
              </div>
              <div className="flex-1 space-y-6 overflow-y-auto p-8">
                <div className="mx-auto max-w-2xl">
                  {translated && (
                    <div className="relative rounded-2xl border border-primary/10 bg-white p-6 shadow-sm dark:bg-slate-800">
                      <p className="text-xl leading-relaxed font-medium text-slate-900 dark:text-white">
                        {translated}
                      </p>
                      <div className="absolute right-6 -bottom-3 flex gap-2">
                        <button className="flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-105">
                          <span className="material-symbols-outlined text-sm">
                            content_copy
                          </span>
                        </button>
                        <button className="flex size-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-transform hover:scale-105">
                          <span className="material-symbols-outlined text-sm">
                            edit
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
          <div className="dark:bg-background-dark flex h-32 items-center justify-center gap-12 border-t border-primary/10 bg-white px-8">
            <div className="flex flex-col items-center gap-1">
              <button className="size-12 rounded-full border-2 border-slate-200 text-slate-400 transition-all hover:border-primary hover:text-primary dark:border-slate-700">
                <span className="material-symbols-outlined">keyboard</span>
              </button>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Type
              </span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl"></div>

              <button
                onClick={hasStarted ? handleStop : handleStart}
                className="group relative mb-6 flex items-center gap-3 rounded-full bg-primary px-10 py-10 font-bold text-white shadow-lg shadow-primary/40 transition-transform hover:scale-105 md:mb-0 md:py-4"
              >
                <span className="material-symbols-outlined text-3xl transition-transform group-active:scale-90">
                  mic
                </span>
                <span className="hidden text-lg md:block">
                  {!hasStarted ? "Tap to Speak" : "Listening..."}
                </span>
              </button>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button className="size-12 rounded-full border-2 border-slate-200 text-slate-400 transition-all hover:border-primary hover:text-primary dark:border-slate-700">
                <span className="material-symbols-outlined">auto_stories</span>
              </button>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Library
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
