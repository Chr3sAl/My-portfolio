export type TechItem = {
  name: string;
  icon: string;
  badge: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  heroImage: string;
  detailImage?: string;
  accent: string;
  builtWith: TechItem[];
  github?: string;
  live?: string;
  demo?: string;
  sections: {
    inspiration?: string;
    whatItDoes?: string;
    howWeBuiltIt?: string;
    challenges?: string;
    accomplishments?: string;
    whatWeLearned?: string;
    nextSteps?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "my-portfolio",
    title: "My Portfolio",
    subtitle: "Personal Project | March 2026",
    shortDescription:
      "A modern personal portfolio website built to showcase projects, technical skills, academic work, and future blog content.",

    heroImage: "/projects/home.png",
    detailImage: "/projects/home.png",

    accent: "from-sky-50 to-cyan-50",

    builtWith: [
      { name: "Next.js", icon: "nextjs", badge: "bg-slate-100 text-slate-700" },
      { name: "React", icon: "react", badge: "bg-cyan-100 text-cyan-700" },
      { name: "TypeScript", icon: "typescript", badge: "bg-sky-100 text-sky-700" },
      { name: "Vercel", icon: "vercel", badge: "bg-slate-200 text-slate-800" },
    ],

    github: "https://github.com/Chr3sAl/My-portfolio",
    live: "https://portfolio-chr3sals-projects.vercel.app",

    sections: {
      inspiration:
        "I wanted to create a professional online space to present myself as a computer science student, highlight my projects, and build a portfolio I can continuously improve over time for internships, university work, and future job opportunities.",

      whatItDoes:
        "This portfolio website introduces who I am, displays my technical skills, presents my projects in a structured way, and is designed to later include GitHub repositories, blog articles, social links, and additional academic or personal work.",

      howWeBuiltIt:
        "I built the project using Next.js, React, and TypeScript with a component-based structure for reusability and easier maintenance. Tailwind CSS is used for styling, while Vercel is used for deployment and GitHub is used for version control and project hosting.",

      challenges:
        "Some of the main challenges included setting up the project structure correctly, fixing routing issues with Next.js, organizing reusable components, configuring deployment through Vercel, solving dependency and styling problems, and designing a layout that looks modern while still being easy to expand later.",

      accomplishments:
        "I successfully built and deployed the foundation of my own portfolio website, created reusable pages and components, connected the project to GitHub and Vercel, and established a scalable structure that will make it easier to add more projects, blog posts, and professional information over time.",

      whatWeLearned:
        "Through this project, I learned more about Next.js routing, component design, TypeScript structure, deployment workflows, debugging frontend issues, and how to organize a real-world project so it is easier to update and maintain in the future.",

      nextSteps:
        "The next steps are to finish the projects page, add individual project detail pages, connect GitHub repository links, include social media and professional links, improve the blog section, replace placeholders with real images, and continue polishing the portfolio for professional use.",
    },
  },
  {
    slug: "madapay-soa",
    title: "MadaPay SOA",
    subtitle: "Fintech Project | April 2026",
    shortDescription:
    "A Messenger-based currency exchange system that calculates MGA to CNY transfers, applies mobile money fee rules, collects customer payout details, and prepares transactions for human processing.",


    heroImage: "/placeholder.png",
    detailImage: "/placeholder.png",

    accent: "from-sky-50 to-cyan-50",

    builtWith: [
  { name: "NestJS", icon: "nestjs", badge: "bg-green-100 text-green-700" },
  { name: "TypeScript", icon: "typescript", badge: "bg-blue-100 text-blue-700" },
  { name: "PostgreSQL", icon: "postgresql", badge: "bg-sky-100 text-sky-700" },
  { name: "Prisma", icon: "prisma", badge: "bg-gray-100 text-gray-700" },
  { name: "Next.js", icon: "nextjs", badge: "bg-slate-200 text-slate-800" }
],

    github: "https://github.com/Chr3sAl/MadaPay-Soa",
    live: "https://www.facebook.com/messages",

    sections: {
    inspiration:
      "I wanted to build a real-world fintech-style system that could help automate part of the currency exchange workflow used by small exchange businesses. The goal was to create a chatbot-assisted system where customers could quickly calculate transfers and submit their exchange requests through Messenger.",

    whatItDoes:
      "The Messenger Currency Exchange Bot calculates Ariary to Yuan conversions, applies tier-based mobile money fee rules, supports different quote modes, and collects customer payout details such as Alipay or WeChat Pay information. The system prepares transaction data that can later be processed and confirmed by a human operator.",

    howWeBuiltIt:
      "The backend is built using NestJS with TypeScript for a structured and scalable architecture. PostgreSQL is used as the main database and Prisma is used as the ORM for schema management and migrations. The system stores exchange rates, fee rules, and transaction data while exposing API endpoints for quote calculations and future Messenger integration.",

    challenges:
      "Some of the main challenges included designing a database schema that represents real transaction flows, implementing tier-based mobile money fee calculations, configuring Prisma migrations correctly, connecting the backend to PostgreSQL, and structuring the project so it can later support Messenger webhooks and admin tools.",

    accomplishments:
      "I successfully implemented the quote calculation engine, connected the system to a PostgreSQL database, stored fee rules and exchange rates, tested API endpoints using Thunder Client, and organized the project as a scalable backend architecture ready for chatbot integration.",

    whatWeLearned:
      "Through this project I gained deeper experience with backend architecture, Prisma schema design, database migrations, API development, and modeling real-world financial workflows. I also improved my understanding of how to structure services, controllers, and business logic within a NestJS application.",

    nextSteps:
      "The next steps are to integrate the backend with Facebook Messenger webhooks, implement the full chatbot conversation flow, store customer transfer IDs and uploaded payment details, create admin tools for managing exchange rates and fees, and add reporting features such as Excel transaction exports.",
  },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}