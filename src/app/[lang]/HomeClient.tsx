"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getCalApi } from "@calcom/embed-react";
import type { Dictionary } from "@/get-dictionary";

type HomeDict = Dictionary["home"];

export default function HomeClient({
  dict,
  prefix,
}: {
  dict: HomeDict;
  prefix: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { label: dict.nav.services, href: "#servicios" },
    { label: dict.nav.portfolio, href: "#portfolio" },
    { label: dict.nav.about, href: "#nosotros" },
    { label: dict.nav.blog, href: `${prefix}/blog` },
    { label: dict.nav.web, href: `${prefix}/web` },
    { label: dict.nav.contact, href: "#contacto" },
  ];

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

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
        <nav className="nav-links" aria-label={dict.nav.ariaNav}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Hamburger mobile */}
        <button
          className="nav-hamburger"
          aria-label={dict.nav.ariaMenu}
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
            {dict.hero.subLine1}
            <br />
            {dict.hero.subLine2}
          </p>
          <div className="hero-ctas">
            <a href="#portfolio" className="btn-primary">
              {dict.hero.ctaPortfolio}
            </a>
            <a href="#contacto" className="btn-ghost">
              {dict.hero.ctaContact}
            </a>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="section">
        <div className="section-header">
          <h2 className="section-title">{dict.services.title}</h2>
          <p className="section-desc">{dict.services.desc}</p>
        </div>

        <div className="services-prose">
          <p dangerouslySetInnerHTML={{ __html: dict.services.p1 }} />
          <p dangerouslySetInnerHTML={{ __html: dict.services.p2 }} />
          <p dangerouslySetInnerHTML={{ __html: dict.services.p3 }} />
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="section section-alt">
        <div className="section-header">
          <h2 className="section-title">{dict.portfolio.title}</h2>
          <p className="section-desc">{dict.portfolio.desc}</p>
        </div>

        <ul className="portfolio-list">
          {dict.portfolio.items.map((p) => (
            <PortfolioRow key={p.title} title={p.title} tag={p.tag} url={p.url} />
          ))}
        </ul>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="section">
        <div className="section-header">
          <h2 className="section-title">{dict.about.title}</h2>
        </div>
        <div className="about-text">
          <p>{dict.about.p1}</p>
          <p>{dict.about.p2}</p>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="section section-alt">
        <div className="section-header">
          <h2 className="section-title">{dict.contact.title}</h2>
          <p className="section-desc">{dict.contact.desc}</p>
        </div>

        <div className="contact-booking">
          <p className="booking-desc">{dict.contact.bookingDesc}</p>
          <button
            data-cal-namespace="30min"
            data-cal-link="cachicamostudios/30min"
            data-cal-config='{"layout":"month_view"}'
            className="btn-primary btn-submit"
          >
            {dict.contact.bookingCta}
          </button>
          <p className="booking-note">{dict.contact.bookingNote}</p>
        </div>
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
        <div className="footer-right"></div>
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
