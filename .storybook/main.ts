import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(baseConfig) {
    return mergeConfig(baseConfig, {
      plugins: [react()],
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../src"),
          "next/image": path.resolve(__dirname, "../src/storybook/next-image.tsx"),
          "next/link": path.resolve(__dirname, "../src/storybook/next-link.tsx"),
          "next/navigation": path.resolve(
            __dirname,
            "../src/storybook/next-navigation.ts",
          ),
        },
      },
    });
  },
};

export default config;


