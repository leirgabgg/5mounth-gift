import { Timer } from './components/Timer';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { TimeCapsule } from './components/TimeCapsule';
import { Quiz } from './components/Quiz';
import { Particles } from './components/Particles';

// Configuração inicial - ALTERE PARA SUA DATA DE NAMORO
const START_DATE = new Date(2025, 9, 27, 3, 30, 0);

// Variáveis globais
let timeCapsule: TimeCapsule | null = null;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa componentes
    const particles = new Particles('particles-canvas');
    const timer = new Timer(START_DATE);
    const timeline = new Timeline('timelineContainer');
    const gallery = new Gallery('galleryGrid', 'modal');
    timeCapsule = new TimeCapsule('capsuleContainer', 'modal');
    const quiz = new Quiz('quizContainer');

    // Inicia o contador
    timer.start();

    // Renderiza componentes
    timeline.render();
    gallery.render();
    timeCapsule.render();
    quiz.render();

    // Configurações
    setupNavigation();
    setupTheme();
    setupAddCapsule();
    updateMemoriesCount();
    checkAnniversary(START_DATE);
    
    // Ajustes responsivos
    setupResponsiveNavbar();
    setupSwipeGestures();
    
    // Verificar orientação da tela
    window.addEventListener('resize', () => {
        handleOrientationChange();
    });
    
    window.timeCapsule = timeCapsule;
});

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const sectionId = link.getAttribute('data-section');
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                    // Scroll suave para o topo
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    });
}

function setupTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setupAddCapsule() {
    const addBtn = document.getElementById('addCapsuleBtn');
    const modal = document.getElementById('modal');
    
    addBtn?.addEventListener('click', () => {
        const modalBody = modal?.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <h2 style="font-size: clamp(1.2rem, 5vw, 1.5rem); margin-bottom: 1rem;">📦 Nova Cápsula do Tempo</h2>
                <form id="capsuleForm" style="margin-top: 1rem;">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: clamp(0.85rem, 3vw, 0.95rem);">Título:</label>
                        <input type="text" id="capsuleTitle" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--card-bg); color: var(--text-primary); font-size: clamp(0.85rem, 3vw, 0.95rem);">
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: clamp(0.85rem, 3vw, 0.95rem);">Mensagem:</label>
                        <textarea id="capsuleMessage" rows="4" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--card-bg); color: var(--text-primary); font-size: clamp(0.85rem, 3vw, 0.95rem); resize: vertical;"></textarea>
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-size: clamp(0.85rem, 3vw, 0.95rem);">Data para abrir:</label>
                        <input type="date" id="capsuleDate" required style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--card-border); background: var(--card-bg); color: var(--text-primary); font-size: clamp(0.85rem, 3vw, 0.95rem);">
                    </div>
                    <button type="submit" style="width: 100%; padding: 0.75rem; background: var(--gradient-1); border: none; border-radius: 8px; color: white; cursor: pointer; font-weight: bold; font-size: clamp(0.9rem, 3vw, 1rem);">
                        Criar Cápsula
                    </button>
                </form>
            `;
            
            const form = document.getElementById('capsuleForm');
            form?.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const title = (document.getElementById('capsuleTitle') as HTMLInputElement).value;
                const message = (document.getElementById('capsuleMessage') as HTMLTextAreaElement).value;
                const dateStr = (document.getElementById('capsuleDate') as HTMLInputElement).value;
                
                if (title && message && dateStr && timeCapsule) {
                    timeCapsule.addCapsule({
                        title,
                        message,
                        unlockDate: new Date(dateStr)
                    });
                    
                    modal?.classList.remove('active');
                    showToast('✨ Cápsula do tempo criada com sucesso! ✨', 'success');
                }
            });
        }
        modal?.classList.add('active');
    });
}

function updateMemoriesCount() {
    const memoriesElement = document.getElementById('memories');
    if (memoriesElement) {
        let count = 156;
        memoriesElement.textContent = count.toLocaleString();
        
        setInterval(() => {
            if (count < 365) {
                count += Math.floor(Math.random() * 3);
                memoriesElement.textContent = count.toLocaleString();
            }
        }, 8000);
    }
}

function checkAnniversary(startDate: Date) {
    const now = new Date();
    const diffMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
    
    if (diffMonths >= 5 && !localStorage.getItem('confettiShown')) {
        localStorage.setItem('confettiShown', 'true');
        setTimeout(() => {
            showToast('🎉 PARABÉNS! 5 MESES DE NAMORO! 🎉', 'success');
        }, 1000);
    }
}

function setupResponsiveNavbar() {
    const navbar = document.querySelector('.navbar');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        navbar?.classList.add('mobile');
    } else {
        navbar?.classList.remove('mobile');
    }
    
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            navbar?.classList.add('mobile');
        } else {
            navbar?.classList.remove('mobile');
        }
    });
}

function setupSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) < swipeThreshold) return;
        
        const sections = ['home', 'timeline', 'gallery', 'capsule', 'quiz'];
        const currentSection = document.querySelector('.section.active')?.id;
        const currentIndex = sections.indexOf(currentSection || 'home');
        
        if (diff > 0 && currentIndex > 0) {
            // Swipe direita -> seção anterior
            const prevSection = sections[currentIndex - 1];
            const prevLink = document.querySelector(`[data-section="${prevSection}"]`) as HTMLElement;
            prevLink?.click();
        } else if (diff < 0 && currentIndex < sections.length - 1) {
            // Swipe esquerda -> próxima seção
            const nextSection = sections[currentIndex + 1];
            const nextLink = document.querySelector(`[data-section="${nextSection}"]`) as HTMLElement;
            nextLink?.click();
        }
    }
}

function handleOrientationChange() {
    // Re-renderizar componentes que precisam de ajuste
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
}

function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '✅';
    let bgColor = '#4caf50';
    
    if (type === 'error') {
        icon = '❌';
        bgColor = '#ff4757';
    } else if (type === 'info') {
        icon = 'ℹ️';
        bgColor = '#2196f3';
    }
    
    toast.innerHTML = `${icon} ${message}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: clamp(0.8rem, 3vw, 0.9rem);
        z-index: 10000;
        animation: fadeInOut 2s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        white-space: nowrap;
        max-width: 90vw;
        white-space: normal;
        text-align: center;
        font-family: 'Inter', sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.remove(), 2000);
}

// Export para debugging (opcional)
declare global {
    interface Window {
        timeCapsule: TimeCapsule | null;
    }
}

if (timeCapsule) {
    window.timeCapsule = timeCapsule;
}