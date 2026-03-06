"use strict";

// Startup loader transition.
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.classList.add("hidden");
  setTimeout(() => loader.remove(), 500);
});

// Mobile navigation toggle.
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => siteNav.classList.remove("open"));
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// Background particle field.
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 900 } },
      color: { value: ["#5aa8ff", "#8f3dff", "#46ffe0"] },
      shape: { type: "circle" },
      opacity: { value: 0.28 },
      size: { value: 2.2, random: true },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#5aa8ff",
        opacity: 0.15,
        width: 1
      },
      move: { enable: true, speed: 1.4, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: false, mode: "push" },
        resize: true
      },
      modes: { grab: { distance: 120, line_linked: { opacity: 0.3 } } }
    },
    retina_detect: true
  });
}

// GSAP section reveals and interactive project tilt.
if (typeof gsap !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".site-header", {
    y: -45,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
  });

  gsap.from(".hero-content > *", {
    opacity: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.12,
    ease: "power2.out",
    delay: 0.2
  });

  gsap.from(".hero-card", {
    opacity: 0,
    x: 25,
    duration: 0.9,
    ease: "power2.out",
    delay: 0.4
  });

  gsap.utils.toArray(".panel, .project-card").forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 86%"
      },
      opacity: 0,
      y: 24,
      duration: 0.7,
      ease: "power2.out"
    });
  });

  gsap.utils.toArray(".skill").forEach((skill) => {
    const fill = skill.querySelector(".skill-bar span");
    const level = Number(skill.dataset.level || 0);

    gsap.to(fill, {
      width: `${level}%`,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: skill,
        start: "top 90%"
      }
    });
  });

  const projectCards = gsap.utils.toArray(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotY = (x / rect.width - 0.5) * 8;
      const rotX = (y / rect.height - 0.5) * -8;

      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 700,
        transformOrigin: "center",
        duration: 0.25,
        ease: "power1.out"
      });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });
}

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const recipientEmail = "abubakkarsakib360@gmail.com";
if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please complete all required fields.";
      return;
    }

    if (recipientEmail.includes("your-email")) {
      formStatus.textContent = "Set your real email in script.js before using the contact form.";
      return;
    }

    const mailSubject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const mailBody = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
    formStatus.textContent = "Opening your email app...";
    contactForm.reset();
  });
}
