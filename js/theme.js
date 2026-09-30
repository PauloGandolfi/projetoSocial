const THEME_STORAGE_KEY = "instituto-novo-horizonte:tema:v1";

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function initTheme(root = document) {
  const buttons = [...root.querySelectorAll("[data-theme-toggle]")];

  function applyTheme(theme, persist = false) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark-theme", isDark);

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(isDark));
      const icon = button.querySelector(".theme-icon");
      if (icon) icon.textContent = isDark ? "☀" : "◐";
    });

    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
      } catch {
        // A preferência vale até a página ser fechada quando o armazenamento está indisponível.
      }
    }
  }

  applyTheme(readSavedTheme());
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme = document.documentElement.classList.contains("dark-theme") ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      applyTheme(event.newValue === "dark" ? "dark" : "light");
    }
  });
}
