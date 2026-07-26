import type { ReactElement } from "react";

import { Route, Routes } from "react-router-dom";

import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";
import { Contact } from "@/pages/Contact/Contact";
import { Home } from "@/pages/Home/Home";
import { Portfolio } from "@/pages/Portfolio/Portfolio";
import { ProjectPage } from "@/pages/ProjectPage/ProjectPage";

export function App(): ReactElement {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Portfolio />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}
