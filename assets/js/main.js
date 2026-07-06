
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
    tags: ["C", "GTK", "Expectimax",  "Game"],
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
    repo: "https://github.com/AntoNainRatio/SlimeSimu",
    page: "projects/slimesimu.html",
  },
  {
    title: "Birdy",
    description:
      "Création d'un Flappy Bird maison afin de créer une IA capable d' " +
      "apprendre à jouer.",
    tags: ["Java", "IA", "Dérivation génétique"],
    image: "assets/img/birdy_default.jpg",
    repo: "https://github.com/AntoNainRatio/birdy",
    page: "projects/birdy.html"
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

    const top = el("div", { class: "project-top" }, [links]);

    const tags = el("div", { class: "project-tags" });
    (p.tags || []).forEach((t) => tags.appendChild(el("span", { text: t })));

    const body = el("div", { class: "project-body" }, [
      top,
      el("h3", { text: p.title }),
      el("p", { text: p.description }),
      tags,
    ]);

    const media = p.image
      ? el("div", { class: "project-media" }, [
          el("img", { src: p.image, alt: p.title, loading: "lazy" }),
        ])
      : null;

    const card = el("article", { class: "project-card reveal" }, [media, body]);

    // Toute la vignette est cliquable si une page de détail existe.
    if (p.page) {
      card.classList.add("is-link");
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", p.title);
      const go = () => { window.location.href = p.page; };
      card.addEventListener("click", go);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
      });
      // Les liens internes (code/démo) ne doivent pas déclencher la navigation.
      links.querySelectorAll("a").forEach((a) =>
        a.addEventListener("click", (e) => e.stopPropagation())
      );
    }

    grid.appendChild(card);
  });
}

// Remplit les tags d'une page de détail à partir du projet correspondant,
// pour éviter de les dupliquer à la main (source unique : PROJECTS).
function renderProjectTags() {
  const box = document.getElementById("project-tags");
  if (!box) return;
  const project = PROJECTS.find((p) => p.title === box.dataset.project);
  if (!project) return;
  (project.tags || []).forEach((t) => box.appendChild(el("span", { text: t })));
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
  renderProjectTags();
  renderContacts();
  setupNavToggle();
  setupReveal();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
