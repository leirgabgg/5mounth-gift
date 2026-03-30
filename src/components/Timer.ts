import { DateUtils } from '../utils/dateUtils';

export class Timer {
    private startDate: Date;
    private elements: {
        years: HTMLElement;
        months: HTMLElement;
        days: HTMLElement;
        hours: HTMLElement;
        minutes: HTMLElement;
        seconds: HTMLElement;
        message: HTMLElement;
        totalHours: HTMLElement;
        heartbeats: HTMLElement;
        messages: HTMLElement;
        memories: HTMLElement;
    };
    private intervalId: number | null = null;
    
    constructor(startDate: Date) {
        this.startDate = startDate;
        this.elements = {
            years: document.getElementById('years')!,
            months: document.getElementById('months')!,
            days: document.getElementById('days')!,
            hours: document.getElementById('hours')!,
            minutes: document.getElementById('minutes')!,
            seconds: document.getElementById('seconds')!,
            message: document.getElementById('timerMessage')!,
            totalHours: document.getElementById('totalHours')!,
            heartbeats: document.getElementById('heartbeats')!,
            messages: document.getElementById('messages')!,
            memories: document.getElementById('memories')!
        };
    }
    
    start(): void {
        this.update();
        this.intervalId = window.setInterval(() => this.update(), 1000);
    }
    
    stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    
    private update(): void {
        const diff = DateUtils.getTimeDifference(this.startDate);
        
        this.elements.years.textContent = diff.years.toString();
        this.elements.months.textContent = diff.months.toString();
        this.elements.days.textContent = diff.days.toString();
        this.elements.hours.textContent = diff.hours.toString();
        this.elements.minutes.textContent = diff.minutes.toString();
        this.elements.seconds.textContent = diff.seconds.toString();
        
        const totalHours = Math.floor(diff.totalSeconds / 3600);
        this.elements.totalHours.textContent = totalHours.toLocaleString();
        
        const heartbeats = Math.floor(diff.totalSeconds * 1.2);
        this.elements.heartbeats.textContent = heartbeats.toLocaleString();
        
        const messages = Math.floor(diff.totalSeconds / 1800);
        this.elements.messages.textContent = messages.toLocaleString();
        
        // Mensagem especial para 5 meses
        if (diff.months >= 5) {
            this.elements.message.innerHTML = '🎉 Parabéns! Completamos 5 meses juntos! 🎉<br>Que venham muitos mais meses de amor e felicidade! 💖';
        } else {
            const remaining = 5 - diff.months;
            this.elements.message.innerHTML = `⏳ Faltam ${remaining} ${remaining === 1 ? 'mês' : 'meses'} para completarmos 5 meses!<br>Cada dia ao seu lado é especial ✨`;
        }
        
        // Ajusta o tamanho da fonte baseado no dispositivo
        this.adjustFontSize();
    }
    
    private adjustFontSize(): void {
        const isMobile = window.innerWidth <= 768;
        const timerValues = document.querySelectorAll('.timer-value');
        
        timerValues.forEach(el => {
            if (isMobile) {
                (el as HTMLElement).style.fontSize = 'clamp(1rem, 5vw, 1.5rem)';
            } else {
                (el as HTMLElement).style.fontSize = '';
            }
        });
    }
}