"use client"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export type GlossaryTerm = {
  term: string
  definition: string
}

export default function Glossary({
  useGlossary,
  onToggleGlossary,
  terms,
  onTermsChange,
}: {
  useGlossary: boolean
  onToggleGlossary: (val: boolean) => void
  terms: GlossaryTerm[]
  onTermsChange: (terms: GlossaryTerm[]) => void
}) {
  const [search, setSearch] = useState("")
  const [newTerm, setNewTerm] = useState("")
  const [newDef, setNewDef] = useState("")
  const [addingNew, setAddingNew] = useState(false)

  const filtered = terms.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddTerm = () => {
    if (!newTerm.trim() || !newDef.trim()) return
    onTermsChange([
      ...terms,
      { term: newTerm.trim(), definition: newDef.trim() },
    ])
    setNewTerm("")
    setNewDef("")
    setAddingNew(false)
  }

  const handleRemoveTerm = (termToRemove: GlossaryTerm) => {
    onTermsChange(terms.filter((t) => t !== termToRemove))
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Sheet>
        <SheetTrigger
          render={
            <button className="relative flex size-10 items-center justify-center rounded-full border-2 border-slate-200 text-slate-400 transition-all hover:border-primary hover:text-primary md:size-12 dark:border-slate-700">
              <span className="material-symbols-outlined">auto_stories</span>
              {useGlossary && (
                <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-primary dark:border-slate-900" />
              )}
            </button>
          }
        />
        <SheetContent>
          <aside className="dark:bg-background-dark flex h-full w-80 flex-col border-l border-primary/10 bg-white">
            {/* Header */}
            <div className="border-b border-primary/10 p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Medical Glossary
                </h3>
                <span className="text-xs text-slate-400">
                  {terms.length} terms
                </span>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
                  search
                </span>
                <input
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-4 pl-9 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                  placeholder="Search terms..."
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <span className="material-symbols-outlined text-sm">
                      close
                    </span>
                  </button>
                )}
              </div>

              {/* Use in translation toggle */}
              <div className="flex items-center justify-between rounded-xl bg-primary/5 px-4 py-3 dark:bg-primary/10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-primary">
                    auto_fix_high
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      Use in Translation
                    </p>
                    <p className="text-[10px] leading-tight text-slate-400">
                      Glossary guides AI output
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onToggleGlossary(!useGlossary)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    useGlossary
                      ? "bg-primary"
                      : "bg-slate-200 dark:bg-slate-700"
                  }`}
                  role="switch"
                  aria-checked={useGlossary}
                >
                  <span
                    className={`inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                      useGlossary ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Terms list */}
            <div className="flex-1 space-y-2 overflow-y-auto p-4">
              {filtered.length === 0 ? (
                <div className="flex h-32 flex-col items-center justify-center gap-2 text-slate-300 dark:text-slate-600">
                  <span className="material-symbols-outlined text-3xl">
                    search_off
                  </span>
                  <p className="text-xs font-medium">No terms found</p>
                </div>
              ) : (
                filtered.map((item, i) => (
                  <div
                    key={i}
                    className="group relative rounded-xl border border-transparent p-3 transition-colors hover:border-slate-100 hover:bg-slate-50 dark:hover:border-slate-700 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm leading-tight font-bold text-primary">
                        {item.term}
                      </h4>
                      <button
                        onClick={() => handleRemoveTerm(item)}
                        className="mt-0.5 shrink-0 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-400"
                        aria-label="Remove term"
                      >
                        <span className="material-symbols-outlined text-sm">
                          delete
                        </span>
                      </button>
                    </div>
                    <p className="mt-1 text-xs leading-normal text-slate-500 dark:text-slate-400">
                      {item.definition}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add term */}
            <div className="border-t border-primary/10 p-4">
              {addingNew ? (
                <div className="space-y-2">
                  <input
                    autoFocus
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                    placeholder="Term (e.g. Tachycardia)"
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                  />
                  <textarea
                    className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 focus:outline-none dark:border-slate-700 dark:bg-slate-800"
                    placeholder="Definition..."
                    rows={2}
                    value={newDef}
                    onChange={(e) => setNewDef(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddTerm}
                      disabled={!newTerm.trim() || !newDef.trim()}
                      className="flex-1 rounded-lg bg-primary py-2 text-xs font-bold text-white transition-colors hover:bg-primary/90 disabled:opacity-40"
                    >
                      Add Term
                    </button>
                    <button
                      onClick={() => {
                        setAddingNew(false)
                        setNewTerm("")
                        setNewDef("")
                      }}
                      className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setAddingNew(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/10"
                >
                  <span className="material-symbols-outlined text-sm">
                    add_circle
                  </span>
                  Add Custom Term
                </button>
              )}
            </div>
          </aside>
        </SheetContent>
      </Sheet>
      <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase md:text-[10px]">
        Glossary
      </span>
    </div>
  )
}
