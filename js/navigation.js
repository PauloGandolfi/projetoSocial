const appPages = new Set(["index.html", "projetos.html", "cadastro.html"]);

function pageName(url) {
  return url.pathname.split("/").filter(Boolean).at(-1) || "index.html";
}

function scrollToHash(url) {
  if (!url.hash) return false;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return false;
  if (!target.matches("a, button, input, select, textarea, [tabindex]")) {
    target.setAttribute("tabindex", "-1");
  }
  target.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  return true;
}

export function initNavigation({ onRouteChange = () => {}, notify = () => {} } = {}) {
  const main = document.querySelector("#conteudo-principal");
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".primary-navigation");
  let requestNumber = 0;

  function closeMenu({ restoreFocus = false } = {}) {
    const wasOpen = menuToggle?.getAttribute("aria-expanded") === "true";
    menu?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
    if (restoreFocus && wasOpen) menuToggle?.focus();
  }

  function updateCurrentPage(url) {
    const currentPage = pageName(url);
    document.querySelectorAll(".primary-navigation a[href]").forEach((link) => {
      const linkUrl = new URL(link.href, window.location.href);
      if (pageName(linkUrl) === currentPage) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  async function loadRoute(url, { push = false, focusMain = true } = {}) {
    if (!main || !appPages.has(pageName(url))) return false;
    const request = ++requestNumber;

    try {
      const response = await fetch(`${url.pathname}${url.search}`, {
        headers: { Accept: "text/html" },
      });
      if (!response.ok) throw new Error(`A página respondeu com status ${response.status}.`);

      const markup = await response.text();
      const nextDocument = new DOMParser().parseFromString(markup, "text/html");
      const nextMain = nextDocument.querySelector("#conteudo-principal");
      if (!nextMain) throw new Error("Não encontrei o conteúdo principal da página.");
      if (request !== requestNumber) return false;

      if (push) history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      main.innerHTML = nextMain.innerHTML;
      document.title = nextDocument.title;
      const nextDescription = nextDocument.querySelector('meta[name="description"]')?.content;
      const description = document.querySelector('meta[name="description"]');
      if (description && nextDescription) description.content = nextDescription;
      updateCurrentPage(url);
      closeMenu();

      const dialog = document.querySelector(".participation-dialog");
      if (dialog?.open) dialog.close();

      onRouteChange(main);

      if (url.hash) {
        requestAnimationFrame(() => scrollToHash(url));
      } else if (focusMain) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      }
      return true;
    } catch (error) {
      notify("Não foi possível abrir essa seção. Confira a conexão local e tente novamente.", "error");
      console.error("Falha na navegação da aplicação:", error);
      return false;
    }
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menu?.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    if (isOpen) menu?.querySelector("a, button")?.focus();
  });

  document.addEventListener("keydown", (event) => {
    const dialog = document.querySelector(".participation-dialog");
    if (event.key === "Escape" && !dialog?.open && menuToggle?.getAttribute("aria-expanded") === "true") {
      closeMenu({ restoreFocus: true });
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;

    if (target.closest(".primary-navigation") && target.closest("a, button")) closeMenu();

    const link = target.closest("a[href]");
    if (!link || link.target || link.hasAttribute("download") || event.defaultPrevented) return;

    let url;
    try {
      url = new URL(link.href, window.location.href);
    } catch {
      return;
    }

    if (url.origin !== window.location.origin || !appPages.has(pageName(url))) return;

    const isSamePage = url.pathname === window.location.pathname;
    if (isSamePage && !url.hash) {
      event.preventDefault();
      closeMenu();
      const dialog = document.querySelector(".participation-dialog");
      if (dialog?.open) dialog.close();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      return;
    }

    if (isSamePage && url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)))) {
      event.preventDefault();
      closeMenu();
      const dialog = document.querySelector(".participation-dialog");
      if (dialog?.open) dialog.close();
      history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      scrollToHash(url);
      return;
    }

    event.preventDefault();
    closeMenu();
    loadRoute(url, { push: true });
  });

  window.addEventListener("popstate", () => {
    const url = new URL(window.location.href);
    loadRoute(url, { focusMain: false });
  });

  window.addEventListener("hashchange", () => scrollToHash(new URL(window.location.href)));

  updateCurrentPage(new URL(window.location.href));
}
