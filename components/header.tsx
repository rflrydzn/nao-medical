"use client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { languages } from "@/lib/constants"

export default function Header({
  language,
  onSetLanguage,
  onMenuOpen,
}: {
  language: string
  onSetLanguage: (language: string) => void
  onMenuOpen: () => void
}) {
  return (
    <header className="dark:bg-background-dark border-b border-primary/10 bg-white">
      {/* Mobile-only top bar: hamburger | logo | help */}
      <div className="flex h-14 items-center justify-between px-4 md:hidden">
        <button
          onClick={onMenuOpen}
          className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label="Open menu"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-sm">translate</span>
          </div>
          <span className="text-base font-bold tracking-tight text-primary">
            MediTranslate
          </span>
        </div>

        <button
          className="flex size-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-primary"
          aria-label="Help"
        >
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>

      {/* Translation controls — second row on mobile, only row on desktop */}
      <div className="flex h-12 items-center justify-center border-t border-primary/5 px-4 md:h-16 md:justify-between md:border-t-0 md:px-8">
        <div className="flex min-w-0 items-center gap-2 md:gap-4">
          {/* FROM pill */}
          <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 md:gap-2 md:px-4 md:py-2 dark:bg-slate-800">
            <span className="text-[10px] font-bold text-slate-500 md:text-xs">
              FROM:
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold md:text-sm">
              <span className="material-symbols-outlined text-base text-primary md:text-xl">
                mic
              </span>
              <span className="hidden sm:inline">Auto Detect</span>
            </span>
          </div>

          {/* Arrow */}
          <div className="flex size-6 shrink-0 items-center justify-center text-primary md:size-8">
            <span className="material-symbols-outlined text-base md:text-xl">
              arrow_right_alt
            </span>
          </div>

          {/* TO dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button className="flex shrink-0 items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 md:gap-2 md:px-4 md:py-2 dark:bg-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 md:text-xs">
                    TO:
                  </span>
                  <span className="max-w-[90px] truncate text-xs font-semibold md:max-w-none md:text-sm">
                    {language}
                  </span>
                  <span className="material-symbols-outlined text-xs md:text-sm">
                    expand_more
                  </span>
                </button>
              }
            />
            <DropdownMenuContent className="max-h-64 overflow-y-auto">
              {languages.map((lang) => (
                <DropdownMenuItem
                  onClick={() => onSetLanguage(lang)}
                  key={lang}
                >
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop-only right actions */}
        <div className="hidden items-center gap-1 md:flex">
          <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
      </div>
    </header>
  )
}
