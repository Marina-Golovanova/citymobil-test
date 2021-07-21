import React from "react";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { MainContent } from "../main-content/MainContent";
import { Footer } from "../footer/Footer";

import "./page-layout.scss";

export const PageLayout: React.FC = () => {
  return (
    <div className="page-layout">
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
};
