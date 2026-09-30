export function initModal(root = document) {
  const dialog = root.querySelector(".participation-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  let opener = null;

  root.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const openButton = target?.closest("[data-open-dialog]");
    const closeButton = target?.closest("[data-close-dialog]");

    if (openButton) {
      opener = openButton;
      dialog.showModal();
      dialog.querySelector("[data-close-dialog]")?.focus();
    } else if (closeButton) {
      dialog.close();
    }
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    if (opener?.isConnected) opener.focus();
    else root.querySelector("#conteudo-principal")?.focus();
    opener = null;
  });
}
