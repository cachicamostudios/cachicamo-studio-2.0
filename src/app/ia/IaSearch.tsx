"use client";

import { useState, useMemo } from "react";

export type IaProject = {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  metrics?: number;
  url?: string;
  github?: string;
  icon: string;
  status?: "activo" | "beta" | "desarrollo";
};

const CATEGORIES = [
  "todos",
  "automatización",
  "agentes",
  "chat",
  "asistentes",
  "generación de contenido",
];

export default function IaSearch({ projects }: { projects: IaProject[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        query === "" ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory =
        activeCategory === "todos" ||
        p.category.toLowerCase() === activeCategory.toLowerCase();
      return matchesQuery && matchesCategory;
    });
  }, [projects, query, activeCategory]);

  return (
    <div className="ia-search-container">
      <div className="ia-search-bar">
        <svg className="ia-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="buscar proyectos de ia..."
          className="ia-search-input"
        />
      </div>

      <div className="ia-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`ia-filter-pill${activeCategory === cat ? " ia-filter-pill--active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="ia-empty">no hay proyectos que coincidan con tu búsqueda.</p>
      ) : (
        <div className="ia-grid">
          {filtered.map((project) => (
            <IaCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExtIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function IaCard({ project }: { project: IaProject }) {
  return (
    <div className="ia-card">
      <div className="ia-card-top">
        <div className="ia-card-icon">{project.icon}</div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ia-card-ext-link"
            aria-label={`Visitar ${project.name}`}
          >
            <ExtIcon />
          </a>
        )}
      </div>

      <div className="ia-card-body">
        <div className="ia-card-meta">
          <span className="ia-card-category">{project.category}</span>
          {project.status && (
            <span className={`ia-card-status ia-card-status--${project.status}`}>
              {project.status}
            </span>
          )}
        </div>
        <h3 className="ia-card-name">{project.name}</h3>
        <p className="ia-card-desc">{project.description}</p>
      </div>

      <div className="ia-card-footer">
        <div className="ia-card-tags">
          {project.tags.map((t) => (
            <span key={t} className="ia-tag">{t}</span>
          ))}
        </div>
        <div className="ia-card-actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ia-github-badge"
              aria-label="Ver en GitHub"
            >
              <GitHubIcon />
              github
            </a>
          )}
          {project.metrics !== undefined && (
            <span className="ia-card-metrics">★ {project.metrics.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
