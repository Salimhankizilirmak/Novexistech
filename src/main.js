import './style.css';
import Typed from 'typed.js';
import gsap from 'gsap';
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
  strings: ['Fiziksel Dünyada Premium Donanımlar.', 'Dijital Dünyada Kusursuz Kodlar.', '>_ Sistem_Aktif.. Hazır.'],
  typeSpeed: 50,
  backSpeed: 30,
  backDelay: 2000,
  loop: true,
  cursorChar: '|',
});

// --- 3. Vanilla Tilt Initialization ---
VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});

// --- 4. Navbar Scroll Effect (Sticky Glass) ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- 5. GSAP Scroll Animations & Parallax ---
// Using pure IntersectionObserver for simplicity and performance if GSAP ScrollTrigger isn't explicitly imported
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      
      // Counter animation
      if (entry.target.classList.contains('stats-container')) {
        runCounters();
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(50px)';
  el.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
  observer.observe(el);
});

// --- 6. Counter Animation ---
let countersRan = false;
function runCounters() {
  if (countersRan) return;
  countersRan = true;
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // lower is slower
  
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/\+/g, '');
      const inc = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 15);
      } else {
        counter.innerText = target + '+';
      }
    };
    updateCount();
  });
}

// --- 7. BARON Bot Interactions (Discord Mock) ---
const triggerBtn = document.getElementById('trigger-analysis-btn');
const discordMessages = document.getElementById('discord-messages');

const botMessages = [
  "**BARON** > Hedef takım analizi başlatıldı...",
  "**BARON** > Son 10 maç istatistikleri çekiliyor...",
  "**BARON** > 📊 Algoritma Sonucu: Ev sahibi kazanma oranı %78. Value Bet bulundu.",
  "🟢 Beklenen Oran: 1.85 | Güven Skoru: 9/10"
];

triggerBtn.addEventListener('click', () => {
  triggerBtn.disabled = true;
  triggerBtn.innerHTML = 'Analiz Ediliyor... <i class="fa-solid fa-spinner fa-spin"></i>';
  discordMessages.innerHTML = '';
  
  let i = 0;
  const interval = setInterval(() => {
    if (i < botMessages.length) {
      const msgDiv = document.createElement('div');
      msgDiv.className = 'msg';
      msgDiv.innerHTML = `
        <div class="msg-avatar">B</div>
        <div class="msg-content">
          <h5>BARON <span>Bot | Bugun ${new Date().toLocaleTimeString('tr-TR', {hour: '2-digit', minute:'2-digit'})}</span></h5>
          <p>${botMessages[i]}</p>
        </div>
      `;
      discordMessages.appendChild(msgDiv);
      discordMessages.scrollTop = discordMessages.scrollHeight;
      i++;
    } else {
      clearInterval(interval);
      triggerBtn.disabled = false;
      triggerBtn.innerHTML = 'Analizi Başlat <i class="fa-solid fa-play"></i>';
    }
  }, 1200);
});

// --- 8. Baron Pricing Toggle Flip ---
const pricingToggle = document.getElementById('pricing-toggle-btn');
const priceDisplay = document.getElementById('baron-price');

pricingToggle.addEventListener('change', (e) => {
  priceDisplay.classList.add('flip');
  setTimeout(() => {
    if (e.target.checked) {
      priceDisplay.innerHTML = '₺9590<span style="font-size: 1rem; color: var(--text-secondary);">/yıl</span>';
    } else {
      priceDisplay.innerHTML = '₺999<span style="font-size: 1rem; color: var(--text-secondary);">/ay</span>';
    }
    priceDisplay.classList.remove('flip');
  }, 250);
});

// --- 9. Baron Terminal Typewriter effect ---
new Typed('#terminal-text', {
  strings: ['> Sisteme Giriş Yapıldı.', '> Modüller Yükleniyor...', '> Bot_Aktif.. Beklemede.'],
  typeSpeed: 40,
  backSpeed: 20,
  startDelay: 1000,
  showCursor: true,
});
