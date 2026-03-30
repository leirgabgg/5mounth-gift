import { TimeCapsule as TimeCapsuleType } from '../types';
import { DateUtils } from '../utils/dateUtils';

export class TimeCapsule {
    private container: HTMLElement;
    private modal: HTMLElement;
    private capsules: TimeCapsuleType[];
    private onAddCallback?: (capsule: TimeCapsuleType) => void;
    private onDeleteCallback?: (id: number) => void;
    
    constructor(containerId: string, modalId: string) {
        this.container = document.getElementById(containerId)!;
        this.modal = document.getElementById(modalId)!;
        this.capsules = this.loadCapsules();
        this.setupModal();
    }
    
    private loadCapsules(): TimeCapsuleType[] {
        const saved = localStorage.getItem('timeCapsules');
        
        // Se já existem dados salvos, carrega eles
        if (saved) {
            const capsules = JSON.parse(saved);
            return capsules.map((c: any) => ({
                ...c,
                unlockDate: new Date(c.unlockDate),
                createdAt: new Date(c.createdAt),
                isUnlocked: DateUtils.isDatePassed(new Date(c.unlockDate))
            }));
        }
        
        // Só cria as cápsulas de exemplo se NÃO houver dados salvos
        // AGORA VOCÊ PODE MODIFICAR ESTAS CÁPSULAS À VONTADE!
        const now = new Date();
        const exampleCapsules = [
            {
                id: 1,
                title: "📝 Primeira promessa",
                message: "Prometo te fazer sorrir todos os dias, mesmo nos mais difíceis. Você merece todo o amor do mundo! 💖",
                unlockDate: new Date(2025, 9, 27), // Data original do início do namoro
                createdAt: now,
                isUnlocked: true // Esta cápsula já está desbloqueada para mostrar a mensagem de exemplo
            },
            {
                id: 2,
                title: "🌟 Meu agradecimento",
                message: "Obrigado por existir na minha vida. Você trouxe cor para meus dias e sentido para minha existência. Sou grato por cada segundo ao seu lado! 🙏. Agora deixe você seu recado e quando ele deverá ser aberto",
                unlockDate: new Date(2026, 2 , 27), // 5 meses depois da data original
                createdAt: now,
                isUnlocked: true
            },
            {
                id: 3,
                title: "🎉 1 ano de namoro",
                message: "Se você está lendo isso, significa que chegamos ao primeiro ano! Parabéns para nós! Que venham muitos mais anos de amor e cumplicidade. Te amo mais a cada dia! 🎊",
                unlockDate: new Date(2026, 9, 27), // Exatamente 1 ano depois da data original
                createdAt: now,
                isUnlocked: false
            }
        ];
        
        // Salva as cápsulas de exemplo no localStorage imediatamente
        localStorage.setItem('timeCapsules', JSON.stringify(exampleCapsules));
        
        return exampleCapsules;
    }
    
    private saveCapsules(): void {
        localStorage.setItem('timeCapsules', JSON.stringify(this.capsules));
    }
    
