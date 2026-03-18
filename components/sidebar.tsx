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
      <div className="mt-auto p-4">
        <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Emergency Mode
            </span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input className="peer sr-only" type="checkbox" value="" />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-red-500 peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-slate-700"></div>
            </label>
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            Instantly connects to a live medical interpreter in 200+ languages.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3 px-2">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/20">
            <span className="material-symbols-outlined text-primary">
              person
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold">Dr. Sarah Chen</p>
            <p className="text-xs text-slate-500">General Physician</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
