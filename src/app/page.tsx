"use client";
import { useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "servicios", href: "#servicios" },
  { label: "portfolio", href: "#portfolio" },
  { label: "nosotros", href: "#nosotros" },
  { label: "contacto", href: "#contacto" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-wrapper">
      {/* Grid de puntos de fondo */}
      <div className="dot-grid" aria-hidden="true" />

      {/* NAV */}
      <header className="nav-bar">
        <a href="#" className="nav-logo" aria-label="Cachicamo Studios">
          <Image
            src="/cachicamo-logo.png"
            alt="Cachicamo Studios"
            width={36}
            height={36}
            className="logo-img"
            draggable={false}
          />
          <span className="nav-brand">cachicamo studios</span>
        </a>

        {/* Nav desktop */}
        <nav className="nav-links" aria-label="Navegación principal">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Hamburger mobile */}
        <button
          className="nav-hamburger"
          aria-label="Menú"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`ham-line ${menuOpen ? "open" : ""}`} />
          <span className={`ham-line ${menuOpen ? "open" : ""}`} />
          <span className={`ham-line ${menuOpen ? "open" : ""}`} />
        </button>
      </header>

      {/* Nav mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section className="hero-section">
        {/* Logo plata grande detrás del título */}
        <div className="hero-logo-bg" aria-hidden="true">
          <Image
            src="/cachicamo-logo.png"
            alt=""
            width={420}
            height={420}
            className="hero-logo-ghost"
            draggable={false}
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-line1">cachicamo</span>
            <span className="hero-title-line2">studios</span>
          </h1>
          <p className="hero-sub">
            contenido, ideas y tecnología<br />
            para un internet más creativo.
          </p>
          <div className="hero-ctas">
            <a href="#portfolio" className="btn-primary">ver portfolio ↗</a>
            <a href="#contacto" className="btn-ghost">hablemos</a>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <div className="section-header">
          <h2 className="section-title">servicios</h2>
          <p className="section-desc">
            [lo que construimos y producimos]
          </p>
        </div>

        <div className="services-prose">
          <p>
            hacemos <strong>contenido digital y YouTube</strong>: producción de video,
            estrategia de canal y edición para creadores y marcas que quieren construir
            audiencias reales. también trabajamos en <strong>Web3, NFTs y tecnologías emergentes</strong>,
            desde la consultoría hasta la producción de proyectos en blockchain y economía digital.
          </p>
          <p>
            creamos y gestionamos <strong>blogs y medios digitales</strong>: newsletters,
            comunidades y publicaciones con voz propia. diseñamos <strong>identidad visual y branding</strong>
            {" "}con visión global: sistemas de diseño, comunicación de marca y creatividad aplicada
            a proyectos que necesitan diferenciarse.
          </p>
          <p>
            y cuando los equipos necesitan dirección, ofrecemos <strong>consultoría e innovación tech</strong>:
            asesoría estratégica para escalar en lo digital sin perder el norte creativo.
          </p>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="section section-alt">
        <div className="section-header">
          <h2 className="section-title">portfolio</h2>
          <p className="section-desc">
            [proyectos que hemos creado]
          </p>
        </div>

        <ul className="portfolio-list">
          <PortfolioRow
            title="El Grit Cast"
            tag="podcast · contenido · media"
            url="https://elgritcast.com"
          />
          <PortfolioRow
            title="Ñam!"
            tag="gastronomía · lifestyle · digital"
            url="https://ñam.com"
          />
          <PortfolioRow
            title="3zkMC"
            tag="música · web3 · identidad"
            url="https://3zkmc.com"
          />
          <PortfolioRow
            title="Susana Gomes"
            tag="fintech · neobancos · identidad"
            url="https://susanagomes.xyz"
          />
          <PortfolioRow
            title="Erick Vega"
            tag="creative consulting · filmmaking · branding"
            url="https://erickvega.xyz"
          />
          <PortfolioRow
            title="YouTube El Grit Cast"
            tag="youtube · video · comunidad"
            url="https://youtube.com/@elgritcast"
          />
          <PortfolioRow
            title="YouTube 3zkMC"
            tag="youtube · música · contenido"
            url="https://youtube.com/@3zkMC"
          />
        </ul>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="section">
        <div className="section-header">
          <h2 className="section-title">nosotros</h2>
        </div>
        <div className="about-text">
          <p>
            Cachicamo Studios es una agencia creativa nacida para construir
            proyectos digitales con identidad propia. Producimos contenido,
            desarrollamos marcas y exploramos tecnología, desde YouTube y blogs
            hasta Web3 y branding, con la convicción de que internet puede ser
            un lugar más creativo y diverso.
          </p>
          <p>
            Trabajamos con equipos pequeños y ambiciones grandes. Creemos en la
            colaboración honesta, en las ideas que incomodan un poco, y en la
            tecnología como herramienta al servicio de la cultura.
          </p>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section section-alt">
        <div className="section-header">
          <h2 className="section-title">contacto</h2>
          <p className="section-desc">[cuéntanos tu proyecto]</p>
        </div>

        <form
          action="https://formspree.io/f/xkgbnjpr"
          method="POST"
          className="contact-form"
        >
          <div className="form-field">
            <label htmlFor="email" className="form-label">email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="email"
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="message" className="form-label">mensaje</label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="form-input form-textarea"
            />
          </div>
          <input
            type="hidden"
            name="_redirect"
            value="https://cachicamo.studio/gracias.html"
          />
          <button type="submit" className="btn-primary btn-submit">
            enviar →
          </button>
        </form>
      </section>

      {/* BOTÓN FLOTANTE MASTODON */}
      <a
        href="https://mastodon.social/@cachicamostudios"
        target="_blank"
        rel="me noopener noreferrer"
        aria-label="Cachicamo Studios en Mastodon"
        className="mastodon-fab"
      >
        <Image
          src="/mastodon-icon.svg"
          alt="Mastodon"
          width={22}
          height={22}
          draggable={false}
          className="mastodon-fab-icon"
        />
      </a>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-left">
          <Image
            src="/cachicamo-logo.png"
            alt="Cachicamo Studios"
            width={28}
            height={28}
            className="footer-logo"
            draggable={false}
          />
          <span className="footer-copy">
            © {new Date().getFullYear()} Cachicamo Studios LLC
          </span>
        </div>
        <div className="footer-right">
        </div>
      </footer>
    </div>
  );
}

/* ─── Sub-componentes ─────────────────────────────── */


function PortfolioRow({
  title,
  tag,
  url,
}: {
  title: string;
  tag: string;
  url: string;
}) {
  return (
    <li className="portfolio-row">
      <a
        href={url}
        target={url !== "#" ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="portfolio-row-link"
      >
        <span className="portfolio-row-title">
          {title} <span className="portfolio-row-arrow">↗</span>
        </span>
        <span className="portfolio-row-tag">[{tag}]</span>
      </a>
    </li>
  );
}

