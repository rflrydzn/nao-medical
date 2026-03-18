export default function Sidebar() {
  return (
    <aside className="dark:bg-background-dark flex hidden w-64 flex-col border-r border-primary/10 bg-white md:inline">
      <div className="flex items-center gap-3 p-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
          <span className="material-symbols-outlined">translate</span>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-primary">
          MediTranslate
        </h2>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-primary/5 dark:text-slate-400"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-sm font-medium">Dashboard</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-white shadow-sm"
          href="#"
        >
          <span className="material-symbols-outlined">record_voice_over</span>
          <span className="text-sm font-medium">Live Translate</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-primary/5 dark:text-slate-400"
          href="#"
        >
          <span className="material-symbols-outlined">history</span>
          <span className="text-sm font-medium">History</span>
        </a>
        <a
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-600 transition-colors hover:bg-primary/5 dark:text-slate-400"
          href="#"
        >
          <span className="material-symbols-outlined">star</span>
          <span className="text-sm font-medium">Saved Phrases</span>
        </a>
      </nav>
    </aside>
  )
}
