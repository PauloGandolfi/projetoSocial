import { initForm } from "./form.js";
import { initModal } from "./modal.js";
import { initNavigation } from "./navigation.js";
import { renderProjectCards } from "./templates.js";
import { initToast } from "./toast.js";

const notify = initToast(document);

function initializePage(main) {
  renderProjectCards(main.querySelector("[data-project-collection]"));
  initForm(main, notify);
}

initModal(document);
initNavigation({ onRouteChange: initializePage, notify });
initializePage(document.querySelector("#conteudo-principal"));
