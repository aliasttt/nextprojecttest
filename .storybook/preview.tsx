import type { Preview } from "@storybook/react";
import React from "react";
import "../src/app/globals.css";
import { StoryProviders } from "../src/storybook/StoryProviders";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <StoryProviders>
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-zinc-100">
          <Story />
        </div>
      </StoryProviders>
    ),
  ],
};

export default preview;





