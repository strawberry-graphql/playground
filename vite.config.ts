import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
  plugins: [
    react(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Satoshi",
            local: "Satoshi",
            src: "./Satoshi-*.ttf",

            transform(font) {
              if (font.basename === "Satoshi-VariableItalic") {
                font.style = "italic";
              }

              return font;
            },
          },
        ],

        preload: true,
        prefetch: false,
        injectTo: "head-prepend",
      },
    }),
  ],
});
