import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

const SITE_URL = "https://cachicamo.studio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const path = lang === i18n.defaultLocale ? "/blog" : `/${lang}/blog`;
  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        es: `${SITE_URL}/blog`,
        en: `${SITE_URL}/en/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const nav = dict.home.nav;
  const b = dict.blog;
  const prefix = lang === i18n.defaultLocale ? "" : `/${lang}`;
  const home = prefix || "/";
  const posts = getAllPosts();

  return (
    <div className="site-wrapper">
      <div className="dot-grid" aria-hidden="true" />

      {/* NAV */}
      <header className="nav-bar">
        <Link href={home} className="nav-logo" aria-label="Cachicamo Studios">
          <Image
            src="/cachicamo-logo.png"
            alt="Cachicamo Studios"
            width={36}
            height={36}
            className="logo-img"
            draggable={false}
          />
          <span className="nav-brand">cachicamo studios</span>
        </Link>
        <nav className="nav-links" aria-label={nav.ariaNav}>
          <Link href={`${prefix}/#servicios`} className="nav-link">{nav.services}</Link>
          <Link href={`${prefix}/#portfolio`} className="nav-link">{nav.portfolio}</Link>
          <Link href={`${prefix}/#nosotros`} className="nav-link">{nav.about}</Link>
          <Link href={`${prefix}/blog`} className="nav-link">{nav.blog}</Link>
          <Link href={`${prefix}/web`} className="nav-link">{nav.web}</Link>
          <Link href={`${prefix}/#contacto`} className="nav-link">{nav.contact}</Link>
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="blog-main">
        <div className="blog-header">
          <Link href={home} className="post-back">{b.back}</Link>
          <h1 className="section-title">{b.title}</h1>
          <p className="section-desc">{b.desc}</p>
        </div>

        {posts.length === 0 ? (
          <p className="blog-empty">{b.empty}</p>
        ) : (
          <ul className="blog-list">
            {posts.map((post) => (
              <li key={post.slug} className="blog-row">
                <Link href={`${prefix}/blog/${post.slug}`} className="blog-row-link">
                  <div className="blog-row-top">
                    <span className="blog-row-title">
                      {post.title}
                      <span className="portfolio-row-arrow"> ↗</span>
                    </span>
                    <span className="blog-row-date">{formatDate(post.date, lang)}</span>
                  </div>
                  {post.description && (
                    <p className="blog-row-desc">{post.description}</p>
                  )}
                  {post.tags.length > 0 && (
                    <div className="blog-row-tags">
                      {post.tags.map((tag) => (
                        <span key={tag} className="blog-tag">[{tag}]</span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function formatDate(dateStr: string, lang: Locale): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString(lang === "en" ? "en-US" : "es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
