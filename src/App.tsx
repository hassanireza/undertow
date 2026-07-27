import type { ReactElement } from "react";

import { Route, Routes } from "react-router-dom";

import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { Brand } from "@/pages/Brand/Brand";
import { Checkout } from "@/pages/Checkout/Checkout";
import { Contact } from "@/pages/Contact/Contact";
import { Home } from "@/pages/Home/Home";
import { OrderConfirmation } from "@/pages/OrderConfirmation/OrderConfirmation";
import { Portfolio } from "@/pages/Portfolio/Portfolio";
import { ProjectPage } from "@/pages/ProjectPage/ProjectPage";

export function App(): ReactElement {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Portfolio />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout/:slug" element={<Checkout />} />
          <Route path="/order/:id/confirmation" element={<OrderConfirmation />} />
          <Route path="/brand" element={<Brand />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
