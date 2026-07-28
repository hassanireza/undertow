import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PortalOrder } from "@/domain/Portal";
import { usePageTitle } from "@/hooks/usePageTitle";
import { AuthService } from "@/services/AuthService";
import { PortalService } from "@/services/PortalService";

import styles from "./PortalDashboard.module.css";

const portalService = new PortalService();
const authService = new AuthService();

function formatStatus(status: string): string {
  return status.replace(/_/g, " ");
}

export function PortalDashboard(): ReactElement {
  usePageTitle("Your projects");
  const navigate = useNavigate();
  const [orders, setOrders] = useState<PortalOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    portalService
      .listOrders()
      .then(setOrders)
      .catch(() => setError("Could not load your projects."));
  }, []);

  function handleLogout(): void {
    authService.logout();
    navigate("/portal/login");
  }

  if (error) return <p className="wrap" role="alert">{error}</p>;

  return (
    <section className={`wrap ${styles.section}`}>
      <span className="eyebrow">Client portal</span>
      <h1 className={styles.heading}>Your projects.</h1>

      <div className={styles.list}>
        {orders.map((order) => (
          <Link key={order.id} to={`/portal/orders/${order.id}`} className={styles.card}>
            <span className={styles.cardTitle}>{order.pkg?.name ?? `Order #${order.id}`}</span>
            <span className={styles.status}>{formatStatus(order.status)}</span>
          </Link>
        ))}
        {orders.length === 0 && <p>No projects yet.</p>}
      </div>

      <button type="button" onClick={handleLogout} className={styles.logout}>
        Sign out
      </button>
    </section>
  );
}
