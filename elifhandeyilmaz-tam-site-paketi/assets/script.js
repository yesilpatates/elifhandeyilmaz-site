const projectCoverStylesheet = document.createElement("link");
projectCoverStylesheet.rel = "stylesheet";
projectCoverStylesheet.href = "assets/project-covers.css";
projectCoverStylesheet.id = "project-cover-styles";

if (!document.getElementById(projectCoverStylesheet.id)) {
  document.head.appendChild(projectCoverStylesheet);
}

const projectCoverScript = document.createElement("script");
projectCoverScript.src = "assets/project-covers.js";
projectCoverScript.defer = true;
projectCoverScript.id = "project-cover-script";

if (!document.getElementById(projectCoverScript.id)) {
  document.body.appendChild(projectCoverScript);
}

const heroTitleFont = document.createElement("link");
heroTitleFont.rel = "stylesheet";
heroTitleFont.href = "https://fonts.googleapis.com/css2?family=Rochester&display=swap";
heroTitleFont.id = "hero-title-font";

if (!document.getElementById(heroTitleFont.id)) {
  document.head.appendChild(heroTitleFont);
}

const heroTitleStylesheet = document.createElement("link");
heroTitleStylesheet.rel = "stylesheet";
heroTitleStylesheet.href = "assets/hero-title.css";
heroTitleStylesheet.id = "hero-title-styles";

if (!document.getElementById(heroTitleStylesheet.id)) {
  document.head.appendChild(heroTitleStylesheet);
}

const serviceIconsStylesheet = document.createElement("link");
serviceIconsStylesheet.rel = "stylesheet";
serviceIconsStylesheet.href = "assets/service-icons.css";
serviceIconsStylesheet.id = "service-icons-styles";

if (!document.getElementById(serviceIconsStylesheet.id)) {
  document.head.appendChild(serviceIconsStylesheet);
}

const originalHeroTitle = document.querySelector(".hero-copy h1");

if (originalHeroTitle && !originalHeroTitle.classList.contains("hero-title")) {
  originalHeroTitle.className = "hero-title";
  originalHeroTitle.innerHTML = `
    <span class="hero-title-line">Fikirleri güçlü ve tutarlı</span>
    <span class="hero-title-script-reveal">
      <span class="hero-title-script">görsel deneyimlere</span>
    </span>
    <span class="hero-title-line">dönüştürüyorum.</span>
  `;
}

const serviceIconEntries = [
  {
    title: "Marka ve<br>Kurumsal Kimlik",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5 16.7 8v4.4c0 3.5-2 6.4-4.7 8.1-2.7-1.7-4.7-4.6-4.7-8.1V8L12 3.5Z"></path><path d="M12 7.4v7.1"></path><path d="M9.9 10.6h4.2"></path><circle class="fill-accent" cx="7" cy="8" r="1.1"></circle><circle class="fill-accent" cx="17" cy="8" r="1.1"></circle></svg>'
  },
  {
    title: "Editoryal<br>Tasarım",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 6.5h5.8a2.1 2.1 0 0 1 1.7.8 2.1 2.1 0 0 1 1.7-.8h5.8v10.8h-5.8a2.1 2.1 0 0 0-1.7.8 2.1 2.1 0 0 0-1.7-.8H4.5Z"></path><path d="M12 7.3v10"></path><path d="M7.3 9.8h2.2"></path><path d="M7.3 12.2h2.2"></path><path d="M14.5 9.8h2.2"></path><path d="M14.5 12.2h2.2"></path></svg>'
  },
  {
    title: "Web ve<br>Arayüz",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5" width="17" height="13" rx="2"></rect><path d="M3.5 8.5h17"></path><circle class="fill-accent" cx="6.4" cy="6.8" r="0.7"></circle><circle class="fill-accent" cx="8.5" cy="6.8" r="0.7"></circle><circle class="fill-accent" cx="10.6" cy="6.8" r="0.7"></circle><path d="M7.2 12.2h4.2"></path><path d="M7.2 14.8h2.7"></path><rect x="13.2" y="11.2" width="4.2" height="4.2" rx="0.8"></rect></svg>'
  },
  {
    title: "Sosyal Medya<br>Tasarımı",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="4.5" width="14" height="14" rx="3"></rect><circle cx="12" cy="11.5" r="3.1"></circle><circle class="fill-accent" cx="16.3" cy="7.4" r="0.8"></circle><path d="M7.4 18.5 6.4 20l2.2-.2"></path></svg>'
  },
  {
    title: "Video &<br>Animasyon",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6.5" width="17" height="11" rx="2"></rect><path d="m10 10 4 2.1-4 2.1Z"></path><path d="M6.3 6.5v11"></path><path d="M17.7 6.5v11"></path><path d="M6.3 9h1.5"></path><path d="M6.3 12h1.5"></path><path d="M6.3 15h1.5"></path><path d="M16.2 9h1.5"></path><path d="M16.2 12h1.5"></path><path d="M16.2 15h1.5"></path></svg>'
  },
  {
    title: "Etkinlik ve<br>Organizasyon",
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="10" y="4" width="4" height="4" rx="1"></rect><rect x="4" y="15" width="4" height="4" rx="1"></rect><rect x="10" y="15" width="4" height="4" rx="1"></rect><rect x="16" y="15" width="4" height="4" rx="1"></rect><path d="M12 8v3.2"></path><path d="M6 15v-1.8h12V15"></path></svg>'
  }
];

