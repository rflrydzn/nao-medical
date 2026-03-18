import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { languages } from "@/lib/constants"

export default function Header({
  language,
  onSetLanguage,
}: {
  language: string
  onSetLanguage: (language: string) => void
}) {
  return (
    <header className="dark:bg-background-dark flex h-16 items-center justify-between border-b border-primary/10 bg-white px-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 dark:bg-slate-800">
          <span className="text-xs font-bold text-slate-500">FROM:</span>
          <span className="flex items-center justify-center text-sm font-semibold">
            <span className="material-symbols-outlined text-3xl transition-transform group-active:scale-90">
              mic
            </span>
            Auto Detect
          </span>
          {/* <span className="material-symbols-outlined text-sm">
                  expand_more
                </span> */}
        </div>
        <div className="flex size-8 items-center justify-center text-primary">
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 dark:bg-slate-800">
                <span className="text-xs font-bold text-slate-500">TO:</span>
                <span className="text-sm font-semibold">{language}</span>
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </button>
            }
          />
          <DropdownMenuContent>
            {languages.map((language) => (
              <DropdownMenuItem
                onClick={() => onSetLanguage(language)}
                key={language}
              >
                {language}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex hidden items-center gap-3 md:inline">
        <button className="p-2 text-slate-500 transition-colors hover:text-primary">
          <span className="material-symbols-outlined">settings</span>
        </button>
        <button className="p-2 text-slate-500 transition-colors hover:text-primary">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </header>
  )
}
