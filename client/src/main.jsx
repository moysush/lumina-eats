import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import App from "./App.jsx";
import "@mantine/core/styles.css";

import { MantineProvider, createTheme } from "@mantine/core";

const luminaYellow = [
  "#fdfce4",
  "#f8f6d3",
  "#f0ecaa",
  "#e7e17c",
  "#e0d856",
  "#dbd33e",
  "#d9d02f",
  "#c0b820",
  "#aaa317",
  "#928d03",
];

const theme = createTheme({
  colors: {
    luminaYellow,
  },
  primaryColor: "luminaYellow",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      <App />
    </MantineProvider>
  </StrictMode>,
);
