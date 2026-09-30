import { getVolunteerApplications, saveVolunteerApplication } from "./storage.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function makeFieldMessage(field) {
  const wrapper = field.closest(".field");
  if (!wrapper) return null;

  const id = `${field.id || field.name}-feedback`;
  let message = wrapper.querySelector(`#${CSS.escape(id)}`);
  if (!message) {
    message = document.createElement("small");
    message.id = id;
    message.className = "field-message";
    message.setAttribute("aria-live", "polite");
    wrapper.append(message);
  }

  const describedBy = new Set((field.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
  describedBy.add(id);
  field.setAttribute("aria-describedby", [...describedBy].join(" "));
  return message;
}

function validateEmailFormat(field) {
  const value = field.value.trim();
  field.setCustomValidity(value && !EMAIL_PATTERN.test(value) ? "Informe um e-mail válido." : "");
}

function getErrorMessage(field) {
  const validity = field.validity;
  if (validity.valueMissing) {
    return field.type === "checkbox" ? "Marque esta opção obrigatória." : "Preencha este campo obrigatório.";
  }
  if (validity.tooShort) return `Informe pelo menos ${field.minLength} caracteres.`;
  if (field.type === "email" && field.value && !EMAIL_PATTERN.test(field.value.trim())) return "Informe um e-mail válido.";
  if (validity.typeMismatch) return "Confira o formato informado.";
  if (validity.patternMismatch) {
    const patternMessages = {
      cpf: "Use o formato 000.000.000-00.",
      telefone: "Use o formato (41) 99999-9999.",
      cep: "Use o formato 00000-000.",
    };
    return patternMessages[field.name] || "Confira o formato indicado.";
  }
  return validity.valid ? "" : "Confira o valor informado.";
}

function maskDigits(value) {
  return value.replace(/\D/g, "");
}

function maskCpf(value) {
  return maskDigits(value).slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(value) {
  const digits = maskDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  const numberSize = digits.length > 10 ? 5 : 4;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 2 + numberSize)}-${digits.slice(2 + numberSize)}`;
}

function maskCep(value) {
  return maskDigits(value).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
}

function updateStoredStatus(status, applications) {
  if (!status) return;
  const latest = applications.at(-1);
  if (!latest) {
    status.hidden = true;
    status.textContent = "";
    return;
  }

  const date = new Date(latest.submittedAt);
  const dateLabel = Number.isNaN(date.getTime()) ? "data não disponível" : date.toLocaleDateString("pt-BR");
  const countLabel = applications.length === 1 ? "1 cadastro salvo" : `${applications.length} cadastros salvos`;
  status.textContent = `Este navegador tem ${countLabel}. Último envio: ${dateLabel}.`;
  status.hidden = false;
}

export function initForm(root = document, notify = () => {}) {
  const form = root.querySelector("#volunteer-form");
  if (!form) return;

  const formError = form.querySelector("#form-error");
  const storedStatus = root.querySelector("#stored-status");
  const fields = [...form.querySelectorAll("input, select, textarea")];
  let submitted = false;

  updateStoredStatus(storedStatus, getVolunteerApplications());

  function validateField(field, force = false) {
    if (field.type === "email") validateEmailFormat(field);

    const hasValue = field.type === "checkbox" ? field.checked : field.value.trim() !== "";
    const shouldShow = force || submitted || field.dataset.touched === "true" || hasValue;
    const wrapper = field.closest(".field");
    const message = makeFieldMessage(field);
    if (!wrapper || !message) return field.checkValidity();

    const invalid = !field.checkValidity();
    wrapper.classList.toggle("is-invalid", shouldShow && invalid);
    wrapper.classList.toggle("is-valid", shouldShow && hasValue && !invalid);
    if (shouldShow && invalid) {
      field.setAttribute("aria-invalid", "true");
      message.textContent = getErrorMessage(field);
    } else {
      field.removeAttribute("aria-invalid");
      message.textContent = "";
    }
    return !invalid;
  }

  function updateSummary() {
    const isValid = form.checkValidity() && fields.every((field) => {
      if (field.type === "email") validateEmailFormat(field);
      return field.checkValidity();
    });
    if (submitted && formError) formError.hidden = isValid;
  }

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      if (field.id === "cpf") field.value = maskCpf(field.value);
      if (field.id === "telefone") field.value = maskPhone(field.value);
      if (field.id === "cep") field.value = maskCep(field.value);
      validateField(field);
      updateSummary();
    });
    field.addEventListener("change", () => {
      validateField(field);
      updateSummary();
    });
    field.addEventListener("blur", () => {
      field.dataset.touched = "true";
      validateField(field, true);
      updateSummary();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitted = true;
    fields.forEach((field) => {
      field.dataset.touched = "true";
      validateField(field, true);
    });

    const firstInvalid = fields.find((field) => !field.checkValidity());
    if (firstInvalid) {
      if (formError) formError.hidden = false;
      firstInvalid.focus();
      return;
    }

    if (formError) formError.hidden = true;
    const savedRecord = saveVolunteerApplication({
      name: form.elements.namedItem("nome").value,
      email: form.elements.namedItem("email").value,
      area: form.elements.namedItem("area").value,
      availability: form.elements.namedItem("disponibilidade").value,
    });

    form.reset();
    submitted = false;
    fields.forEach((field) => {
      field.removeAttribute("aria-invalid");
      delete field.dataset.touched;
      field.closest(".field")?.classList.remove("is-invalid", "is-valid");
      const message = field.closest(".field")?.querySelector(".field-message");
      if (message) message.textContent = "";
      if (field.type === "email") field.setCustomValidity("");
    });

    if (savedRecord) {
      const applications = getVolunteerApplications();
      updateStoredStatus(storedStatus, applications);
      notify("Cadastro enviado e salvo neste navegador. Obrigado por participar!", "success");
    } else {
      notify("Cadastro concluído, mas não foi possível salvar o registro neste navegador.", "info");
    }
  });
}
