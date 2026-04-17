import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "./QuoteForm";
import IaFloatButton from "./IaFloatButton";

export const metadata: Metadata = {
  title: "Web | cachicamo studios",
  description: "Desarrollo web profesional: sitios personales, branding y apps. Sin plantillas, solo trabajo hecho con intención.",
  alternates: {
    canonical: "https://cachicamo.studio/web",
  },
};

type Site = {
  name: string;
  url: string;
  displayUrl: string;
  description: string;
  type: string;
  image?: string;
};

const SITES: Site[] = [
  {
    name: "Cachicamo App",
    url: "https://app.cachicamo.studio",
    displayUrl: "app.cachicamo.studio",
    description: "Workflow de pre-producción y producción",
    type: "app",
    image: "/previews/cachicamo-app.webp",
  },
  {
    name: "El Grit Cast",
    url: "https://elgritcast.com",
    displayUrl: "elgritcast.com",
    description: "Podcast de Resiliencia",
    type: "personal",
    image: "/previews/elgritcast.webp",
  },
  {
    name: "Grit App",
    url: "https://app.elgritcast.com",
    displayUrl: "app.elgritcast.com",
    description: "Enfoque y productividad",
    type: "app",
    image: "/previews/grit-app.webp",
  },
  {
    name: "3zkMC",
    url: "https://3zkmc.com",
    displayUrl: "3zkmc.com",
    description: "Comunidad Minecraft",
    type: "personal",
    image: "/previews/3zkmc.webp",
  },
  {
    name: "Ñam!",
    url: "https://xn--am-yja.com",
    displayUrl: "ñam.com",
    description: "Blog de gastronomía",
    type: "branding",
    image: "/previews/nam.webp",
  },
  {
    name: "Susana Gomes",
    url: "https://susanagomes.xyz",
    displayUrl: "susanagomes.xyz",
    description: "Fintech & neobancos",
    type: "personal",
    image: "/previews/susanagomes.webp",
  },
  {
    name: "Mary Carfora",
    url: "https://marycarfora.com",
    displayUrl: "marycarfora.com",
    description: "Belleza, masterclass & branding",
    type: "branding",
    image: "/previews/marycarfora.webp",
  },
  {
    name: "Erick Vega",
    url: "https://erickvega.xyz",
    displayUrl: "erickvega.xyz",
    description: "Filmmaker & editor",
    type: "branding",
    image: "/previews/erickvega.webp",
  },
];

export default function WebPage() {
  return (
    <div className="site-wrapper">
      <div className="dot-grid" aria-hidden="true" />

      {/* Back link */}
      <div className="web-back">
        <Link href="/" className="web-back-link">
          ← cachicamo studios
        </Link>
      </div>

      {/* Hero */}
      <section className="web-hero">
        <span className="web-hero-tag">[web]</span>
        <h1 className="web-hero-title">desarrollo web.</h1>
        <IaFloatButton />
      </section>

      {/* Manifesto */}
      <section className="web-manifesto">
        <p className="web-manifesto-label">[manifiesto]</p>
        <div className="web-manifesto-inner">
          <p>Un sitio web no es solo una URL.</p>
          <p>
            Es tu presencia. Tu declaración. El espacio que te representa en la
            red.
          </p>
          <p>
            Sitios personales, de branding, profesionales.
            Sin plantillas. Sin atajos.
            Solo trabajo hecho con intención.
          </p>
        </div>
      </section>

      {/* Showcase */}
      <section className="web-showcase">
        <p className="web-showcase-title">[nuestro trabajo]</p>
        <div className="web-grid">
          {SITES.map((site) => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="web-card"
            >
              <div className="browser-chrome">
                <div className="browser-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="browser-url">{site.displayUrl}</div>
              </div>
              <div className="browser-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.image ?? `https://api.microlink.io/?url=${encodeURIComponent(site.url)}&screenshot=true&meta=false&embed=screenshot.url`}
                  alt={`Preview de ${site.name}`}
                  loading="lazy"
                />
              </div>
              <div className="web-card-info">
                <span className="web-card-type">[{site.type}]</span>
                <h3 className="web-card-name">{site.name}</h3>
                <p className="web-card-desc">{site.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Formulario de presupuesto */}
      <section className="web-cta">
        <div className="web-cta-logo-bg" aria-hidden="true">
          <Image
            src="/cachicamo-logo.png"
            alt=""
            width={480}
            height={480}
            className="hero-logo-ghost"
            draggable={false}
          />
        </div>
        <p className="web-showcase-title">[trabajemos juntos]</p>
        <h2 className="web-cta-title">¿Tienes un proyecto en mente?</h2>
        <QuoteForm />
      </section>
    </div>
  );
}
