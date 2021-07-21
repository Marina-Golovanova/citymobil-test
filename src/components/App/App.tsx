import React from "react";
import { ToastProvider } from "react-toast-notifications";
import { PageLayout } from "../page-layout/PageLayout";

import "./App.scss";

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <PageLayout />
    </ToastProvider>
  );
};
