import type { Metadata } from "next";
import Link from "next/link";
import IaSearch from "./IaSearch";
import type { IaProject } from "./IaSearch";

export const metadata: Metadata = {
  title: "IA | cachicamo studios",
  description:
    "Directorio de proyectos de inteligencia artificial creados por cachicamo studios.",
  alternates: {
    canonical: "https://cachicamo.studio/ia",
  },
};

const IA_PROJECTS: IaProject[] = [
  {
    id: "elgritcast-app",
    name: "app.elgritcast.com",
    description:
      "Coach motivacional con IA entrenado con el contenido de El Grit Cast. Conversaciones en tiempo real sobre resiliencia, mentalidad y emprendimiento.",
    category: "chat",
    tags: ["Claude", "RAG", "Podcast", "Motivación"],
    metrics: 1240,
    icon: "EG",
    status: "activo",
    url: "https://app.elgritcast.com",
    github: "https://github.com/cachicamostudios",
  },
  {
    id: "fintech-bot",
    name: "Fintech Bot",
    description:
      "Bot que genera y publica posts de forma automática en Mastodon. Curación de contenido financiero con IA y distribución sin intervención manual.",
    category: "automatización",
    tags: ["Mastodon", "Telegram", "Ollama", "Python"],
    icon: "FB",
    status: "activo",
  },
  {
    id: "neuro-bot",
    name: "Neuro Bot",
    description:
      "Bot que publica automáticamente en Mastodon contenido sobre neurociencia aplicada al grit. Hábitos, resiliencia y mentalidad respaldados por ciencia.",
    category: "automatización",
    tags: ["Mastodon", "Telegram", "Ollama", "Neurociencia"],
    icon: "NR",
    status: "activo",
  },
  {
    id: "ia-pets-project",
    name: "IA Pets",
    description:
      "Desktop pets con IA integrada. Mascotas virtuales en tu escritorio que funcionan como asistentes conversacionales, con personalidad propia y memoria contextual.",
    category: "asistentes",
    tags: ["Ollama", "Desktop", "Electron"],
    icon: "IP",
    status: "desarrollo",
  },
  {
    id: "fintech-news-agent",
    name: "Fintech News Agent",
    description:
      "Agente local que busca y cura noticias financieras automáticamente y las publica en Telegram. Corre en MacBook Air con Groq para inferencia ultraligera.",
    category: "agentes",
    tags: ["Groq", "Telegram", "Python", "Local"],
    icon: "FN",
    status: "activo",
  },
  {
    id: "nam-bot",
    name: "Ñam Bot",
    description:
      "Agente local que busca noticias y eventos gastronómicos y los publica en Telegram. Corre en MacBook Air con Groq para inferencia ultraligera.",
    category: "agentes",
    tags: ["Groq", "Telegram", "Python", "Local"],
    icon: "ÑB",
    status: "activo",
  },
  {
    id: "3zkmc-agent",
    name: "3zkMC Minecraft Updates",
    description:
      "Agente local que rastrea noticias y actualizaciones de Minecraft, el juego más vendido de la historia, y las publica automáticamente en Telegram vía Groq.",
    category: "agentes",
    tags: ["Groq", "Telegram", "Python", "Local"],
    icon: "MC",
    status: "activo",
  },
  {
    id: "remotion-videos",
    name: "Motion Graphics Generator",
    description:
      "Pipeline con Remotion que genera motion graphics para YouTube: mapas mentales animados y frases de énfasis para los canales 3zkMC y Susana Resiste.",
    category: "generación de contenido",
    tags: ["Remotion", "React", "YouTube"],
    icon: "MG",
    status: "activo",
  },
  {
    id: "grit-cast-news",
    name: "El Grit Cast News",
    description:
      "Agente local que rastrea investigaciones científicas y noticias sobre el grit, la resiliencia y la mentalidad de crecimiento. Publica actualizaciones diarias en Telegram vía Groq.",
    category: "agentes",
    tags: ["Groq", "Telegram", "Python", "Local"],
    icon: "GN",
    status: "activo",
  },
];

export default function IaPage() {
  return (
    <div className="site-wrapper">
      <div className="dot-grid" aria-hidden="true" />

      {/* Back */}
      <div className="web-back">
        <Link href="/" className="web-back-link">
          ← cachicamo studios
        </Link>
      </div>

      {/* Hero */}
      <section className="ia-hero">
        <div className="ia-hero-badge">
          <span className="ia-badge-dot" />
          <span>{IA_PROJECTS.length} proyectos</span>
          <span className="ia-badge-sep">·</span>
          <span>actualizado ahora</span>
        </div>

        <h1 className="ia-hero-title">
          <span className="ia-title-line1">encuentra los mejores</span>
          <span className="ia-title-line2">proyectos de ia.</span>
        </h1>

        <p className="ia-hero-sub">
          Directorio de proyectos de inteligencia artificial creados en
          cachicamo studios para conectar personas con herramientas que
          funcionan.
        </p>

        {/* Search + filters + grid */}
        <IaSearch projects={IA_PROJECTS} />
      </section>
    </div>
  );
}
