import type { Meta, StoryObj } from "@storybook/react";
import { en } from "@/i18n/dictionaries";
import { ProductCard } from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Organisms/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    locale: "en",
    dict: en,
    product: {
      id: "p_story_001",
      title: "Mechanical Keyboard (Story)",
      description: "A compact keyboard used for Storybook previews.",
      price: { amount: 3999, currency: "TRY" },
      locationLabel: "İstanbul / Kadıköy",
      coverImage: { src: "/products/p_istanbul_001.svg", alt: "Product image" },
      updatedAt: new Date().toISOString(),
    },
  },
};