    private setupModal(): void {
        const closeBtn = this.modal.querySelector('.modal-close');
        closeBtn?.addEventListener('click', () => {
            this.modal.classList.remove('active');
        });
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.modal.classList.remove('active');
            }
        });
    }
    
    render(): void {
        if (this.capsules.length === 0) {
            this.container.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: var(--card-bg); border-radius: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
                    <h3>Nenhuma cápsula do tempo ainda</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">Clique em "Adicionar Nova Mensagem" para criar sua primeira cápsula!</p>
                    <button id="resetExampleCapsules" style="background: var(--gradient-1); border: none; padding: 0.5rem 1rem; border-radius: 8px; color: white; cursor: pointer;">
                        🔄 Restaurar Cápsulas de Exemplo
                    </button>
                </div>
            `;
            
            const resetBtn = document.getElementById('resetExampleCapsules');
            resetBtn?.addEventListener('click', () => {
                this.resetToExamples();
            });
            return;
        }
        
        this.container.innerHTML = this.capsules.map(capsule => {
            const isUnlocked = DateUtils.isDatePassed(capsule.unlockDate);
            if (isUnlocked !== capsule.isUnlocked) {
                capsule.isUnlocked = isUnlocked;
                this.saveCapsules();
            }
            
            return `
                <div class="capsule-card ${!capsule.isUnlocked ? 'locked' : ''}" data-id="${capsule.id}">
                    <div class="capsule-date">
                        ${capsule.isUnlocked ? '📬 Disponível' : `Disponível em: ${DateUtils.formatDate(capsule.unlockDate)}`}
                    </div>
                    <div class="capsule-title">${capsule.title}</div>
                    <div class="capsule-message">
                        ${capsule.isUnlocked ? capsule.message : 'Esta mensagem ainda está trancada no tempo. Volte na data marcada para desvendá-la! ⏳'}
                    </div>
                    <button class="capsule-delete-btn" data-id="${capsule.id}" data-title="${capsule.title}">
                        🗑️ Excluir
                    </button>
                </div>
            `;
        }).join('');
        
        // Adiciona evento de clique nas cápsulas desbloqueadas
        this.container.querySelectorAll('.capsule-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if ((e.target as HTMLElement).classList.contains('capsule-delete-btn')) {
                    return;
                }
                
                const id = parseInt(card.getAttribute('data-id')!);
                const capsule = this.capsules.find(c => c.id === id);
                if (capsule && capsule.isUnlocked) {
                    this.openCapsule(capsule);
                } else if (capsule && !capsule.isUnlocked) {
                    this.showToast(`Esta cápsula estará disponível em ${DateUtils.formatDate(capsule.unlockDate)}`, 'info');
                }
            });
        });
        
        // Adiciona evento de clique nos botões de excluir
        this.container.querySelectorAll('.capsule-delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(btn.getAttribute('data-id')!);
                const title = btn.getAttribute('data-title')!;
                this.confirmDelete(id, title);
            });
        });
    }
    
    private resetToExamples(): void {
        const now = new Date();
        const exampleCapsules = [
            {
                id: 1,
                title: "📝 Primeira promessa",
                message: "Prometo te fazer sorrir todos os dias, mesmo nos mais difíceis. Você merece todo o amor do mundo! 💖",
                unlockDate: new Date(2025, 9, 27), // Data original do início do namoro
                createdAt: now,
                isUnlocked: true // Esta cápsula já está desbloqueada para mostrar a mensagem de exemplo
            },
            {
                id: 2,
                title: "🌟 Meu agradecimento",
                message: "Obrigado por existir na minha vida. Você trouxe cor para meus dias e sentido para minha existência. Sou grato por cada segundo ao seu lado! 🙏. Agora deixe você seu recado e quando ele deverá ser aberto",
                unlockDate: new Date(now.getFullYear(), now.getMonth() + 9, now.getDate()),
                createdAt: now,
                isUnlocked: false
            },
            {
                id: 3,
                title: "🎉 1 ano de namoro",
                message: "Se você está lendo isso, significa que chegamos ao primeiro ano! Parabéns para nós! Que venham muitos mais anos de amor e cumplicidade. Te amo mais a cada dia! 🎊",
                unlockDate: new Date(2026, 9, 27), // Exatamente 1 ano depois da data original
                createdAt: now,
                isUnlocked: false
            }
        ];
        
        this.capsules = exampleCapsules;
        this.saveCapsules();
        this.render();
        this.showToast('Cápsulas de exemplo restauradas com sucesso!', 'success');
    }
    
    private confirmDelete(id: number, title: string): void {
        const modalBody = this.modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h2>Excluir Cápsula</h2>
                    <p style="margin: 1rem 0;">Tem certeza que deseja excluir a cápsula <strong>"${title}"</strong>?</p>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Esta ação não pode ser desfeita.</p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button id="confirmDeleteBtn" style="background: #ff4757; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; color: white; cursor: pointer; font-weight: bold;">
                            Sim, Excluir
                        </button>
                        <button id="cancelDeleteBtn" style="background: var(--card-bg); padding: 0.75rem 1.5rem; border: 1px solid var(--card-border); border-radius: 8px; color: var(--text-primary); cursor: pointer;">
                            Cancelar
                        </button>
                    </div>
                </div>
            `;
            
            const confirmBtn = document.getElementById('confirmDeleteBtn');
            const cancelBtn = document.getElementById('cancelDeleteBtn');
            
            confirmBtn?.addEventListener('click', () => {
                this.deleteCapsule(id);
                this.modal.classList.remove('active');
            });
            
            cancelBtn?.addEventListener('click', () => {
                this.modal.classList.remove('active');
            });
        }
        this.modal.classList.add('active');
    }
    
    private deleteCapsule(id: number): void {
        const index = this.capsules.findIndex(c => c.id === id);
        if (index !== -1) {
            this.capsules.splice(index, 1);
            this.saveCapsules();
            this.render();
            
            this.showToast('Cápsula excluída com sucesso!', 'success');
            
            if (this.onDeleteCallback) {
                this.onDeleteCallback(id);
            }
        }
    }
    
    private showToast(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
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
        
        toast.innerHTML = `
            <span>${icon}</span>
            <span>${message}</span>
        `;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            gap: 8px;
            align-items: center;
            font-family: 'Inter', sans-serif;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    private openCapsule(capsule: TimeCapsuleType): void {
        const modalBody = this.modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📦✨</div>
                    <h2>${capsule.title}</h2>
                    <p style="margin: 1rem 0; font-size: 1.1rem; line-height: 1.6;">${capsule.message}</p>
                    <hr style="margin: 1rem 0; border-color: var(--card-border);">
                    <small style="color: var(--text-secondary);">
                        Criado em: ${DateUtils.formatDate(capsule.createdAt)}
                    </small>
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center;">
                        <button id="deleteFromModalBtn" class="capsule-delete-btn" data-id="${capsule.id}" data-title="${capsule.title}" style="background: #ff4757; padding: 0.5rem 1rem; border: none; border-radius: 6px; color: white; cursor: pointer;">
                            🗑️ Excluir esta cápsula
                        </button>
                    </div>
                </div>
            `;
            
            const deleteBtn = document.getElementById('deleteFromModalBtn');
            deleteBtn?.addEventListener('click', () => {
                this.modal.classList.remove('active');
                this.confirmDelete(capsule.id, capsule.title);
            });
        }
        this.modal.classList.add('active');
    }
    
    addCapsule(capsule: Omit<TimeCapsuleType, 'id' | 'createdAt' | 'isUnlocked'>): void {
        const newCapsule: TimeCapsuleType = {
            ...capsule,
            id: Date.now(),
            createdAt: new Date(),
            isUnlocked: DateUtils.isDatePassed(capsule.unlockDate)
        };
        this.capsules.push(newCapsule);
        this.saveCapsules();
        this.render();
        
        if (this.onAddCallback) {
            this.onAddCallback(newCapsule);
        }
        
        this.showToast('Cápsula criada com sucesso!', 'success');
    }
    
    onAdd(callback: (capsule: TimeCapsuleType) => void): void {
        this.onAddCallback = callback;
    }
    
    onDelete(callback: (id: number) => void): void {
        this.onDeleteCallback = callback;
    }
    
    // Método público para forçar recarga das cápsulas
    reload(): void {
        this.capsules = this.loadCapsules();
        this.render();
    }

    // Adicione este método à classe TimeCapsule
    public forceResetToNewExamples(): void {
    // Limpa completamente o localStorage
    localStorage.removeItem('timeCapsules');
    
    // Recarrega as cápsulas (agora vai pegar seus novos exemplos)
    this.capsules = this.loadCapsules();
    this.render();
    
    this.showToast('Cápsulas resetadas com sucesso! Usando novos exemplos.', 'success');
}
    
}

