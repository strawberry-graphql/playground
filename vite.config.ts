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
            src: "./fonts/Satoshi-*.ttf",

            transform(font) {
              font.weight = undefined;

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
