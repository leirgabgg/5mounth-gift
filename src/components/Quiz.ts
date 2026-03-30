import { QuizQuestion } from '../types';

export class Quiz {
    private container: HTMLElement;
    private questions: QuizQuestion[];
    private userAnswers: Map<number, number>;
    private resultElement: HTMLElement;
    
    constructor(containerId: string) {
        this.container = document.getElementById(containerId)!;
        this.questions = this.generateQuestions();
        this.userAnswers = new Map();
        this.resultElement = document.createElement('div');
        this.resultElement.className = 'quiz-result';
        this.resultElement.style.display = 'none';
    }
    
    private generateQuestions(): QuizQuestion[] {
        // Personalize as perguntas com fatos sobre o relacionamento de vocês
        return [
            {
                id: 1,
                question: "Qual foi o dia do nosso primeiro encontro? Antes de namorarmos oficialmente?",
                options: ["20 de Outubro", "27 de Outubro", "20 de Setembro", "25 de Setembro"],
                correctAnswer: 2
            },
            {
                id: 2,
                question: "Onde aconteceu nosso primeiro beijo?",
                options: ["No shopping", "Na calçada", "Sua casa", "Minha casa"],
                correctAnswer: 1
            },
            {
                id: 3,
                question: "Quem foi o primeiro a dizer 'eu te amo'?",
                options: ["Você", "Eu", "Você pq eu deixei", "Os Dois"],
                correctAnswer: 2
            },
            {
                id: 4,
                question: "Qual nosso programa favorito para fazer juntos?",
                options: ["Assistir filmes", "Cozinhar", "Caminhar", "Jogar videogame"],
                correctAnswer: 0
            },
            {
                id: 5,
                question: "Como eu te chamo de carinho?",
                options: ["Mor", "Anjinho", "Meu bem", "Todos os anteriores"],
                correctAnswer: 3
            }
        ];
    }
    
    render(): void {
        this.container.innerHTML = `
            <div class="quiz-questions">
                ${this.questions.map(q => `
                    <div class="quiz-question" data-id="${q.id}">
                        <div class="question-text">${q.question}</div>
                        <div class="quiz-options">
                            ${q.options.map((opt, idx) => `
                                <label class="quiz-option">
                                    <input type="radio" name="q${q.id}" value="${idx}">
                                    <span>${opt}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                <button class="btn-add-capsule" id="submitQuiz" style="margin-top: 2rem;">Ver Resultado</button>
            </div>
        `;
        
        // Adiciona evento para os radio buttons
        this.questions.forEach(q => {
            const radios = document.querySelectorAll(`input[name="q${q.id}"]`);
            radios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const value = parseInt((e.target as HTMLInputElement).value);
                    this.userAnswers.set(q.id, value);
                });
            });
        });
        
        const submitBtn = document.getElementById('submitQuiz');
        submitBtn?.addEventListener('click', () => this.calculateResult());
        
        this.container.appendChild(this.resultElement);
    }
    
    private calculateResult(): void {
        let correctCount = 0;
        
        this.questions.forEach(q => {
            const answer = this.userAnswers.get(q.id);
            if (answer === q.correctAnswer) {
                correctCount++;
            }
        });
        
        const percentage = (correctCount / this.questions.length) * 100;
        let message = '';
        let emoji = '';
        
        if (percentage === 100) {
            message = 'Perfeito! Você conhece nossa história como ninguém! 💖';
            emoji = '🏆';
        } else if (percentage >= 80) {
            message = 'Quase lá! Você lembra da maioria dos momentos especiais! 🌟';
            emoji = '⭐';
        } else if (percentage >= 60) {
            message = 'Bom! Vamos criar ainda mais memórias juntos! 💕';
            emoji = '💪';
        } else {
            message = 'Que tal relembrarmos juntos cada momento especial? Vamos criar novas memórias! 🥰';
            emoji = '🤗';
        }
        
        this.resultElement.style.display = 'block';
        this.resultElement.innerHTML = `
            <div style="font-size: 3rem;">${emoji}</div>
            <h3>Você acertou ${correctCount} de ${this.questions.length} perguntas!</h3>
            <p>${message}</p>
            <button class="btn-add-capsule" id="retryQuiz" style="margin-top: 1rem; background: var(--accent-primary);">
                Tentar Novamente
            </button>
        `;
        
        const retryBtn = document.getElementById('retryQuiz');
        retryBtn?.addEventListener('click', () => {
            this.userAnswers.clear();
            this.resultElement.style.display = 'none';
            this.render();
        });
    }
}