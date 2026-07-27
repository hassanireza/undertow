import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { SERVICES } from "@/domain/Offering";
import { Package } from "@/domain/Package";
import { PackageService } from "@/services/PackageService";

import styles from "./Home.module.css";

const packageService = new PackageService();

export function Home(): ReactElement {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    packageService.listPackages().then(setPackages).catch(() => setPackages([]));
  }, []);

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
          <Link to="/work">View the work</Link>
          <Link to="/contact">Start a project</Link>
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
          {packages.map((pkg) => (
            <div key={pkg.id} className={`${styles.planCard} ${pkg.isFeatured ? styles.planFeatured : ""}`}>
              <div>
                <h3 className={styles.planTitle}>{pkg.name}</h3>
                <span className={styles.planPrice}>{pkg.priceDisplay}</span>
              </div>
              <div className={styles.planFeatures}>
                {pkg.features.map((feature) => (
                  <span key={feature.id} className={styles.planFeature}>
                    {feature.text}
                  </span>
                ))}
              </div>
              <Link to={`/checkout/${pkg.slug}`} className="button" style={{ textAlign: "center" }}>
                Start with {pkg.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.cta}`}>
        <h2 className={styles.ctaHeading}>Ready to build something exceptional?</h2>
        <Link to="/contact" className="button">
          Let&rsquo;s talk
        </Link>
      </section>
    </>
  );
}
