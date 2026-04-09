// src/main.js
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
          grab: { distance: 150, links: { opacity: 0.6 } },
        },
      },
      particles: {
        color: { value: "#00f3ff" },
        links: { color: "#bc13fe", distance: 150, enable: true, opacity: 0.3, width: 1 },
        move: { enable: true, speed: 1.5, direction: "none", random: false, straight: false, outModes: "out" },
        number: { density: { enable: true, width: 800 }, value: 70 },
        opacity: { value: 0.5 },
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
    'Novexistech: Dijital ve Fiziksel Dünyanın Kesişim Noktası.', 
    'VIP Sistemler, Akıllı Yazılımlar, Otonom Algoritmalar...'
  ],
  typeSpeed: 45,
  backSpeed: 25,
  backDelay: 2500,
  loop: true,
  cursorChar: '_',
});

// --- 3. Vanilla Tilt ---
VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.15,
});

// --- 4. Navbar Sticky / Scroll Reveal ---
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Tetiklenecek sayaçlar varsa çalıştır
      if (entry.target.querySelector('.counter') || entry.target.classList.contains('stats-banner')) {
        runCounters();
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

// --- 5. Counters ---
let countersRan = false;
function runCounters() {
  if (countersRan) return;
  countersRan = true;
  const counters = document.querySelectorAll('.counter');
  const speed = 200; 
  
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/\+/g, '');
      const inc = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + '+';
      }
    };
    updateCount();
  });
}

// --- 6. Pricing Flip Toggle (Baron's Lair) ---
const toggleMonthly = document.getElementById('toggle-monthly');
const toggleYearly = document.getElementById('toggle-yearly');
const flipCard = document.getElementById('pricing-flip-card');

if(toggleMonthly && toggleYearly && flipCard) {
    toggleMonthly.addEventListener('click', () => {
        toggleMonthly.classList.add('active');
        toggleYearly.classList.remove('active');
        flipCard.classList.remove('flipped');
    });

    toggleYearly.addEventListener('click', () => {
        toggleYearly.classList.add('active');
        toggleMonthly.classList.remove('active');
        flipCard.classList.add('flipped');
    });
}

// --- 7. Baron Discord Live Fetch Demo ---
const API_URL = '/api/stats'; // Gerçek Proxy URL'si kalsa da şimdilik mock tetikliyoruz.
const baronTriggerBtn = document.getElementById('baron-trigger');
const discordMessages = document.getElementById('discord-messages');

if (baronTriggerBtn) {
    baronTriggerBtn.addEventListener('click', async () => {
        baronTriggerBtn.disabled = true;
        baronTriggerBtn.innerHTML = 'Veri Çekiliyor... <i class="fa-solid fa-spinner fa-spin"></i>';
        discordMessages.innerHTML = ''; 

        // Sahte ama etkileyici simülasyon (Local development ve UI için optimize edildi)
        const mockBets = [
            { home: "Los Angeles Lakers", away: "Denver Nuggets", target: "Alt 220.5", odds: "1.85" },
            { home: "Real Madrid", away: "Barcelona", target: "Ev Sahibi Kazanır", odds: "2.10" },
            { home: "Manchester City", away: "Arsenal", target: "Karşılıklı Gol Var", odds: "1.65" },
            { home: "Miami Heat", away: "Boston Celtics", target: "Üst 215.5", odds: "1.90" }
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < mockBets.length) {
                const bet = mockBets[i];
                const msgDiv = document.createElement('div');
                msgDiv.className = 'msg';
                msgDiv.innerHTML = `
                    <div class="msg-avatar">AI</div>
                    <div class="msg-content">
                        <h5>BARON_BOT <span>| Yeni Analiz Eşleşti</span></h5>
                        <p>⚡ <b>${bet.home} - ${bet.away}</b><br>Hedef: <strong style="color: var(--neon-cyan);">${bet.target}</strong> (@ ${bet.odds})</p>
                    </div>
                `;
                discordMessages.appendChild(msgDiv);
                discordMessages.scrollTop = discordMessages.scrollHeight;
                i++;
            } else {
                clearInterval(interval);
                baronTriggerBtn.disabled = false;
                baronTriggerBtn.innerHTML = 'Farklı Verileri Çek <i class="fa-solid fa-rotate-right"></i>';
            }
        }, 1200);
    });
}
