import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "blog — cachicamo studios",
  description: "Ideas, procesos y reflexiones sobre contenido digital, tecnología y creatividad.",
};

export default function BlogPage() {
  const posts = getAllPosts();

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

      {/* CONTENIDO */}
      <main className="blog-main">
        <div className="blog-header">
          <h1 className="section-title">blog</h1>
          <p className="section-desc">[ideas, procesos y reflexiones]</p>
        </div>

        {posts.length === 0 ? (
          <p className="blog-empty">próximamente...</p>
        ) : (
          <ul className="blog-list">
            {posts.map((post) => (
              <li key={post.slug} className="blog-row">
                <Link href={`/blog/${post.slug}`} className="blog-row-link">
                  <div className="blog-row-top">
                    <span className="blog-row-title">
                      {post.title}
                      <span className="portfolio-row-arrow"> ↗</span>
                    </span>
                    <span className="blog-row-date">{formatDate(post.date)}</span>
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

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
}
