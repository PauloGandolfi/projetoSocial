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
  const cpf = document.querySelector("#cpf");
  const phone = document.querySelector("#telefone");
  const cep = document.querySelector("#cep");
  const form = document.querySelector("#volunteer-form");
  const message = document.querySelector("#form-message");

  cpf?.addEventListener("input", (event) => { event.target.value = maskCpf(event.target.value); });
  phone?.addEventListener("input", (event) => { event.target.value = maskPhone(event.target.value); });
  cep?.addEventListener("input", (event) => { event.target.value = maskCep(event.target.value); });

  form?.addEventListener("submit", (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    event.preventDefault();
    message.textContent = "Cadastro enviado com sucesso! Entraremos em contato em breve.";
    form.reset();
  });
});
