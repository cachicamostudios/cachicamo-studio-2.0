import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — cachicamo studios`,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Convertir markdown básico a HTML (sin dependencias extra)
  const html = mdToHtml(post.content);

  return (
    <div className="site-wrapper">
      <div className="dot-grid" aria-hidden="true" />

      {/* NAV */}
      <header className="nav-bar">
        <a href="/" className="nav-logo" aria-label="Cachicamo Studios">
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
        <nav className="nav-links" aria-label="Navegación principal">
          <a href="/#servicios" className="nav-link">[servicios]</a>
          <a href="/#portfolio" className="nav-link">[portfolio]</a>
          <a href="/#nosotros" className="nav-link">[nosotros]</a>
          <a href="/blog" className="nav-link">[blog]</a>
          <a href="/#contacto" className="nav-link">[contacto]</a>
        </nav>
      </header>

      {/* ARTÍCULO */}
      <main className="post-main">
        <div className="post-meta">
          <Link href="/blog" className="post-back">← blog</Link>
          {post.date && <span className="blog-row-date">{formatDate(post.date)}</span>}
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

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
}

// Parser de markdown básico (headings, bold, italic, párrafos, listas)
function mdToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<(h[1-3]|ul|ol|li)/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br/>")}</p>`;
    })
    .join("\n");
}
