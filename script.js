// ALTERE ESTE NÚMERO PARA O SEU WHATSAPP
const WHATSAPP_NUMBER = "5599999999999";

// ALTERE AQUI SEUS LINKS PRINCIPAIS
const INSTAGRAM_URL = "https://instagram.com/seuinstagram";
const EMAIL_ADDRESS = "contato@seudominio.com";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

document.querySelectorAll(".faq details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq details").forEach((other) => {
      if (other !== detail) other.removeAttribute("open");
    });
  });
});

const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
whatsappLinks.forEach((link) => {
  link.setAttribute("href", `https://wa.me/${WHATSAPP_NUMBER}`);
});

const instagramLink = document.querySelector('.footer a[href*="instagram.com"]');
if (instagramLink) instagramLink.setAttribute("href", INSTAGRAM_URL);

const emailLink = document.querySelector('.footer a[href^="mailto:"]');
if (emailLink) emailLink.setAttribute("href", `mailto:${EMAIL_ADDRESS}`);

const form = document.querySelector("#contact-form");
const statusMessage = document.querySelector("#form-status");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const message = [
    "Olá! Quero solicitar uma análise da presença da minha empresa no Google.",
    "",
    `Nome: ${data.get("nome")}`,
    `Empresa: ${data.get("empresa")}`,
    `WhatsApp: ${data.get("whatsapp")}`,
    `Cidade: ${data.get("cidade")}`,
    `Situação do Perfil da Empresa no Google: ${data.get("perfil")}`,
    "",
    `Sobre a empresa: ${data.get("mensagem")}`
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  statusMessage.textContent = "Mensagem pronta. Abrindo o WhatsApp...";
  window.open(url, "_blank", "noopener");
});
