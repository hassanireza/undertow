import type { ReactElement } from "react";
import { Link } from "react-router-dom";

import { Icon } from "@/components/Icon/Icon";
import { PLANS, SERVICES } from "@/domain/Offering";

import styles from "./Home.module.css";

export function Home(): ReactElement {
  return (
    <>
      <section className={`wrap ${styles.hero}`}>
        <span className="eyebrow">Web design and motion graphics</span>
        <h1 className={styles.title}>Undertow</h1>
        <p className={styles.lede}>
          A studio for the current beneath the surface. Restrained web design
          and motion work, built one deliberate frame at a time.
        </p>
        <div className={styles.rule}>
          <Link to="/work" className={styles.ruleLink}>
            View the work
            <Icon name="arrow-right" size={14} />
          </Link>
          <Link to="/contact" className={styles.ruleLink}>
            Start a project
            <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </section>

      <section className={`wrap ${styles.section}`}>
        <span className="eyebrow">What we do</span>
        <h2 className={styles.sectionHeading}>Three disciplines, one point of view.</h2>

        <div className={styles.serviceGrid}>
          {SERVICES.map((service, i) => (
            <div key={service.title} className={styles.serviceCard}>
              <span className={styles.serviceIndex}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.section}`}>
        <span className="eyebrow">Pricing</span>
        <h2 className={styles.sectionHeading}>Three ways to work together.</h2>
        <p className={styles.sectionLede}>
          Every project starts as a conversation. These are starting points,
          not fixed menus.
        </p>

        <div className={styles.planGrid}>
          {PLANS.map((plan) => (
            <div key={plan.name} className={`${styles.planCard} ${plan.featured ? styles.planFeatured : ""}`}>
              <div>
                <h3 className={styles.planTitle}>{plan.name}</h3>
                <span className={styles.planPrice}>{plan.price}</span>
              </div>
              <div className={styles.planFeatures}>
                {plan.features.map((feature) => (
                  <span key={feature} className={styles.planFeature}>
                    {feature}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="button" style={{ justifyContent: "center" }}>
                Start with {plan.name}
                <Icon name="arrow-right" size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.cta}`}>
        <h2 className={styles.ctaHeading}>Ready to build something exceptional?</h2>
        <Link to="/contact" className="button">
          Let&rsquo;s talk
          <Icon name="arrow-right" size={16} />
        </Link>
      </section>
    </>
  );
}
