/* Máscaras simples para os formatos solicitados no formulário. */
function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

function maskCpf(value) {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  const numberSize = digits.length > 10 ? 5 : 4;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 2 + numberSize)}-${digits.slice(2 + numberSize)}`;
}

function maskCep(value) {
  return onlyDigits(value)
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
}

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".primary-navigation");
  const dialog = document.querySelector(".participation-dialog");
  let dialogOpener = null;

  function closeMenu() {
    if (!menuToggle || !navigation) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    navigation.classList.remove("is-open");
  }

  menuToggle?.addEventListener("click", () => {
    const willOpen = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
    navigation?.classList.toggle("is-open", willOpen);
  });

  navigation?.addEventListener("click", (event) => {
    if (event.target.closest("a, [data-open-dialog]")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  function openDialog(opener) {
    if (!dialog || typeof dialog.showModal !== "function") return;
    dialogOpener = opener;
    closeMenu();
    dialog.showModal();
    dialog.querySelector("[data-close-dialog]")?.focus();
  }

  document.querySelectorAll("[data-open-dialog]").forEach((button) => {
    button.addEventListener("click", () => openDialog(button));
  });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => dialog?.close());
  });

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog?.addEventListener("close", () => {
    if (dialogOpener?.isConnected) dialogOpener.focus();
  });

  document.querySelectorAll("[data-close-dialog-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      dialog?.close();
      const target = document.querySelector(link.getAttribute("href"));
      history.replaceState(null, "", link.getAttribute("href"));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const toast = document.querySelector("#site-toast");
  const toastMessage = toast?.querySelector(".toast-message");
  let toastTimer;

  function hideToast() {
    if (!toast) return;
    toast.hidden = true;
    window.clearTimeout(toastTimer);
  }

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(hideToast, 6500);
  }

  toast?.querySelector(".toast-close")?.addEventListener("click", hideToast);

  const cpf = document.querySelector("#cpf");
  const phone = document.querySelector("#telefone");
  const cep = document.querySelector("#cep");
  const form = document.querySelector("#volunteer-form");
  const formError = document.querySelector("#form-error");

  cpf?.addEventListener("input", (event) => { event.target.value = maskCpf(event.target.value); });
  phone?.addEventListener("input", (event) => { event.target.value = maskPhone(event.target.value); });
  cep?.addEventListener("input", (event) => { event.target.value = maskCep(event.target.value); });

  if (!form) return;

  const fields = [...form.querySelectorAll("input, select, textarea")];

  function updateFieldState(field) {
    const wrapper = field.closest(".field");
    if (!wrapper) return;
    const hasValue = field.type === "checkbox" ? field.checked : field.value.trim() !== "";
    const shouldShow = field.required || hasValue;
    const invalid = !field.checkValidity();

    wrapper.classList.toggle("is-invalid", shouldShow && invalid);
    wrapper.classList.toggle("is-valid", shouldShow && !invalid);
    if (shouldShow) field.setAttribute("aria-invalid", String(invalid));
    else field.removeAttribute("aria-invalid");
  }

  fields.forEach((field) => {
    field.addEventListener("blur", () => updateFieldState(field));
    field.addEventListener("input", () => {
      if (form.classList.contains("was-validated")) {
        updateFieldState(field);
        if (form.checkValidity()) formError.hidden = true;
      }
    });
    field.addEventListener("change", () => {
      if (form.classList.contains("was-validated")) {
        updateFieldState(field);
        if (form.checkValidity()) formError.hidden = true;
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-validated");
    fields.forEach(updateFieldState);

    if (!form.checkValidity()) {
      formError.hidden = false;
      form.querySelector(":invalid")?.focus();
      return;
    }

    formError.hidden = true;
    showToast("Cadastro enviado com sucesso! Entraremos em contato em breve.");
    form.reset();
    form.classList.remove("was-validated");
    fields.forEach((field) => {
      field.removeAttribute("aria-invalid");
      field.closest(".field")?.classList.remove("is-invalid", "is-valid");
    });
  });
});
