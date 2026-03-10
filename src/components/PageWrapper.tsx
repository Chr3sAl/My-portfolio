type PageWrapperProps = {
  children: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_#eff6ff_40%,_#dbeafe_70%,_#c7d2fe)] px-4 py-6 text-slate-800 md:px-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[32px] border border-white/60 bg-white/55 shadow-[0_20px_80px_rgba(59,130,246,0.15)] backdrop-blur-xl">
        {children}
      </div>
    </main>
  );
}