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
