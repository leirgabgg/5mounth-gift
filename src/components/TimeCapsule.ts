import { TimeCapsule as TimeCapsuleType } from '../types';
import { DateUtils } from '../utils/dateUtils';
import { getCapsules, saveCapsules } from '../services/api';

export class TimeCapsule {
    private container: HTMLElement;
    private modal: HTMLElement;
    private capsules: TimeCapsuleType[];
    private onAddCallback?: (capsule: TimeCapsuleType) => void;
    private onDeleteCallback?: (id: number) => void;
    private isLoading: boolean = false;
    
    constructor(containerId: string, modalId: string) {
        this.container = document.getElementById(containerId)!;
        this.modal = document.getElementById(modalId)!;
        this.capsules = [];
        this.setupModal();
        this.initializeCapsules();
    }
    
    private async initializeCapsules(): Promise<void> {
        this.showLoading();
        await this.loadCapsulesFromAPI();
        this.render();
    }
    
    private async loadCapsulesFromAPI(): Promise<void> {
        try {
            // Tenta carregar da API primeiro
            const apiCapsules = await getCapsules();
            
            if (apiCapsules && apiCapsules.length > 0) {
                // Converte as datas de string para Date
                this.capsules = apiCapsules.map((c: any) => ({
                    ...c,
                    unlockDate: new Date(c.unlockDate),
                    createdAt: new Date(c.createdAt),
                    isUnlocked: DateUtils.isDatePassed(new Date(c.unlockDate))
                }));
                
                // Atualiza localStorage como cache
                localStorage.setItem('timeCapsules', JSON.stringify(this.capsules));
                return;
            }
        } catch (error) {
            console.error('Erro ao carregar da API:', error);
            this.showToast('Erro ao sincronizar dados. Usando dados locais.', 'error');
        }
        
        // Fallback: tenta carregar do localStorage
        const saved = localStorage.getItem('timeCapsules');
        if (saved) {
            const capsules = JSON.parse(saved);
            this.capsules = capsules.map((c: any) => ({
                ...c,
                unlockDate: new Date(c.unlockDate),
                createdAt: new Date(c.createdAt),
                isUnlocked: DateUtils.isDatePassed(new Date(c.unlockDate))
            }));
        } else {
            // Se não há dados, cria as cápsulas de exemplo
            this.capsules = this.createExampleCapsules();
            await this.saveCapsulesToAPI(); // Salva na API imediatamente
        }
    }
    
    private createExampleCapsules(): TimeCapsuleType[] {
        const now = new Date();
        // Data do início do namoro (ALTERE PARA SUA DATA)
        const startDate = new Date(2024, 10, 27); // 27 de Novembro de 2024
        
        return [
            {
                id: 1,
                title: "📝 Nossa primeira promessa",
                message: "Prometo te fazer sorrir todos os dias, mesmo nos mais difíceis. Você merece todo o amor do mundo! 💖",
                unlockDate: startDate, // Já desbloqueada
                createdAt: now,
                isUnlocked: true
            },
            {
                id: 2,
                title: "🌟 Meu agradecimento",
                message: "Obrigado por existir na minha vida. Você trouxe cor para meus dias e sentido para minha existência. Sou grato por cada segundo ao seu lado! 🙏\n\nAgora é sua vez: deixe seu recado e escolha quando ele deverá ser aberto!",
                unlockDate: new Date(2025, 2, 27), // 27 de Março de 2025
                createdAt: now,
                isUnlocked: DateUtils.isDatePassed(new Date(2025, 2, 27))
            },
            {
                id: 3,
                title: "🎉 1 ano de namoro",
                message: "Se você está lendo isso, significa que chegamos ao primeiro ano! Parabéns para nós! Que venham muitos mais anos de amor e cumplicidade. Te amo mais a cada dia! 🎊",
                unlockDate: new Date(2025, 10, 27), // 27 de Novembro de 2025
                createdAt: now,
                isUnlocked: DateUtils.isDatePassed(new Date(2025, 10, 27))
            }
        ];
    }
    
    private async saveCapsulesToAPI(): Promise<void> {
        try {
            // Prepara os dados para salvar (converte Dates para strings)
            const capsulesToSave = this.capsules.map(c => ({
                ...c,
                unlockDate: c.unlockDate.toISOString(),
                createdAt: c.createdAt.toISOString()
            }));
            
            const success = await saveCapsules(capsulesToSave);
            if (success) {
                // Atualiza cache local
                localStorage.setItem('timeCapsules', JSON.stringify(this.capsules));
            }
        } catch (error) {
            console.error('Erro ao salvar na API:', error);
            // Ainda salva localmente mesmo se a API falhar
            localStorage.setItem('timeCapsules', JSON.stringify(this.capsules));
            this.showToast('Erro ao sincronizar com a nuvem. Dados salvos localmente.', 'error');
        }
    }
    
