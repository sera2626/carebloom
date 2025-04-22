const loggedIn = localStorage.getItem("loggedIn");

if (!loggedIn && window.location.pathname.includes("index.html")) {
  window.location.href = "login.html";
}

if (loggedIn && window.location.pathname.includes("login.html")) {
  window.location.href = "index.html";
}


document.addEventListener("DOMContentLoaded", () => {
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn && window.location.pathname === "/index.html") {
    window.location.href = "login.html"; 
    return;
  }

  const hamburger = document.getElementById("hamburger-menu");
  const menuLinks = document.querySelector(".menu-links");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const logoutLink = document.getElementById("logout-link");
  const startBtn = document.getElementById("start-btn");
  const sections = document.querySelectorAll(".main-section");
  const links = document.querySelectorAll('[data-section]');

  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
  }

  darkModeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkNow = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", darkNow);
    darkModeToggle.textContent = darkNow ? "☀️" : "🌙";
  });

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    const isOpen = menuLinks?.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");
      showSection(target);
      if (menuLinks?.classList.contains("open")) {
        menuLinks.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

  startBtn?.addEventListener("click", () => {
    document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" });
  });

  logoutLink?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userPasswordHash");
    localStorage.removeItem("darkMode");
    window.location.href = "login.html";
  });

  const hash = window.location.hash.replace("#", "");
  const defaultSection = hash || "home";
  showSection(defaultSection);
});