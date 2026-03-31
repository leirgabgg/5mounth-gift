import { TimeCapsule as TimeCapsuleType } from '../types';
import { DateUtils } from '../utils/dateUtils';
import { getCapsules, saveCapsules } from '../services/api';

export class TimeCapsule {
    private container: HTMLElement;
    private modal: HTMLElement;
    private capsules: TimeCapsuleType[];
    private onAddCallback?: (capsule: TimeCapsuleType) => void;
    private onDeleteCallback?: (id: number) => void;
    private isLoading: boolean = true;
    
    constructor(containerId: string, modalId: string) {
        this.container = document.getElementById(containerId)!;
        this.modal = document.getElementById(modalId)!;
        this.capsules = [];
        this.setupModal();
        this.initialize();
    }
    
    private async initialize(): Promise<void> {
        await this.loadCapsules();
        this.isLoading = false;
        this.render();
    }
    
    private async loadCapsules(): Promise<void> {
        try {
            console.log('📦 Carregando cápsulas...');
            
            // 1. Tenta carregar da API primeiro
            const apiCapsules = await getCapsules();
            console.log('📦 Resposta da API:', apiCapsules);
            
            if (apiCapsules && Array.isArray(apiCapsules) && apiCapsules.length > 0) {
                // Converte os dados da API
                this.capsules = apiCapsules.map((c: any) => ({
                    ...c,
                    unlockDate: new Date(c.unlockDate),
                    createdAt: new Date(c.createdAt),
                    isUnlocked: DateUtils.isDatePassed(new Date(c.unlockDate))
                }));
                console.log('✅ Cápsulas carregadas da API:', this.capsules.length);
                
                // Salva no localStorage como backup
                localStorage.setItem('timeCapsules', JSON.stringify(this.capsules));
                return;
            }
            
            // 2. Se não tem na API, tenta localStorage
            const saved = localStorage.getItem('timeCapsules');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.capsules = parsed.map((c: any) => ({
                    ...c,
                    unlockDate: new Date(c.unlockDate),
                    createdAt: new Date(c.createdAt),
                    isUnlocked: DateUtils.isDatePassed(new Date(c.unlockDate))
                }));
                console.log('📦 Cápsulas carregadas do localStorage:', this.capsules.length);
                
                // Salva na API para sincronizar
                await this.saveToAPI();
                return;
            }
            
            // 3. Cria cápsulas de exemplo
            console.log('📦 Criando cápsulas de exemplo...');
            this.capsules = this.createExampleCapsules();
            await this.saveToAPI();
            console.log('✅ Cápsulas de exemplo criadas:', this.capsules.length);
            
        } catch (error) {
            console.error('❌ Erro ao carregar cápsulas:', error);
            // Fallback: tenta localStorage
            const saved = localStorage.getItem('timeCapsules');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.capsules = parsed.map((c: any) => ({
                    ...c,
                    unlockDate: new Date(c.unlockDate),
                    createdAt: new Date(c.createdAt),
                    isUnlocked: DateUtils.isDatePassed(new Date(c.unlockDate))
                }));
            } else {
                this.capsules = this.createExampleCapsules();
            }
        }
    }
    
    private createExampleCapsules(): TimeCapsuleType[] {
        const now = new Date();
        // Data do início do namoro (ALTERE PARA SUA DATA)
        const startDate = new Date(2025, 9, 27); // 27 de Novembro de 2025
        
        return [
            {
                id: Date.now(),
                title: "📝 Nossa primeira promessa",
                message: "Prometo te fazer sorrir todos os dias, mesmo nos mais difíceis. Você merece todo o amor do mundo! 💖",
                unlockDate: startDate,
                createdAt: now,
                isUnlocked: true
            },
            {
                id: Date.now() + 1,
                title: "🌟 Mensagem para o futuro",
                message: "Escreva aqui uma mensagem especial para abrir no futuro! 💫",
                unlockDate: new Date(2026, 9, 27), // 27 de Junho de 2026
                createdAt: now,
                isUnlocked: false
            },
            {
                id: Date.now() + 2,
                title: "🎉 1 ano de namoro",
                message: "Se você está lendo isso, significa que chegamos ao primeiro ano! Parabéns para nós! Que venham muitos mais anos de amor e cumplicidade. Te amo mais a cada dia! 🎊",
                unlockDate: new Date(2026, 9, 27), // 27 de Junho de 2026
                createdAt: now,
                isUnlocked: false
            }
        ];
    }
    
    private async saveToAPI(): Promise<void> {
        try {
            const capsulesToSave = this.capsules.map(c => ({
                id: c.id,
                title: c.title,
                message: c.message,
                unlockDate: c.unlockDate.toISOString(),
                createdAt: c.createdAt.toISOString(),
                isUnlocked: c.isUnlocked
            }));
            
            const success = await saveCapsules(capsulesToSave);
            if (success) {
                console.log('✅ Cápsulas salvas na API');
                localStorage.setItem('timeCapsules', JSON.stringify(this.capsules));
            }
        } catch (error) {
            console.error('❌ Erro ao salvar na API:', error);
            localStorage.setItem('timeCapsules', JSON.stringify(this.capsules));
        }
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
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.modal.classList.remove('active');
            }
        });
    }
    
    render(): void {
        if (this.isLoading) {
            this.container.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <div style="font-size: 2rem; animation: spin 1s linear infinite;">⏳</div>
                    <p style="margin-top: 1rem;">Carregando cápsulas do tempo...</p>
                </div>
            `;
            return;
        }
        
        if (!this.capsules || this.capsules.length === 0) {
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
        
        // Ordena: desbloqueadas primeiro, depois por data
        const sorted = [...this.capsules].sort((a, b) => {
            if (a.isUnlocked !== b.isUnlocked) {
                return a.isUnlocked ? -1 : 1;
            }
            return a.unlockDate.getTime() - b.unlockDate.getTime();
        });
        
        this.container.innerHTML = sorted.map(capsule => {
            const isUnlocked = DateUtils.isDatePassed(capsule.unlockDate);
            if (isUnlocked !== capsule.isUnlocked) {
                capsule.isUnlocked = isUnlocked;
                this.saveToAPI();
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
                if ((e.target as HTMLElement).classList.contains('capsule-delete-btn')) return;
                
                const id = Number(card.getAttribute('data-id'));
                const capsule = this.capsules.find(c => c.id === id);
                if (capsule && capsule.isUnlocked) {
                    this.openCapsule(capsule);
                } else if (capsule && !capsule.isUnlocked) {
                    this.showToast(`📅 Disponível em: ${DateUtils.formatDate(capsule.unlockDate)}`, 'info');
                }
            });
        });
        
        this.container.querySelectorAll('.capsule-delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const id = Number(btn.getAttribute('data-id'));
                const title = btn.getAttribute('data-title') || '';
                this.confirmDelete(id, title);
            });
        });
    }
    
    private escapeHtml(str: string): string {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    
    private async resetToExamples(): Promise<void> {
        this.capsules = this.createExampleCapsules();
        await this.saveToAPI();
        this.render();
        this.showToast('✨ Cápsulas restauradas com sucesso!', 'success');
    }
    
    private confirmDelete(id: number, title: string): void {
        const modalBody = this.modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h2>Excluir Cápsula</h2>
                    <p>Tem certeza que deseja excluir "<strong>${this.escapeHtml(title)}</strong>"?</p>
                    <p style="color: var(--text-secondary); margin: 1rem 0;">Esta ação afetará todos os usuários.</p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <button id="confirmDeleteBtn" style="background: #ff4757; padding: 0.5rem 1rem; border: none; border-radius: 6px; color: white; cursor: pointer;">Sim, Excluir</button>
                        <button id="cancelDeleteBtn" style="background: var(--card-bg); padding: 0.5rem 1rem; border: 1px solid var(--card-border); border-radius: 6px; cursor: pointer;">Cancelar</button>
                    </div>
                </div>
            `;
            
            document.getElementById('confirmDeleteBtn')?.addEventListener('click', async () => {
                await this.deleteCapsule(id);
                this.modal.classList.remove('active');
            });
            
            document.getElementById('cancelDeleteBtn')?.addEventListener('click', () => {
                this.modal.classList.remove('active');
            });
        }
        this.modal.classList.add('active');
    }
    
    private async deleteCapsule(id: number): Promise<void> {
        this.capsules = this.capsules.filter(c => c.id !== id);
        await this.saveToAPI();
        this.render();
        this.showToast('✅ Cápsula excluída com sucesso!', 'success');
        
        if (this.onDeleteCallback) {
            this.onDeleteCallback(id);
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
                    <p style="margin: 1rem 0; line-height: 1.6; white-space: pre-wrap;">${this.escapeHtml(capsule.message)}</p>
                    <hr style="margin: 1rem 0; border-color: var(--card-border);">
                    <small>Criado em: ${DateUtils.formatDate(capsule.createdAt)}</small>
                    <div style="margin-top: 1.5rem;">
                        <button id="deleteFromModalBtn" style="background: #ff4757; padding: 0.5rem 1rem; border: none; border-radius: 6px; color: white; cursor: pointer;">🗑️ Excluir</button>
                    </div>
                </div>
            `;
            
            document.getElementById('deleteFromModalBtn')?.addEventListener('click', () => {
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
        await this.saveToAPI();
        this.render();
        
        if (this.onAddCallback) {
            this.onAddCallback(newCapsule);
        }
        
        this.showToast('✨ Cápsula criada e compartilhada!', 'success');
    }
    
    onAdd(callback: (capsule: TimeCapsuleType) => void): void {
        this.onAddCallback = callback;
    }
    
    onDelete(callback: (id: number) => void): void {
        this.onDeleteCallback = callback;
    }
    
    async reload(): Promise<void> {
        this.isLoading = true;
        this.render();
        await this.loadCapsules();
        this.isLoading = false;
        this.render();
    }
}