    private showLoading(): void {
        this.isLoading = true;
        this.container.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <div style="font-size: 2rem; animation: spin 1s linear infinite;">⏳</div>
                <p style="margin-top: 1rem; color: var(--text-secondary);">Carregando cápsulas do tempo...</p>
            </div>
        `;
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
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.modal.classList.remove('active');
            }
        });
    }
    
    render(): void {
        if (this.isLoading) return;
        
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
        
        // Ordena cápsulas: desbloqueadas primeiro, depois por data de desbloqueio
        const sortedCapsules = [...this.capsules].sort((a, b) => {
            if (a.isUnlocked !== b.isUnlocked) {
                return a.isUnlocked ? -1 : 1;
            }
            return a.unlockDate.getTime() - b.unlockDate.getTime();
        });
        
        this.container.innerHTML = sortedCapsules.map(capsule => {
            const isUnlocked = DateUtils.isDatePassed(capsule.unlockDate);
            if (isUnlocked !== capsule.isUnlocked) {
                capsule.isUnlocked = isUnlocked;
                this.saveCapsulesToAPI(); // Atualiza API quando status muda
            }
            
            return `
                <div class="capsule-card ${!capsule.isUnlocked ? 'locked' : ''}" data-id="${capsule.id}">
                    <div class="capsule-date">
                        ${capsule.isUnlocked ? '📬 Disponível' : `🔒 Disponível em: ${DateUtils.formatDate(capsule.unlockDate)}`}
                    </div>
                    <div class="capsule-title">${this.escapeHtml(capsule.title)}</div>
                    <div class="capsule-message">
                        ${capsule.isUnlocked ? this.escapeHtml(capsule.message) : 'Esta mensagem ainda está trancada no tempo. Volte na data marcada para desvendá-la! ⏳'}
                    </div>
                    <button class="capsule-delete-btn" data-id="${capsule.id}" data-title="${this.escapeHtml(capsule.title)}">
                        🗑️ Excluir
                    </button>
                </div>
            `;
        }).join('');
        
        // Adiciona eventos
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
                    this.showToast(`📅 Esta cápsula estará disponível em ${DateUtils.formatDate(capsule.unlockDate)}`, 'info');
                }
            });
        });
        
        this.container.querySelectorAll('.capsule-delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const id = parseInt(btn.getAttribute('data-id')!);
                const title = btn.getAttribute('data-title')!;
                this.confirmDelete(id, title);
            });
        });
    }
    
    private escapeHtml(str: string): string {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    
    private async resetToExamples(): Promise<void> {
        this.capsules = this.createExampleCapsules();
        await this.saveCapsulesToAPI();
        this.render();
        this.showToast('✨ Cápsulas restauradas com sucesso! ✨', 'success');
    }
    
    private confirmDelete(id: number, title: string): void {
        const modalBody = this.modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h2>Excluir Cápsula</h2>
                    <p style="margin: 1rem 0;">Tem certeza que deseja excluir a cápsula <strong>"${this.escapeHtml(title)}"</strong>?</p>
                    <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Esta ação não pode ser desfeita e afetará todos os usuários.</p>
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
            
            confirmBtn?.addEventListener('click', async () => {
                await this.deleteCapsule(id);
                this.modal.classList.remove('active');
            });
            
            cancelBtn?.addEventListener('click', () => {
                this.modal.classList.remove('active');
            });
        }
        this.modal.classList.add('active');
    }
    
    private async deleteCapsule(id: number): Promise<void> {
        const index = this.capsules.findIndex(c => c.id === id);
        if (index !== -1) {
            this.capsules.splice(index, 1);
            await this.saveCapsulesToAPI();
            this.render();
            
            this.showToast('✅ Cápsula excluída com sucesso!', 'success');
            
            if (this.onDeleteCallback) {
                this.onDeleteCallback(id);
            }
        }
    }
    
    private showToast(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
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
            font-size: 14px;
            z-index: 10000;
            animation: fadeInOut 2s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            font-family: 'Inter', sans-serif;
            white-space: nowrap;
            max-width: 90vw;
            white-space: normal;
            text-align: center;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }
    
    private openCapsule(capsule: TimeCapsuleType): void {
        const modalBody = this.modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📦✨</div>
                    <h2>${this.escapeHtml(capsule.title)}</h2>
                    <p style="margin: 1rem 0; font-size: 1.1rem; line-height: 1.6; white-space: pre-wrap;">${this.escapeHtml(capsule.message)}</p>
                    <hr style="margin: 1rem 0; border-color: var(--card-border);">
                    <small style="color: var(--text-secondary);">
                        Criado em: ${DateUtils.formatDate(capsule.createdAt)}
                    </small>
                    <div style="margin-top: 1.5rem;">
                        <button id="deleteFromModalBtn" style="background: #ff4757; padding: 0.5rem 1rem; border: none; border-radius: 6px; color: white; cursor: pointer;">
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
    
    async addCapsule(capsule: Omit<TimeCapsuleType, 'id' | 'createdAt' | 'isUnlocked'>): Promise<void> {
        const newCapsule: TimeCapsuleType = {
            ...capsule,
            id: Date.now(),
            createdAt: new Date(),
            isUnlocked: DateUtils.isDatePassed(capsule.unlockDate)
        };
        this.capsules.push(newCapsule);
        await this.saveCapsulesToAPI();
        this.render();
        
        if (this.onAddCallback) {
            this.onAddCallback(newCapsule);
        }
        
        this.showToast('✨ Cápsula criada e compartilhada! ✨', 'success');
    }
    
    async syncWithAPI(): Promise<void> {
        this.showLoading();
        await this.loadCapsulesFromAPI();
        this.render();
        this.showToast('📦 Dados sincronizados com a nuvem!', 'success');
    }
    
    onAdd(callback: (capsule: TimeCapsuleType) => void): void {
        this.onAddCallback = callback;
    }
    
    onDelete(callback: (id: number) => void): void {
        this.onDeleteCallback = callback;
    }
    
    reload(): void {
        this.syncWithAPI();
    }
    
    async forceResetToNewExamples(): Promise<void> {
        this.capsules = this.createExampleCapsules();
        await this.saveCapsulesToAPI();
        this.render();
        this.showToast('✨ Cápsulas resetadas com sucesso! ✨', 'success');
    }
}