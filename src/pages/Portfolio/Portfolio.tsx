import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PlaceholderArt } from "@/components/PlaceholderArt/PlaceholderArt";
import { ProjectSummary } from "@/domain/Project";
import { ProjectService } from "@/services/ProjectService";

import styles from "./Portfolio.module.css";

const projectService = new ProjectService();

export function Portfolio(): ReactElement {
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [error, setError] = useState<string | null>(null);

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

      <ul className={styles.grid}>
        {projects.map((project, i) => (
          <li key={project.id}>
            <Link to={`/work/${project.slug}`} className={styles.card}>
              {project.coverMedia ? (
                <img
                  src={project.coverMedia.url}
                  alt={project.coverMedia.altText || project.title}
                  className={styles.plate}
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
