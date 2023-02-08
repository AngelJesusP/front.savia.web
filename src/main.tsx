import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/montserrat";
import "@fontsource/work-sans";
import { ConfigProvider } from "antd";
import locale from "antd/locale/es_ES";

// import "./sse";
import TemplateProvider from "./utils/components/TemplateContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <TemplateProvider>
        <App />
      </TemplateProvider>
    </ConfigProvider>
  </React.StrictMode>
);