const serviceGrid = document.querySelector(".service-mini-grid");

if (serviceGrid && serviceGrid.dataset.enhanced !== "true") {
  serviceGrid.dataset.enhanced = "true";
  serviceGrid.innerHTML = serviceIconEntries
    .map(
      (item) => `
        <div class="service-mini-card">
          <span class="service-mini-icon" aria-hidden="true">${item.svg}</span>
          <span class="service-mini-title">${item.title}</span>
        </div>
      `
    )
    .join("");
}

const optimizationStylesheet = document.createElement("link");
optimizationStylesheet.rel = "stylesheet";
optimizationStylesheet.href = "assets/optimizations.css";
optimizationStylesheet.id = "site-optimizations";

if (!document.getElementById(optimizationStylesheet.id)) {
  document.head.appendChild(optimizationStylesheet);
}

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const header = document.querySelector(".site-header");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.classList.toggle("open");
  mainNav.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Menüyü kapat" : "Menüyü aç");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.classList.remove("open");
    mainNav?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Menüyü aç");
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 10);

  const scrollPosition = window.scrollY + 150;
  let currentSection = "anasayfa";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

document.getElementById("year").textContent = new Date().getFullYear();

/* Cursor Magic Effect: START */
(() => {
  const glow = document.querySelector(".cursor-glow");
  const sparkLayer = document.querySelector(".cursor-spark-layer");

  const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
  const supportsHover = window.matchMedia("(hover: hover)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!glow || !sparkLayer || !supportsFinePointer || !supportsHover || reducedMotion) {
    return;
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let lastSparkX = targetX;
  let lastSparkY = targetY;
  let lastSparkTime = 0;
  let activeSparks = 0;
  let moveCount = 0;

  const maxSparks = 48;
  const sparkDistance = 10;
  const sparkInterval = 26;

  const animateGlow = () => {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;

    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;

    requestAnimationFrame(animateGlow);
  };

  const createSpark = (x, y, forceStar = false) => {
    if (activeSparks >= maxSparks) {
      return;
    }

    const spark = document.createElement("span");
    const isStar = forceStar || Math.random() > 0.48;
    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 46;
    const size = isStar ? 6 + Math.random() * 7 : 2.5 + Math.random() * 3.5;
    const duration = 520 + Math.random() * 380;
    const offsetX = (Math.random() - 0.5) * 12;
    const offsetY = (Math.random() - 0.5) * 12;

    spark.className = `cursor-spark ${isStar ? "is-star" : "is-dot"}`;
    spark.style.left = `${x + offsetX}px`;
    spark.style.top = `${y + offsetY}px`;
    spark.style.setProperty("--spark-size", `${size}px`);
    spark.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--spark-y", `${Math.sin(angle) * distance - 14}px`);
    spark.style.setProperty("--spark-scale", `${0.05 + Math.random() * 0.22}`);
    spark.style.setProperty("--spark-rotation", `${100 + Math.random() * 260}deg`);
    spark.style.setProperty("--spark-duration", `${duration}ms`);

    activeSparks += 1;
    sparkLayer.appendChild(spark);

    spark.addEventListener(
      "animationend",
      () => {
        spark.remove();
        activeSparks = Math.max(0, activeSparks - 1);
      },
      { once: true }
    );
  };

  const emitTrail = (x, y) => {
    moveCount += 1;
    createSpark(x, y, moveCount % 3 === 0);

    if (moveCount % 4 === 0) {
      createSpark(x, y, true);
    }
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      glow.classList.add("is-visible");

      const now = performance.now();
      const deltaX = event.clientX - lastSparkX;
      const deltaY = event.clientY - lastSparkY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance >= sparkDistance && now - lastSparkTime >= sparkInterval) {
        emitTrail(event.clientX, event.clientY);
        lastSparkX = event.clientX;
        lastSparkY = event.clientY;
        lastSparkTime = now;
      }
    },
    { passive: true }
  );

  window.addEventListener("pointerdown", (event) => {
    for (let i = 0; i < 7; i += 1) {
      createSpark(event.clientX, event.clientY, i % 2 === 0);
    }
  });

  window.addEventListener("pointerleave", () => {
    glow.classList.remove("is-visible");
  });

  window.addEventListener("blur", () => {
    glow.classList.remove("is-visible");
  });

  animateGlow();
})();
/* Cursor Magic Effect: END */
