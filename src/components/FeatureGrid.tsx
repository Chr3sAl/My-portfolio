import { cards } from "@/data/cards";
import FeatureCard from "./FeatureCard";

export default function FeatureGrid() {
  return (
    <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <FeatureCard
          key={card.title}
          title={card.title}
          href={card.href}
          icon={card.icon}
          bg={card.bg}
        />
      ))}
    </section>
  );
}