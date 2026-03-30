import { TimelineEvent } from '../types';
import { DateUtils } from '../utils/dateUtils';

export class Timeline {
    private container: HTMLElement;
    private events: TimelineEvent[];
    
    constructor(containerId: string) {
        this.container = document.getElementById(containerId)!;
        this.events = this.generateEvents();
    }
    
    private generateEvents(): TimelineEvent[] {
        // Aqui você pode personalizar com suas próprias datas e histórias
        const startDate = new Date(2025, 9, 27); // Altere para sua data
        
        return [
            {
                id: 1,
                date: startDate,
                title: "🎲 O Dia que Tudo Começou",
                description: "Aquela madrugada, de conselhos e clima tenso de tanta emoção. Foi o início de uma história que eu jamais poderia imaginar. Entre palavras sinceras, silêncios cheios de significado e olhares que diziam mais do que qualquer frase, algo nasceu ali sem aviso, sem plano, só aconteceu. E, de alguma forma, desde aquele momento, tudo começou a mudar."
            },
            {
                id: 2,
                date: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 27),
                title: "📅 1 Mês de Namoro",
                description: "Um mês. Parece pouco, mas foi muito, não muito de tempo mas muito importante pra mim e para nós. Lembro da gente comprando o presente da minha mãe, do nosso primeiro beijo, do nosso primeiro abraço. Foi um mês de descobertas e de muito amor. Lembro da gente falando sobre o Natal e ano novo no próximo mês. E também eu fui a praia, como que eu queria que você tivesse ido comigo."
            },
            {
                id: 3,
                date: new Date(startDate.getFullYear(), startDate.getMonth() + 2, 27),
                title: "💕 2 Meses - Primeira Final de Ano",
                description: "Já conhecíamos os gostos um do outro, as manias, o jeito único de cada um. E também as nossas alianças, quem diria que um dia EU seria pedido em namoro e não o contrário. Fora que o poder de ler a mente um do outro tava bem mais forte ksksksksks. Também passamos o ano novo juntos, foi mágico."
            },
            {
                id: 4,
                date: new Date(startDate.getFullYear(), startDate.getMonth() + 3, 27),
                title: "🎨 3 Meses - Nosso Ritmo",
                description: "Foi o mês que trocamos os presentes de Natal, 1 mês atrasado… mas foi, ksksksks. E, no fim das contas, nem era sobre a data certa, era sobre o significado por trás de cada detalhe, de cada escolha, de cada sorriso meio bobo na hora de entregar. Porque ali já não era só um presente… era carinho em forma de gesto, era a gente criando memória sem nem perceber."
            },
            {
                id: 5,
                date: new Date(startDate.getFullYear(), startDate.getMonth() + 4, 27),
                title: "🌟 4 Meses - Planos para o Futuro",
                description: "Foi quando eu te dei a primeira carta feita a mão, e também o mês que montei seu PC, e ver vc feliz até hoje com ele é um negócio que me deixa muito feliz. "
            },
            {
                id: 6,
                date: new Date(startDate.getFullYear(), startDate.getMonth() + 5, 27),
                title: "🎉 5 MESES!",
                description: "Cinco meses de pura felicidade. Obrigado por cada sorriso, cada abraço, cada momento. Você é tudo para mim!"
            }
        ];
    }
    
    render(): void {
        this.container.innerHTML = this.events.map((event, index) => `
            <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
                <div class="timeline-date">${DateUtils.formatDate(event.date)}</div>
                <div class="timeline-content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                </div>
            </div>
        `).join('');
    }
}