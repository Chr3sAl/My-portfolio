import Link from "next/link";
import { LucideIcon } from "lucide-react";

type FeatureCardProps = {
  title: string;
  href: string;
  icon: LucideIcon;
  bg: string;
};

export default function FeatureCard({
  title,
  href,
  icon: Icon,
  bg,
}: FeatureCardProps) {
  return (
    <Link href={href} className="block">
      <div
        className={`group rounded-[30px] border border-white/70 bg-gradient-to-br ${bg} p-8 shadow-[0_18px_40px_rgba(148,163,184,0.16)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(59,130,246,0.18)]`}
      >
        <div className="mb-10 flex h-28 w-28 items-center justify-center rounded-[24px] bg-white/70 shadow-inner">
          <Icon className="h-14 w-14 text-slate-700 transition group-hover:scale-110" />
        </div>

        <h3 className="text-3xl font-semibold text-slate-800">{title}</h3>
      </div>
    </Link>
  );
}