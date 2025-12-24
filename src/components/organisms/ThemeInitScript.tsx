function getThemeInitScript() {
  // Small inline script to avoid a flash of incorrect theme on first paint.
  // Reads persisted theme from localStorage and applies the `dark` class early.
  // This is intentionally tiny and self-contained (no extra dependency).
  return `
(function () {
  try {
    var raw = localStorage.getItem("theme");
    if (!raw) return;
    var parsed = JSON.parse(raw);
    var theme = parsed && parsed.state && parsed.state.theme;
    var applied = theme;
    if (theme === "system") {
      applied = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (applied === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  } catch (e) {}
})();`.trim();
}

export function ThemeInitScript() {
  // Keep this as a server component; it just renders a script tag.
  return (
    <script
      dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
    />
  );
}


