export function initToast(root = document) {
  const toast = root.querySelector("#site-toast");
  const message = toast?.querySelector(".toast-message");
  const closeButton = toast?.querySelector(".toast-close");
  let timeoutId;

  function hide() {
    if (!toast) return;
    toast.hidden = true;
    window.clearTimeout(timeoutId);
  }

  closeButton?.addEventListener("click", hide);

  return function notify(text, type = "info") {
    if (!toast || !message) return false;
    const variant = ["success", "error", "info"].includes(type) ? type : "info";
    message.textContent = text;
    toast.className = `toast toast--${variant}`;
    toast.setAttribute("role", variant === "error" ? "alert" : "status");
    toast.setAttribute("aria-live", variant === "error" ? "assertive" : "polite");
    toast.hidden = false;
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(hide, 6500);
    return true;
  };
}
