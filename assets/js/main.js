
const INTERESTS = [
    "Cybersécurité", "Audit/Pentest", "CTF", "DevSecOps", "Algorithmie",
    "Développement"
];

const PROJECTS = [
  {
    title: "My2048",
    description:
      "My2048 est une copie de 2048, l'objectif était de refaire le jeu afin" +
      " d'ensuite créer un bot performant dessus.",
    tags: ["C", "GTK", "Expectimax"],
    image: "assets/img/my2048_default.jpg",
    repo: "https://github.com/AntoNainRatio/My2048",
    page: "projects/my2048.html",
  },
  {
    title: "SlimeSimu",
    description:
      "Simulation de Slime / Fourmis essayant de copier leurs comportements. " +
      "Résultat graphique 100% éditable.",
    tags: ["C", "GTK", "Simulation", "Art"],
    image: "assets/img/SlimeSimu_default.jpg",
    repo: "https://github.com/AntoNainRatio/SlimeSimu"
  },
  {
    title: "Birdy",
    description:
      "Création d'un Flappy Bird maison afin de créer une IA capable de " +
      "vous battre.",
    tags: ["Java", "IA", "Dérivation génétique"],
    image: "assets/img/birdy_default.jpg",
    repo: "https://github.com/AntoNainRatio/birdy"
  }
];

const CONTACTS = [
  { label: "GitHub", url: "https://github.com/AntoNainRatio" },
  { label: "Email", url: "mailto:antonin.lhuillery@gmail.com" },
];


function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const child of [].concat(children)) {
    if (child) node.appendChild(child);
  }
  return node;
}

function renderInterests() {
  const list = document.getElementById("interests");
  if (!list) return;
  INTERESTS.forEach((s) => list.appendChild(el("li", { text: s })));
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  PROJECTS.forEach((p) => {
    const links = el("div", { class: "project-links" });
    if (p.repo) links.appendChild(el("a", { href: p.repo, target: "_blank", rel: "noopener", text: "code ↗" }));
    if (p.demo) links.appendChild(el("a", { href: p.demo, target: "_blank", rel: "noopener", text: "démo ↗" }));
    if (p.page) links.appendChild(el("a", { href: p.page, text: "détails →" }));

    const top = el("div", { class: "project-top" }, [
      p.image ? null : el("span", { class: "project-icon", text: p.icon || "" }),
      links,
    ]);

    const tags = el("div", { class: "project-tags" });
    (p.tags || []).forEach((t) => tags.appendChild(el("span", { text: t })));

    // Le titre renvoie vers la page de détail si elle existe
    const title = p.page
      ? el("h3", {}, [el("a", { href: p.page, text: p.title })])
      : el("h3", { text: p.title });

    const body = el("div", { class: "project-body" }, [
      top,
      title,
      el("p", { text: p.description }),
      tags,
    ]);

    // L'image renvoie vers la page de détail si elle existe
    const media = p.image
      ? el(p.page ? "a" : "div", {
          class: "project-media",
          ...(p.page ? { href: p.page } : {}),
        }, [el("img", { src: p.image, alt: p.title, loading: "lazy" })])
      : null;

    const card = el("article", { class: "project-card reveal" }, [media, body]);

    grid.appendChild(card);
  });
}

function renderContacts() {
  const wrap = document.getElementById("contact-links");
  if (!wrap) return;
  CONTACTS.forEach((c) => {
    const isMail = c.url.startsWith("mailto:");
    wrap.appendChild(
      el("a", {
        href: c.url,
        ...(isMail ? {} : { target: "_blank", rel: "noopener" }),
        text: c.label,
      })
    );
  });
}

function setupNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((i) => i.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((i) => obs.observe(i));
}

document.addEventListener("DOMContentLoaded", () => {
  renderInterests();
  renderProjects();
  renderContacts();
  setupNavToggle();
  setupReveal();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
