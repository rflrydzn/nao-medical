import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Glossary() {
  return (
    <div className="flex flex-col items-center gap-1">
      <Sheet>
        <SheetTrigger
          render={
            <button className="size-12 rounded-full border-2 border-slate-200 text-slate-400 transition-all hover:border-primary hover:text-primary dark:border-slate-700">
              <span className="material-symbols-outlined">auto_stories</span>
            </button>
          }
        />
        <SheetContent>
          <aside className="dark:bg-background-dark flex w-80 flex-col border-l border-primary/10 bg-white">
            <div className="border-b border-primary/10 p-6">
              <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
                Medical Glossary
              </h3>
              <div className="relative">
                <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
                  search
                </span>
                <input
                  className="w-full rounded-lg border-none bg-slate-100 py-2 pr-4 pl-9 text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 dark:bg-slate-800"
                  placeholder="Search terms..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              <div className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <h4 className="mb-1 text-sm font-bold text-primary">
                  Angina Pectoris
                </h4>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  Chest pain or discomfort that occurs when heart muscle doesn't
                  get enough oxygen-rich blood.
                </p>
              </div>
              <div className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <h4 className="mb-1 text-sm font-bold text-primary">
                  Myocardial Infarction
                </h4>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  Commonly known as a heart attack; occurs when blood flow
                  decreases or stops to a part of the heart.
                </p>
              </div>
              <div className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <h4 className="mb-1 text-sm font-bold text-primary">
                  Dizziness (Vértigo)
                </h4>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  A sensation of spinning or losing balance, often related to
                  inner ear problems or blood pressure.
                </p>
              </div>
              <div className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <h4 className="mb-1 text-sm font-bold text-primary">
                  Bradycardia
                </h4>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  A slower than normal heart rate, typically fewer than 60 beats
                  per minute.
                </p>
              </div>
              <div className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <h4 className="mb-1 text-sm font-bold text-primary">
                  Hypertension
                </h4>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  A condition in which the force of the blood against the artery
                  walls is too high.
                </p>
              </div>
              <div className="group cursor-pointer rounded-lg p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <h4 className="mb-1 text-sm font-bold text-primary">Syncope</h4>
                <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">
                  Temporary loss of consciousness caused by a fall in blood
                  pressure; fainting.
                </p>
              </div>
            </div>
            <div className="border-t border-primary/10 bg-primary/5 p-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/10">
                <span className="material-symbols-outlined text-sm">
                  add_circle
                </span>
                Add Custom Term
              </button>
            </div>
          </aside>
        </SheetContent>
      </Sheet>
      <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
        Glossary
      </span>
    </div>
  )
}
