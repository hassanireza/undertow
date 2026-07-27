import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PlaceholderArt } from "@/components/PlaceholderArt/PlaceholderArt";
import { ProjectDetail } from "@/domain/Project";
import { ProjectService } from "@/services/ProjectService";

import styles from "./ProjectPage.module.css";

const projectService = new ProjectService();

export function ProjectPage(): ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;

    projectService
      .getBySlug(slug)
      .then((result) => {
        if (!cancelled) setProject(result);
      })
      .catch(() => {
        if (!cancelled) setError("Project not found.");
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) return <p role="alert">{error}</p>;
  if (!project) return <p className="wrap">Loading…</p>;

  return (
    <article className={`wrap ${styles.article}`}>
      {project.coverMedia ? (
        <img
          src={project.coverMedia.url}
          alt={project.coverMedia.altText || project.title}
          className={styles.plate}
        />
      ) : (
        <PlaceholderArt seed={project.slug} className={styles.plate} />
      )}
      <span className="eyebrow">{project.category?.name ?? "Project"}</span>
      <h1 className={styles.title}>{project.title}</h1>
      <div className={styles.meta}>
        {project.clientName && <span>{project.clientName}</span>}
        <span>{project.createdAt.getFullYear()}</span>
      </div>
      <p className={styles.body}>{project.body || project.summary}</p>
      <a
        href="https://hassanireza.github.io/portfolio"
        target="_blank"
        rel="noreferrer"
        className={`button ${styles.portfolioLink}`}
      >
        View more work
      </a>
    </article>
  );
}
