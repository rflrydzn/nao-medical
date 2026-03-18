"use client"
import { useScribe } from "@elevenlabs/react"
import { useState, useRef } from "react"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import Glossary, { type GlossaryTerm } from "@/components/glossary-sheet"
import { glossary_terms } from "@/lib/constants"

type ActivePanel = "patient" | "provider"

export default function MyComponent() {
  const [transcribed, setTranscribed] = useState("")
  const [translated, setTranslated] = useState("")
  const [language, setLanguage] = useState("English")
  const [hasStarted, setHasStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activePanel, setActivePanel] = useState<ActivePanel>("patient")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [useGlossary, setUseGlossary] = useState(false)
  const [glossaryTerms, setGlossaryTerms] =
    useState<GlossaryTerm[]>(glossary_terms)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const textRef = useRef<HTMLTextAreaElement | null>(null)

  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    onPartialTranscript: (data) => {
      console.log("Partial:", data.text)
    },
    onCommittedTranscript: (data) => {
      console.log("Committed:", data.text)
      setTranscribed(data.text)
      handleTranslate(data.text)
      // Auto-switch to provider panel on mobile after translation
      setActivePanel("provider")
    },
  })

  const fetchTokenFromServer = async () => {
    const res = await fetch("/api/transcribe")
    const data = await res.json()
    return data.token
  }

  const handleStart = async () => {
    setHasStarted(true)
    setActivePanel("patient")
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
      body: JSON.stringify({
        transcribed: textToTranslate,
        language,
        glossary: useGlossary ? glossaryTerms : undefined,
      }),
    })
    const data = await res.json()
    if (data.error) {
      setTranslated("Translation failed")
      return
    }
    setTranslated(data)
    return data
  }

  const handleManualInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setTranscribed(value)

    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    if (value.trim()) {
      debounceTimer.current = setTimeout(() => {
        handleTranslate(value)
      }, 2000)
    }
  }

  const handleSpeak = async () => {
    setLoading(true)
    const inputs = [{ text: translated, voiceId: "IKne3meq5aSn9XLyUdCD" }]
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        body: JSON.stringify({ inputs }),
      })
      if (!res.ok) {
        console.error("API ERROR:", await res.text())
        return
      }
      const blob = await res.blob()
      const audio = new Audio(URL.createObjectURL(blob))
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
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="bg-background-light dark:bg-background-dark relative flex min-w-0 flex-1 flex-col">
          <Header
            language={language}
            onSetLanguage={(value) => setLanguage(value)}
            onMenuOpen={() => setSidebarOpen(true)}
          />

          {/* Mobile tab switcher */}
          <div className="dark:bg-background-dark flex border-b border-primary/10 bg-white md:hidden">
            <button
              onClick={() => setActivePanel("patient")}
              className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-sm font-semibold transition-colors ${
                activePanel === "patient"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                person_outline
              </span>
              Patient
              {hasStarted && activePanel !== "patient" && (
                <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
              )}
            </button>
            <button
              onClick={() => setActivePanel("provider")}
              className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-2.5 text-sm font-semibold transition-colors ${
                activePanel === "provider"
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                medical_services
              </span>
              Provider
              {translated && activePanel !== "provider" && (
                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              )}
            </button>
          </div>

          {/* Content panels */}
          <div className="flex flex-1 flex-col divide-x divide-primary/10 overflow-hidden md:flex-row">
            {/* PATIENT panel */}
            <section
              className={`dark:bg-background-dark/50 flex flex-col bg-white md:flex-1 ${activePanel === "patient" ? "flex flex-1" : "hidden"} md:flex`}
            >
              <div className="hidden items-center justify-between border-b border-primary/5 px-8 py-4 md:flex">
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

              <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-2xl">
                  {/* Mobile live indicator */}
                  {hasStarted && (
                    <div className="mb-3 flex items-center gap-1.5 text-xs font-medium text-green-500 md:hidden">
                      <span className="size-2 animate-pulse rounded-full bg-green-500"></span>
                      Live Listening
                    </div>
                  )}
                  <div className="min-h-[120px] rounded-2xl border border-primary/5 bg-slate-50 p-4 md:p-6 dark:bg-slate-800/50">
                    <textarea
                      ref={textRef}
                      value={scribe.partialTranscript || transcribed || ""}
                      onChange={handleManualInput}
                      placeholder="Tap the mic or type your message..."
                      className="min-h-[100px] w-full resize-none bg-transparent text-lg leading-relaxed text-slate-700 italic outline-none md:text-xl dark:text-slate-300"
                    />
                  </div>
                  {transcribed && !hasStarted && (
                    <p className="mt-2 text-right text-xs text-slate-400">
                      Translating to {language}…
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* PROVIDER panel */}
            <section
              className={`dark:bg-background-dark/80 flex flex-col bg-slate-50 md:flex-1 ${activePanel === "provider" ? "flex flex-1" : "hidden"} md:flex`}
            >
              <div className="hidden items-center justify-between border-b border-primary/5 px-8 py-4 md:flex">
                <h3 className="flex items-center gap-2 font-bold text-slate-500">
                  <span className="material-symbols-outlined text-primary">
                    medical_services
                  </span>
                  PROVIDER
                </h3>
                {translated && (
                  <button
                    onClick={handleSpeak}
                    disabled={loading}
                    className="flex items-center gap-1 text-sm font-semibold text-primary disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {loading ? "hourglass_empty" : "volume_up"}
                    </span>
                    Listen
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-2xl">
                  {translated ? (
                    <div className="relative rounded-2xl border border-primary/10 bg-white p-5 shadow-sm md:p-6 dark:bg-slate-800">
                      <p className="pr-4 text-lg leading-relaxed font-medium text-slate-900 md:text-xl dark:text-white">
                        {translated}
                      </p>
                      <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-700">
                        {/* Listen button — visible on mobile inside the card */}
                        <button
                          onClick={handleSpeak}
                          disabled={loading}
                          className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white disabled:opacity-50 md:hidden"
                        >
                          <span className="material-symbols-outlined text-sm">
                            {loading ? "hourglass_empty" : "volume_up"}
                          </span>
                          Listen
                        </button>
                        <button
                          onClick={() =>
                            navigator.clipboard.writeText(translated)
                          }
                          className="flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary hover:text-primary dark:border-slate-600 dark:text-slate-300"
                        >
                          <span className="material-symbols-outlined text-sm">
                            content_copy
                          </span>
                          Copy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-40 flex-col items-center justify-center gap-3 text-slate-300 dark:text-slate-600">
                      <span className="material-symbols-outlined text-5xl">
                        translate
                      </span>
                      <p className="text-sm font-medium">
                        Translation will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Bottom toolbar */}
          <div className="dark:bg-background-dark flex h-24 shrink-0 items-center justify-center gap-6 border-t border-primary/10 bg-white px-4 md:h-32 md:gap-12 md:px-8">
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => {
                  setActivePanel("patient")
                  setTimeout(() => textRef.current?.focus(), 100)
                }}
                className="flex size-10 items-center justify-center rounded-full border-2 border-slate-200 text-slate-400 transition-all hover:border-primary hover:text-primary md:size-12 dark:border-slate-700"
                aria-label="Type"
              >
                <span className="material-symbols-outlined text-lg">
                  keyboard
                </span>
              </button>
              <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase md:text-[10px]">
                Type
              </span>
            </div>

            {/* Mic button */}
            <div className="relative flex flex-col items-center">
              <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl"></div>
              <button
                onClick={hasStarted ? handleStop : handleStart}
                className={`group relative flex items-center gap-2 rounded-full px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/40 transition-all hover:scale-105 active:scale-95 md:gap-3 md:px-10 md:py-4 ${hasStarted ? "bg-red-500 shadow-red-500/40" : "bg-primary"} `}
                aria-label={hasStarted ? "Stop recording" : "Start recording"}
              >
                <span className="material-symbols-outlined text-2xl transition-transform group-active:scale-90 md:text-3xl">
                  {hasStarted ? "stop" : "mic"}
                </span>
                <span className="text-sm md:text-lg">
                  {hasStarted ? "Stop" : "Tap to Speak"}
                </span>
              </button>
            </div>

            <Glossary
              useGlossary={useGlossary}
              onToggleGlossary={setUseGlossary}
              terms={glossaryTerms}
              onTermsChange={setGlossaryTerms}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
