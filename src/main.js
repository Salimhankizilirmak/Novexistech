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
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  new Typed('#typed-text', {
    strings: [
      'LeadNova: Dijital ve Fiziksel Dünyanın Kesişim Noktası.', 
      'Yazılım Çözümleri, Otonom Algoritmalar, Süreç Otomasyonu...'
    ],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 2500,
    loop: true,
    cursorChar: '_',
  });
}

// --- 3. Vanilla Tilt ---
VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.15,
});

// --- 3.5 Mobile Menu Toggle ---
const mobileToggle = document.getElementById('mobile-toggle');
const navLinksDOM = document.getElementById('nav-links');
if (mobileToggle && navLinksDOM) {
  mobileToggle.addEventListener('click', () => {
    navLinksDOM.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    if (navLinksDOM.classList.contains('active')) {
      icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
    }
  });

  // Mobil navigasyonda bir linke tıklayınca menüyü kapat
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksDOM.classList.remove('active');
      mobileToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
  });
}

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

// --- 6. Baron Radar Auto-Fetch (AI Commentary Model) ---
const baronFeed = document.getElementById('baron-live-feed');
const baronWaiting = document.getElementById('baron-waiting-msg');
let baronLoaded = false;

if (baronFeed) {
    const baronObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !baronLoaded) {
                baronLoaded = true;
                
                // Sahte Yorumlu Veriler
                const mockAnalysis = [
                    { 
                        home: "Los Angeles Lakers", away: "Denver Nuggets", 
                        target: "Alt 220.5", odds: "1.85",
                        commentary: "Elde edilen son 5 maç istatistiğine göre Los Angeles Lakers ilk yarıda yüksek skor üretse de, Denver'ın deplasman savunma etkinliği ve Lakers'ın 3. çeyrekteki top kayıpları maçın ritmini düşürüyor. Analitik model maçın 220.5 bareminin altında kalacağını %78 güven aralığı ile öngörmektedir."
                    },
                    { 
                        home: "Real Madrid", away: "Barcelona", 
                        target: "Ev Sahibi Kazanır", odds: "2.10",
                        commentary: "Makine öğrenmesi veritabanımız, Real Madrid'in saha avantajını (xG: 2.1) ve Barcelona'nın defansif rotasyon eksiklerini eşleştirdi. Beklenen senaryoda ev sahibinin 2. yarıda fiziksel üstünlük kurarak kazanma olasılığı %82."
                    },
                    { 
                        home: "Manchester City", away: "Arsenal", 
                        target: "Karşılıklı Gol Var", odds: "1.65",
                        commentary: "Her iki takımın hücum hatları (Haaland & Saka) ligin en yüksek efektif şut yüzdesine sahip. Arsenal'in geçiş hücumları City'nin yüksek savunma hattını kıracak potansiyelde. İki taraftan da skor üretimi (KG VAR) %89 olasılıkla gerçekleşecektir."
                    }
                ];

                setTimeout(() => {
                    if(baronWaiting) baronWaiting.style.display = 'none';

                    let i = 0;
                    const interval = setInterval(() => {
                        if (i < mockAnalysis.length) {
                            const data = mockAnalysis[i];
                            const analysisCard = document.createElement('div');
                            analysisCard.style.cssText = "background: linear-gradient(135deg, rgba(20,22,30,0.9), rgba(10,12,18,0.95)); border: 1px solid rgba(0,243,255,0.15); border-left: 4px solid var(--neon-cyan); padding: 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); animation: slideIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; opacity: 0; transform: translateX(-30px); margin-bottom: 5px;";
                            
                            analysisCard.innerHTML = `
                                <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 15px; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
                                    <div>
                                        <span style="color: var(--neon-cyan); font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase;"><i class="fa-solid fa-bolt"></i> Sinyal Eşleşti</span>
                                        <h4 style="color: #fff; font-size: 1.3rem; margin: 8px 0 0 0; font-family: 'Space Grotesk', sans-serif;">${data.home} <span style="color: var(--text-secondary); font-size: 1rem;">vs</span> ${data.away}</h4>
                                    </div>
                                    <div style="text-align: right; background: rgba(0, 243, 255, 0.05); padding: 10px 20px; border-radius: 8px; border: 1px solid rgba(0, 243, 255, 0.2);">
                                        <div style="color: var(--text-secondary); font-size: 0.8rem; margin-bottom: 3px;">TAHMİN HEDEFİ</div>
                                        <strong style="color: var(--neon-cyan); font-size: 1.2rem;">${data.target} <span style="color: #fff;">(@${data.odds})</span></strong>
                                    </div>
                                </div>
                                <div style="display: flex; gap: 15px; align-items: stretch;">
                                   <div style="min-width: 4px; background: linear-gradient(to bottom, #bc13fe, transparent); border-radius: 2px;"></div>
                                   <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.7; margin: 0; padding-top: 5px;"><strong style="color: #fff;">Derin Öğrenme Tespiti:</strong> ${data.commentary}</p>
                                </div>
                            `;
                            baronFeed.appendChild(analysisCard);
                            baronFeed.scrollTop = baronFeed.scrollHeight;
                            i++;
                        } else {
                            clearInterval(interval);
                            const successMsg = document.createElement('div');
                            successMsg.innerHTML = '<i class="fa-solid fa-check" style="color: #0f0;"></i> Güncel model analizleri tamamlandı. Bir sonraki tarama döngüsü bekleniyor...';
                            successMsg.style.cssText = "text-align: center; color: var(--text-secondary); font-size: 0.85rem; margin-top: 10px;";
                            baronFeed.appendChild(successMsg);
                        }
                    }, 1500); 

                }, 1000); // 1 sn loading göster
            }
        });
    }, { threshold: 0.3 });

    baronObserver.observe(baronFeed);
}

// Hover effects and styles for AI generated items are added above. We add slideIn keyframes dynamically:
const styleInit = document.createElement('style');
styleInit.innerHTML = `@keyframes slideIn { to { opacity: 1; transform: translateX(0); } }`;
document.head.appendChild(styleInit);
