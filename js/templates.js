import educationImage from "../images/projeto-social.svg";
import volunteerImage from "../images/voluntariado.svg";

const projects = [
  {
    id: "educacao",
    badge: "Educação",
    badgeClass: "badge-blue",
    kicker: "Educação e tecnologia",
    title: "Educação para Todos",
    description: "Aulas de reforço, oficinas de leitura e inclusão digital para crianças e adolescentes.",
    image: educationImage,
    imageAlt: "Estudante usando um computador durante uma oficina de inclusão digital",
  },
  {
    id: "inclusao",
    badge: "Inclusão",
    badgeClass: "badge-orange",
    kicker: "Segurança alimentar",
    title: "Comunidade Alimentada",
    description: "Campanhas de arrecadação e apoio a famílias acompanhadas pela comunidade.",
    image: volunteerImage,
    imageAlt: "Voluntários organizando caixas de alimentos para distribuição",
  },
  {
    id: "trabalho-renda",
    badge: "Trabalho e renda",
    badgeClass: "badge-green",
    kicker: "Trabalho e renda",
    title: "Futuro Profissional",
    description: "Oficinas de currículo, capacitação e preparação para novas oportunidades de trabalho.",
    artClass: "project-art-orange",
  },
  {
    id: "meio-ambiente",
    badge: "Meio Ambiente",
    badgeClass: "badge-green",
    kicker: "Cuidado com o território",
    title: "Horta em Comunidade",
    description: "Uma horta coletiva que aproxima vizinhos e incentiva o cuidado com o meio ambiente.",
    artClass: "project-art-green",
  },
];

function projectCard(project, { featured, number }) {
  const visual = project.image
    ? `<img src="${project.image}" alt="${project.imageAlt}" width="560" height="320" loading="lazy" decoding="async">`
    : `<div class="project-art ${project.artClass}" aria-hidden="true"><span>${String(number).padStart(2, "0")}</span></div>`;
  const label = featured ? "Conheça o projeto" : "Apoiar este projeto";
  const destination = featured ? "projetos.html" : "cadastro.html";

  return `
    <article class="project-card" data-project-id="${project.id}">
      ${visual}
      <div class="project-card-content">
        <span class="badge ${project.badgeClass}">${project.badge}</span>
        ${featured ? "" : `<p class="card-kicker">${project.kicker}</p>`}
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a class="text-link" href="${destination}" aria-label="${label}: ${project.title}">${label} <span aria-hidden="true">→</span></a>
      </div>
    </article>`;
}

export function renderProjectCards(container) {
  if (!container) return 0;
  const featured = container.dataset.projectCollection === "featured";
  const featuredIds = new Set(["educacao", "inclusao", "meio-ambiente"]);
  const items = featured ? projects.filter((project) => featuredIds.has(project.id)) : projects;
  container.innerHTML = items.map((project, index) => projectCard(project, { featured, number: index + 1 })).join("");
  return items.length;
}

export { projects };
