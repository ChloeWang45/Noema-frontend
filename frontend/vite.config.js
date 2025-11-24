import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/Noema-frontend/",   // GitHub Pages folder for your repo
});
