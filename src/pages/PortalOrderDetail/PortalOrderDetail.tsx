import type { FormEvent, ReactElement } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PortalOrder } from "@/domain/Portal";
import { usePageTitle } from "@/hooks/usePageTitle";
import { PortalService } from "@/services/PortalService";

import styles from "./PortalOrderDetail.module.css";

const portalService = new PortalService();

function formatStatus(status: string): string {
  return status.replace(/_/g, " ");
}

function isImage(url: string): boolean {
  return /\.(png|jpe?g|webp|gif|svg)$/i.test(url);
}

export function PortalOrderDetail(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const orderId = Number(id);
  usePageTitle("Project");

  const [order, setOrder] = useState<PortalOrder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
  const [messageDraft, setMessageDraft] = useState("");
  const [uploadNote, setUploadNote] = useState("");

  function reload(): void {
    portalService
      .getOrder(orderId)
      .then(setOrder)
      .catch(() => setError("Could not load this project."));
  }

  useEffect(() => {
    if (!Number.isNaN(orderId)) reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  async function handleApprove(versionId: number, status: "approved" | "revision_requested"): Promise<void> {
    await portalService.decideApproval(versionId, status);
    reload();
  }

  async function handleCommentSubmit(event: FormEvent<HTMLFormElement>, versionId: number): Promise<void> {
    event.preventDefault();
    const body = commentDrafts[versionId]?.trim();
    if (!body) return;
    await portalService.postComment(versionId, body);
    setCommentDrafts((prev) => ({ ...prev, [versionId]: "" }));
    reload();
  }

  async function handleMessageSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!messageDraft.trim()) return;
    await portalService.postMessage(orderId, messageDraft.trim());
    setMessageDraft("");
    reload();
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (!file) return;
    await portalService.uploadFile(orderId, file, uploadNote);
    setUploadNote("");
    form.reset();
    reload();
  }

  if (error) return <p className="wrap" role="alert">{error}</p>;
  if (!order) return <p className="wrap">Loading.</p>;

  return (
    <article className={`wrap ${styles.article}`}>
      <span className="eyebrow">{formatStatus(order.status)}</span>
      <h1 className={styles.heading}>{order.pkg?.name ?? `Order #${order.id}`}</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Deliverables</h2>
        {order.deliverables.length === 0 && <p>Nothing uploaded yet.</p>}
        {order.deliverables.map((deliverable) => (
          <div key={deliverable.id} className={styles.deliverable}>
            <h3 className={styles.deliverableTitle}>{deliverable.title}</h3>
            {deliverable.versions.map((version) => (
              <div key={version.id} className={styles.version}>
                <div className={styles.versionMeta}>
                  <span>Version {version.versionNumber}</span>
                  <span className={styles.approvalStatus}>{formatStatus(version.approval.status)}</span>
                </div>

                {isImage(version.fileUrl) ? (
                  <img src={version.fileUrl} alt={deliverable.title} className={styles.preview} />
                ) : (
                  <a href={version.fileUrl} target="_blank" rel="noreferrer" className={styles.preview}>
                    View file
                  </a>
                )}

                <div className={styles.approvalRow}>
                  <button type="button" onClick={() => handleApprove(version.id, "approved")}>
                    Approve
                  </button>
                  <button type="button" onClick={() => handleApprove(version.id, "revision_requested")}>
                    Request revision
                  </button>
                </div>

                <div className={styles.commentList}>
                  {version.comments.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                      <span className={styles.commentAuthor}>{comment.authorEmail}</span>
                      {comment.body}
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => handleCommentSubmit(e, version.id)}
                  className={styles.commentForm}
                >
                  <textarea
                    rows={2}
                    placeholder="Leave a comment."
                    value={commentDrafts[version.id] ?? ""}
                    onChange={(e) =>
                      setCommentDrafts((prev) => ({ ...prev, [version.id]: e.target.value }))
                    }
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Files</h2>
        <div className={styles.uploadList}>
          {order.clientUploads.map((upload) => (
            <a key={upload.id} href={upload.fileUrl} target="_blank" rel="noreferrer">
              {upload.note || "Uploaded file"}
            </a>
          ))}
        </div>
        <form onSubmit={handleUpload} className={styles.commentForm}>
          <input type="file" name="file" required />
          <input
            type="text"
            placeholder="Note (optional)"
            value={uploadNote}
            onChange={(e) => setUploadNote(e.target.value)}
          />
          <button type="submit">Upload</button>
        </form>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Messages</h2>
        <div className={styles.messageList}>
          {order.messages.map((message) => (
            <div key={message.id}>
              <span className={styles.commentAuthor}>{message.authorEmail}</span>
              {message.body}
            </div>
          ))}
        </div>
        <form onSubmit={handleMessageSubmit} className={styles.commentForm}>
          <textarea
            rows={2}
            placeholder="Send a message."
            value={messageDraft}
            onChange={(e) => setMessageDraft(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </article>
  );
}
