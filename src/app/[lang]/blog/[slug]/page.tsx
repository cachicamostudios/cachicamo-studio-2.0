import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getDictionary } from "@/get-dictionary";
import { i18n, type Locale } from "@/i18n-config";

const SITE_URL = "https://cachicamo.studio";

interface Props {
  params: Promise<{ lang: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${slug}`;

  return {
    title: `${post.title} — cachicamo studios`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "Cachicamo Studios",
      images: [{ url: "/cachicamo-logo.png", width: 512, height: 512, alt: post.title }],
      type: "article",
      publishedTime: post.date ? new Date(post.date).toISOString() : undefined,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/cachicamo-logo.png"],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(lang);
  const nav = dict.home.nav;
  const prefix = lang === i18n.defaultLocale ? "" : `/${lang}`;
  const home = prefix || "/";

  // Convertir markdown básico a HTML (sin dependencias extra)
  const html = mdToHtml(post.content);

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

      {/* ARTÍCULO */}
      <main className="post-main">
        <div className="post-meta">
          <Link href={`${prefix}/blog`} className="post-back">{dict.blog.backToBlog}</Link>
          {post.date && <span className="blog-row-date">{formatDate(post.date, lang)}</span>}
        </div>

        <h1 className="post-title">{post.title}</h1>

        {post.tags.length > 0 && (
          <div className="blog-row-tags post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">[{tag}]</span>
            ))}
          </div>
        )}

        <article
          className="post-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
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

// Parser de markdown básico (headings, bold, italic, párrafos, listas)
function mdToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:4px;margin:1rem 0;" />')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<(h[1-3]|ul|ol|li|img)/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
}
