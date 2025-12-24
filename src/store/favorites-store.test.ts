import { useFavoritesStore } from "@/stores/useFavoritesStore";

function reset() {
  // Partial update so we don't wipe action functions.
  useFavoritesStore.setState({ ids: [], byId: {} });
  try {
    useFavoritesStore.persist?.clearStorage?.();
  } catch {}
}

describe("favorites-store", () => {
  beforeEach(reset);
  afterEach(reset);

  it("adds a product to favorites (normalized)", () => {
    useFavoritesStore.getState().add("p1");
    const state = useFavoritesStore.getState();
    expect(state.ids).toEqual(["p1"]);
    expect(state.byId["p1"]?.productId).toBe("p1");
  });

  it("toggles favorites", () => {
    useFavoritesStore.getState().toggle("p1");
    expect(useFavoritesStore.getState().ids).toEqual(["p1"]);

    useFavoritesStore.getState().toggle("p1");
    expect(useFavoritesStore.getState().ids).toEqual([]);
  });

  it("removes a product", () => {
    useFavoritesStore.getState().add("p1");
    useFavoritesStore.getState().add("p2");
    useFavoritesStore.getState().remove("p1");
    expect(useFavoritesStore.getState().ids).toEqual(["p2"]);
  });
});


