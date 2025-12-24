import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { I18nProvider } from "@/i18n/I18nProvider";
import { en } from "@/i18n/dictionaries";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { FavoriteButton } from "./FavoriteButton";

function reset() {
  // Wrap in act() to keep React state update warnings out of test output.
  act(() => {
    useFavoritesStore.setState({ ids: [], byId: {} });
  });
  try {
    useFavoritesStore.persist?.clearStorage?.();
  } catch {}
}

describe("FavoriteButton", () => {
  beforeEach(reset);
  afterEach(reset);

  it("toggles favorites and updates aria-label", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider locale="en" dict={en}>
        <FavoriteButton productId="p1" />
      </I18nProvider>,
    );

    const button = screen.getByRole("button", { name: en.product.addToFavorites });
    await user.click(button);

    expect(
      screen.getByRole("button", { name: en.product.removeFromFavorites }),
    ).toBeInTheDocument();
  });
});


