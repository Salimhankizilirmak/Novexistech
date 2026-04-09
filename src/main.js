import './style.css';
import Typed from 'typed.js';
import VanillaTilt from 'vanilla-tilt';
import { tsParticles } from "@tsparticles/engine";
import { loadBasic } from "@tsparticles/basic";

// --- 1. tsParticles Initialization ---
async function initParticles() {
  await loadBasic(tsParticles);
  await tsParticles.load({
    id: "tsparticles",
    options: {
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.5 } },
        },
      },
      particles: {
        color: { value: "#00f3ff" },
        links: { color: "#bc13fe", distance: 150, enable: true, opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1, direction: "none", random: false, straight: false, outModes: "out" },
        number: { density: { enable: true, width: 800 }, value: 60 },
        opacity: { value: 0.3 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    },
  });
}
initParticles();

// --- 2. Typed.js Initialization ---
new Typed('#typed-text', {
  strings: [
    'GameLover: Sıcak ve Samimi Oyuncu Topluluğu.', 
    'Novexistech: İşinizi Dijitale Taşıyan Yazılımlar.', 
    'BARON AI: Algoritmik Tahmin Gücü.'
  ],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  cursorChar: '|',
});

// --- 3. Vanilla Tilt Initialization ---
VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
  max: 10,
  speed: 400,
  glare: true,
  "max-glare": 0.1,
});

// --- 4. Navbar Scroll Effect ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- 5. Scroll Animations ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(50px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
  observer.observe(el);
});

// --- 6. BARON AI Logic & Fake API Fetch ---
// Matematiksel Mantık: 49.8 baz oran + %20 ekleme
const baseAccuracy = 49.8;
const displayedAccuracy = (baseAccuracy + 20).toFixed(1); 
document.getElementById('ai-accuracy').innerText = `%${displayedAccuracy}`;

// Sahte maç verileri (Betbot mantığına uygun 4 maç)
const mockBets = [
  "⚽ <b>Galatasaray - Fenerbahçe</b> | Tahmin: KG VAR (Güven: %84)",
  "🏀 <b>Lakers - Warriors</b> | Tahmin: Üst 225.5 (Güven: %79)",
  "⚽ <b>Real Madrid - Barcelona</b> | Tahmin: MS 1 (Güven: %88)",
  "🎾 <b>Alcaraz - Djokovic</b> | Tahmin: Maç Sonucu 2 (Güven: %72)"
];

const triggerBtn = document.getElementById('trigger-analysis-btn');
const discordMessages = document.getElementById('discord-messages');

triggerBtn.addEventListener('click', () => {
  triggerBtn.disabled = true;
  triggerBtn.innerHTML = 'Veriler Çekiliyor... <i class="fa-solid fa-spinner fa-spin"></i>';
  discordMessages.innerHTML = ''; // Paneli temizle
  
  let i = 0;
  const interval = setInterval(() => {
    if (i < mockBets.length) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'msg';
      msgDiv.innerHTML = `
        <div class="msg-avatar" style="background: var(--neon-purple);">AI</div>
        <div class="msg-content">
          <h5>BARON Bot <span>| Betbot AI API'den alındı</span></h5>
          <p>${mockBets[i]}</p>
        </div>
      `;
      discordMessages.appendChild(msgDiv);
      discordMessages.scrollTop = discordMessages.scrollHeight; // Otomatik aşağı kaydır
      i++;
    } else {
      clearInterval(interval);
      triggerBtn.disabled = false;
      triggerBtn.innerHTML = 'Son 4 Analizi Tekrar Çek <i class="fa-solid fa-rotate-right"></i>';
    }
  }, 800); // Her maçı 0.8 saniyede bir ekrana bas
});

// --- 7. Baron Terminal Typewriter effect ---
new Typed('#terminal-text', {
  strings: ['> BetbotAI API Bağlantısı Kuruldu.', '> Veriler Senkronize Ediliyor...', '> Sistem Analize Hazır.'],
  typeSpeed: 40,
  backSpeed: 20,
  startDelay: 500,
  showCursor: true,
});
