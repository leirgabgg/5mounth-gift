import { GalleryImage } from '../types';
import { DateUtils } from '../utils/dateUtils';

export class Gallery {
    private container: HTMLElement;
    private modal: HTMLElement;
    private images: GalleryImage[];
    
    constructor(containerId: string, modalId: string) {
        this.container = document.getElementById(containerId)!;
        this.modal = document.getElementById(modalId)!;
        this.images = this.generateSampleImages();
        this.setupModal();
        
        // Adiciona listener para redimensionamento
        window.addEventListener('resize', () => this.adjustGalleryLayout());
    }
    
    private generateSampleImages(): GalleryImage[] {
        // IMPORTANTE: Substitua essas URLs pelas suas fotos reais
        // Para melhor responsividade, use imagens otimizadas
        return [
            {
                id: 1,
                url: 'public/assets/primeiro-encontro.jpg', // Exemplo de caminho para a imagem
                caption: 'Nosso primeiro "encontro" - data inesquecível',
                date: new Date(2025, 8, 20)
            },
            {
                id: 2,
                url: 'public/assets/passeioshopp.jpg', // Exemplo de caminho para a imagem
                caption: 'O Passeio especial - só nós dois (Junto da marcação de terriório)',
                date: new Date(2025, 9, 25)
            },
                        {
                id: 3,
                url: 'public/assets/tardezinha.jpg', // Exemplo de caminho para a imagem
                caption: 'Dia perfeito ao seu lado - Quando passamos a tarde vendo Ordem Paranormal',
                date: new Date(2025, 11, 4)
            },
            {
                id: 4,
                url: 'public/assets/minhacasa.jpg', // Exemplo de caminho para a imagem
                caption: 'Nossa primeira viagem - Indo pra minha casa pela primeira vez ksksksks',
                date: new Date(2025, 11, 7)
            },
                        {
                id: 5,
                url: 'public/assets/desenho.jpg', // Exemplo de caminho para a imagem
                caption: 'O primeiro desenho que você fez pra mim - E eu amei demais, claro',
                date: new Date(2025, 11, 16)
            },
                        {
                id: 6,
                url: 'public/assets/presente.jpg', // Exemplo de caminho para a imagem
                caption: 'O dia que você me deu um presente surpresa - Fiquei tão feliz, foi tão fofo da sua parte',
                date: new Date(2026, 0, 17)
            },
            {
                id: 7,
                url: 'public/assets/bielssauro.jpg', // Exemplo de caminho para a imagem
                caption: 'Cada segundo ao seu lado é único - Vc conhecendo a minha cidade pela primeira vez(Bielssauro)',
                date: new Date(2026, 1, 28)
            },
            {
                id: 8,
                url: 'public/assets/sonhopc.jpg', // Exemplo de caminho para a imagem
                caption: 'Realizando seu sonho - O dia que montei seu PC e vc ficou super feliz (E eu também, claro)',
                date: new Date(2026, 0, 31)
            },
            {
                id: 9,
                url: 'public/assets/5meses.jpg', // Exemplo de caminho para a imagem
                caption: 'Celebrando 5 meses de muito amor - Passando raiva juntos no Mario Party, mas rindo muito no final',
                date: new Date(2026, 2, 29)
            }
        ];
    }
    
    private adjustGalleryLayout(): void {
        const isMobile = window.innerWidth <= 480;
        const galleryGrid = this.container;
        
        if (isMobile) {
            galleryGrid.style.gap = '0.5rem';
        } else {
            galleryGrid.style.gap = '1.5rem';
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
        
        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.modal.classList.remove('active');
            }
        });
    }
    
    render(): void {
        const columns = this.getColumnsCount();
        this.container.style.gridTemplateColumns = `repeat(auto-fill, minmax(${columns}px, 1fr))`;
        
        this.container.innerHTML = this.images.map(image => `
            <div class="gallery-card" data-id="${image.id}">
                <img src="${image.url}" alt="${image.caption}" loading="lazy">
                <div class="gallery-overlay">
                    <p>${image.caption}</p>
                    <small>${DateUtils.formatDate(image.date)}</small>
                </div>
            </div>
        `).join('');
        
        this.container.querySelectorAll('.gallery-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.getAttribute('data-id')!);
                const image = this.images.find(img => img.id === id);
                if (image) {
                    this.openModal(image);
                }
            });
        });
    }
    
    private getColumnsCount(): number {
        const width = window.innerWidth;
        if (width <= 480) return 140;
        if (width <= 768) return 160;
        if (width <= 1024) return 200;
        return 250;
    }
    
    private openModal(image: GalleryImage): void {
        const modalBody = this.modal.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = `
                <img src="${image.url}" alt="${image.caption}" style="width: 100%; border-radius: 15px; margin-bottom: 1rem;">
                <h3 style="font-size: clamp(1rem, 4vw, 1.3rem);">${image.caption}</h3>
                <p style="color: var(--text-secondary); font-size: clamp(0.8rem, 3vw, 0.9rem); margin-top: 0.5rem;">
                    ${DateUtils.formatDate(image.date)}
                </p>
                <p style="margin-top: 1rem; font-size: clamp(0.85rem, 3vw, 1rem);">
                    Que momento especial! Cada foto traz de volta a emoção que sentimos. 💖
                </p>
            `;
        }
        this.modal.classList.add('active');
    }
    
    addImage(image: GalleryImage): void {
        this.images.push(image);
        this.render();
    }
}