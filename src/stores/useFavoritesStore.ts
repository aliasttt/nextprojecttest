import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteEntity = Readonly<{
  productId: string;
  addedAt: string;
}>;

type FavoritesState = Readonly<{
  // Normalized, scalable state shape.
  ids: readonly string[];
  byId: Readonly<Record<string, FavoriteEntity>>;
}>;

type FavoritesActions = Readonly<{
  add: (productId: string) => void;
  remove: (productId: string) => void;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
}>;

export const useFavoritesStore = create<FavoritesState & FavoritesActions>()(
  persist(
    (set, get) => ({
      ids: [],
      byId: {},
      add: (productId) => {
        const state = get();
        if (state.byId[productId]) return;

        const nextById = {
          ...state.byId,
          [productId]: { productId, addedAt: new Date().toISOString() },
        };
        const nextIds = [...state.ids, productId];
        set({ byId: nextById, ids: nextIds });
      },
      remove: (productId) => {
        const state = get();
        if (!state.byId[productId]) return;

        const nextById = { ...state.byId };
        delete nextById[productId];
        const nextIds = state.ids.filter((id) => id !== productId);
        set({ byId: nextById, ids: nextIds });
      },
      toggle: (productId) => {
        const state = get();
        if (state.byId[productId]) state.remove(productId);
        else state.add(productId);
      },
      has: (productId) => Boolean(get().byId[productId]),
      clear: () => set({ byId: {}, ids: [] }),
    }),
    { name: "favorites", version: 1 },
  ),
);




