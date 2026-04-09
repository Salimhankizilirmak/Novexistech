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


// ==========================================
// --- 6. BARON AI: CANLI API ENTEGRASYONU --
// ==========================================

const triggerBtn = document.getElementById('trigger-analysis-btn');
const discordMessages = document.getElementById('discord-messages');

// A. İstatistikleri Canlı Çekme Fonksiyonu
async function fetchBotStats() {
  try {
    const res = await fetch('https://betbotai.onrender.com/api/stats'); 
    if(res.ok) {
      const data = await res.json();
      
      // İstediğin matematik: Çekilen accuracy oranına +20 ekliyoruz
      const baseAccuracy = parseFloat(data.accuracy || 49.8);
      const displayedAccuracy = (baseAccuracy + 20).toFixed(1);
      
      document.getElementById('tracked-matches').innerText = data.trackedMatches || "0";
      document.getElementById('ai-accuracy').innerText = `%${displayedAccuracy}`;
    }
  } catch (e) {
    console.log("Canlı istatistikler çekilemedi, varsayılan (49.8 + 20) uygulanıyor.");
    const defaultAccuracy = 49.8 + 20;
    document.getElementById('ai-accuracy').innerText = `%${defaultAccuracy.toFixed(1)}`;
  }
}

// Sayfa açıldığında istatistikleri getir
fetchBotStats();

// B. Canlı Maçları Çekme Butonu
triggerBtn.addEventListener('click', async () => {
  triggerBtn.disabled = true;
  triggerBtn.innerHTML = 'Canlı Sistem Bağlanıyor... <i class="fa-solid fa-spinner fa-spin"></i>';
  discordMessages.innerHTML = ''; 
  
  try {
    const response = await fetch('https://betbotai.onrender.com/api/bets'); 
    
    if (!response.ok) throw new Error("Sunucu Yanıt Vermedi");
    
    const data = await response.json(); 
    
    // Gelen JSON datasından sadece ilk 4 maçı alalım
    const liveBets = Array.isArray(data) ? data.slice(0, 4) : [];

    if (liveBets.length === 0) {
        discordMessages.innerHTML = `<p style="padding: 15px; color: var(--text-secondary);">Şu an aktif analiz bulunamadı.</p>`;
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = 'Tekrar Dene <i class="fa-solid fa-rotate-right"></i>';
        return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < liveBets.length) {
        const bet = liveBets[i];
        
        const matchTitle = bet.match || bet.title || "Bilinmeyen Karşılaşma";
        const predictionText = bet.target || bet.prediction || "Sistem Analizi Bekleniyor";
        const odds = bet.odds || bet.oran || "?";

        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg';
        msgDiv.innerHTML = `
          <div class="msg-avatar" style="background: var(--neon-purple);">AI</div>
          <div class="msg-content">
            <h5>BARON Bot <span>| Betbot AI API'den Canlı Çekildi</span></h5>
            <p>⚡ <b>${matchTitle}</b> | Hedef: ${predictionText} (@ ${odds})</p>
          </div>
        `;
        discordMessages.appendChild(msgDiv);
        discordMessages.scrollTop = discordMessages.scrollHeight;
        i++;
      } else {
        clearInterval(interval);
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = 'Son 4 Analizi Tekrar Çek <i class="fa-solid fa-rotate-right"></i>';
      }
    }, 800);

  } catch (error) {
    console.error("Bot canlı veri çekme hatası:", error);
    discordMessages.innerHTML = `
      <div style="background: rgba(255,0,0,0.1); border-left: 3px solid var(--neon-red); padding: 15px; margin-top: 10px; border-radius: 4px;">
        <span style="color: var(--neon-red); font-weight: bold;">HATA:</span> betbotai.onrender.com sunucusuna ulaşılamadı. API yanıt vermiyor olabilir.
      </div>
    `;
    triggerBtn.disabled = false;
    triggerBtn.innerHTML = 'Tekrar Dene <i class="fa-solid fa-rotate-right"></i>';
  }
});

// --- 7. Baron Terminal Typewriter effect ---
new Typed('#terminal-text', {
  strings: ['> Canlı Sunucu Bekleniyor...', '> Veriler Senkronize Ediliyor...', '> Sistem Analize Hazır.'],
  typeSpeed: 40,
  backSpeed: 20,
  startDelay: 500,
  showCursor: true,
});
