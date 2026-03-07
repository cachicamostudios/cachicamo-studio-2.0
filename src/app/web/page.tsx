import Link from "next/link";

const SITES = [
  {
    name: "El Grit Cast",
    url: "https://elgritcast.com",
    displayUrl: "elgritcast.com",
    description: "Podcast de Resiliencia",
    type: "personal",
  },
  {
    name: "3zkMC",
    url: "https://3zkmc.com",
    displayUrl: "3zkmc.com",
    description: "Comunidad Minecraft",
    type: "personal",
  },
  {
    name: "Ñam!",
    url: "https://xn--am-yja.com",
    displayUrl: "ñam.com",
    description: "Blog de gastronomía",
    type: "branding",
  },
  {
    name: "Susana Gomes",
    url: "https://susanagomes.xyz",
    displayUrl: "susanagomes.xyz",
    description: "Fintech & neobancos",
    type: "personal",
  },
  {
    name: "Erick Vega",
    url: "https://erickvega.xyz",
    displayUrl: "erickvega.xyz",
    description: "Filmmaker & editor",
    type: "branding",
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
                  src={`https://api.microlink.io/?url=${encodeURIComponent(site.url)}&screenshot=true&meta=false&embed=screenshot.url`}
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

      {/* CTA */}
      <section className="web-cta">
        <p>¿Tienes un proyecto en mente?</p>
        <a href="/#contacto" className="btn-primary">
          hablemos
        </a>
      </section>
    </div>
  );
}
