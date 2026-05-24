window.addEventListener("DOMContentLoaded", () => {
  // Remove a classe preload permitindo animações suaves após o carregamento inicial
  document.body.classList.remove("preload");
});

// --- ENGINE DE GERENCIAMENTO DE TEMA ---
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

const updateThemeIcon = (theme) => {
  themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
};

// Define o ícone inicial baseado no tema atual
const currentTheme =
  document.documentElement.getAttribute("data-theme") || "dark";
updateThemeIcon(currentTheme);

// --- MENU MOBILE ---
const navMenu = document.getElementById("nav-menu");
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = menuToggle.querySelector("i");

const closeMenu = () => {
  navMenu.classList.remove("active");
  menuIcon.className = "fas fa-bars";
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "initial";
};

// Alternador de Tema (Dark / Light)
themeToggle.addEventListener("click", () => {
  const newTheme =
    document.documentElement.getAttribute("data-theme") === "light"
      ? "dark"
      : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
  closeMenu();
});

// Controle de clique do Menu Mobile
menuToggle.addEventListener("click", () => {
  const isExpanded = navMenu.classList.toggle("active");
  menuToggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");

  if (isExpanded) {
    menuIcon.className = "fas fa-times";
    document.body.style.overflow = "hidden";
  } else {
    closeMenu();
  }
});

// Fecha o menu dinamicamente se a tela for redimensionada para Desktop
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      closeMenu();
    }
  }, 150);
});

// --- SCROLL SUAVE PREMIUM ---
let scrollAnimationId = null;

const smoothScrollTo = (targetPosition, duration) => {
  if (scrollAnimationId) cancelAnimationFrame(scrollAnimationId);

  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime = null;

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;

    let timeElapsed = currentTime - startTime;
    if (timeElapsed > duration) timeElapsed = duration;

    const run = easeInOutCubic(timeElapsed / duration);
    window.scrollTo(0, startPosition + distance * run);

    if (timeElapsed < duration) {
      scrollAnimationId = requestAnimationFrame(animation);
    } else {
      scrollAnimationId = null;
    }
  };

  scrollAnimationId = requestAnimationFrame(animation);
};

// Atribui o comportamento de scroll para os links correspondentes
document.querySelectorAll(".nav-links a, .smooth-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();
      closeMenu();

      let targetPosition = 0;

      if (targetId !== "#" && targetId !== "#home") {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          const navbarHeight = 70;
          targetPosition =
            targetSection.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;
        } else {
          return;
        }
      }
      smoothScrollTo(targetPosition, 800);
    }
  });
});

// --- INJEÇÃO DINÂMICA DE DADOS (DATABASE/ARRAYS) ---
const skillsData = [
  {
    name: "Frontend",
    icon: "fa-laptop-code",
    desc: "HTML ,CSS3 ,SCSS/Sass, JavaScript",
  },
  {
    name: "Backend",
    icon: "fa-database",
    desc: "Node.js, Express.js, APIs REST",
  },
  {
    name: "DevOps",
    icon: "fa-terminal",
    desc: "Deploy Web, Versionamento, API Integration",
  },
  {
    name: "TOOLS",
    icon: "fa-solid fa-code",
    desc: "VS Code, Git, GitHub",
  },
];

const projectsData = [
  {
    title: "Portfólio Profissional",
    desc: "Website moderno e responsivo com sistema dark/light mode, animações suaves e design profissional.",
    img: "img/portifolioWhite.png",
    tags: ["HTML", "SCSS","Javascript"],
    repoUrl: "https://github.com/franciscoma500/portifolio-official",
    liveUrl: "https://franciscoma500.github.io/portifolio-official",
  },
  {
    title: "Website de Restaurante",
    desc: "Website moderno para restaurante com menu digital, galeria de nosso espaço, secção de reservas pelo WhatsApp.",
    img: "img/sabor2.png",
    tags: ["HTML", "SCSS","Javascript","API"],
    repoUrl: "https://github.com/franciscoma500/Projecto-web-restaurant" ,
    liveUrl: "https://franciscoma500.github.io/Projecto-web-restaurant",
  },
  {
    title: "Em breve",
    desc: "⚠️ Projeto de e-commerce moderno em desenvolvimento.O estado do código e site está indisponível temporariamente",
    img: "img/Sneaker1.png",
    tags: ["Node.js", "React.js","Express.js"],
    repoUrl: "",
    liveUrl: "",
  },
];

// Inserindo as Skills no DOM
document.getElementById("skills-container").innerHTML = skillsData
  .map(
    (s, i) => `
      <div class="skill-card reveal" style="transition-delay: 0.1s">
          <i class="fas ${s.icon}" aria-hidden="true"></i>
          <h3>${s.name}</h3>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem">${
            s.desc
          }</p>
      </div>
    `
     
  )
  .join("");

// Inserir Projetos no DOM com blindagem de layout
document.getElementById("projects-container").innerHTML = projectsData
  .map(
    (p, i) => `
      <div class="project-card reveal" style="transition-delay: ${i * 0.35}s; display: flex; flex-direction: column; height: 100%;">
          <div class="project-img" style="flex-shrink: 0;">
              <img src="${p.img}" alt="Captura de ecrã do projeto ${p.title}" style="width: 100%; height: 220px; object-fit: cover;">
          </div>
          <div class="project-info" style="padding: 1.8rem; display: flex; flex-direction: column; flex-grow: 1;">
              <h3 style="margin-bottom: 0.5rem;">${p.title}</h3>
              
              <p style="color: var(--text-muted); font-size: 0.9rem; margin: 0 0 auto 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; min-height: 4.3rem; line-height: 1.55;">
                  ${p.desc}
              </p>
              
              <div class="project-tags" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.5rem; margin-bottom: 1rem;">
                  ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
              </div>
              
              <hr class="project-divider" aria-hidden="true" style="border: 0; height: 1px; background: var(--border); margin: 0 0 1rem 0; width: 100%;">
              
              <div class="project-links" style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: auto;">
                  <a href="${p.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link" style="display: flex; align-items: center; gap: 0.5rem;">
                      <i class="fab fa-github" aria-hidden="true"></i> código
                  </a>
                  <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-link" style="display: flex; align-items: center; gap: 0.5rem;">
                      <i class="fas fa-external-link-alt" aria-hidden="true"></i> Abrir site
                  </a>
              </div>
          </div>
      </div>
  `
  )
  .join("");

// --- INTERSECTION OBSERVER (Gatilho de animação Scroll-Reveal) ---
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);
setTimeout(() => {
  document
    .querySelectorAll(".reveal, .reveal-left, .reveal-right")
    .forEach((el) => observer.observe(el));
}, 50);

document
  .querySelectorAll(".reveal, .reveal-left, .reveal-right")
  .forEach((el) => observer.observe(el));

// Efeito Sombra do Menu fixado (Navbar Box Shadow no Scroll)
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 50);
});
