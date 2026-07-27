import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PlaceholderArt } from "@/components/PlaceholderArt/PlaceholderArt";
import { ProjectSummary } from "@/domain/Project";
import { usePageTitle } from "@/hooks/usePageTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ProjectService } from "@/services/ProjectService";

import styles from "./Portfolio.module.css";

const projectService = new ProjectService();

export function Portfolio(): ReactElement {
  usePageTitle("Work");
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [error, setError] = useState<string | null>(null);
  const gridRef = useScrollReveal<HTMLUListElement>({
    selector: "li",
    stagger: 0.06,
    deps: [projects.length],
  });

  useEffect(() => {
    let cancelled = false;

    projectService
      .listPublished()
      .then((result) => {
        if (!cancelled) setProjects(result);
      })
      .catch(() => {
        if (!cancelled) setError("Could not load projects.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) return <p role="alert">{error}</p>;

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Selected work</span>
      <h1 className={styles.heading}>Everything shown here shipped.</h1>

      <ul ref={gridRef} className={styles.grid}>
        {projects.map((project, i) => (
          <li key={project.id}>
            <Link to={`/work/${project.slug}`} className={styles.card}>
              {project.coverMedia ? (
                <img
                  src={project.coverMedia.url}
                  alt={project.coverMedia.altText || project.title}
                  className={styles.plate}
                  loading="lazy"
                />
              ) : (
                <PlaceholderArt seed={project.slug} className={styles.plate} />
              )}
              <div className={styles.meta}>
                <h2 className={styles.cardTitle}>{project.title}</h2>
                <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              {project.summary && <p className={styles.summary}>{project.summary}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
