export default function Hero() {
  return (
    <div className="relative mb-8 flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-300 to-cyan-500 text-3xl font-bold text-white shadow-lg">
          HI
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-900 md:text-5xl">
          Welcome to My Portfolio!
        </h1>
      </div>

      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute inset-x-6 bottom-0 h-10 rounded-full bg-sky-300/30 blur-xl" />
          <div className="relative w-[260px] rounded-[28px] border border-white/60 bg-white/35 p-5 shadow-lg backdrop-blur-sm">
            <div className="rounded-2xl bg-slate-900 p-4 text-xs text-sky-200 shadow-inner">
              <div className="mb-3 flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="space-y-2 font-mono">
                <div>
                  <span className="text-purple-300">const</span>{" "}
                  <span className="text-cyan-300">developer</span> = {"{"}
                </div>
                <div className="pl-4 text-slate-100">
                  name: <span className="text-emerald-300">"Christian"</span>,
                </div>
                <div className="pl-4 text-slate-100">
                  stack: <span className="text-emerald-300">"Next.js"</span>,
                </div>
                <div className="pl-4 text-slate-100">
                  role: <span className="text-emerald-300">"CS Student"</span>,
                </div>
                <div>{"};"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}