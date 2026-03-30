(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{static getTimeDifference(e){let t=new Date().getTime()-e.getTime(),n=Math.floor(t/1e3),r=Math.floor(n/60),i=Math.floor(r/60),a=Math.floor(i/24);return{years:Math.floor(a/365.25),months:Math.floor(a%365.25/30.44),days:Math.floor(a%30.44),hours:i%24,minutes:r%60,seconds:n%60,totalSeconds:n}}static formatDate(e){return e.toLocaleDateString(`pt-BR`,{day:`2-digit`,month:`long`,year:`numeric`})}static formatDateTime(e){return e.toLocaleDateString(`pt-BR`,{day:`2-digit`,month:`long`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})}static isDatePassed(e){return new Date>=e}},t=class{startDate;elements;intervalId=null;constructor(e){this.startDate=e,this.elements={years:document.getElementById(`years`),months:document.getElementById(`months`),days:document.getElementById(`days`),hours:document.getElementById(`hours`),minutes:document.getElementById(`minutes`),seconds:document.getElementById(`seconds`),message:document.getElementById(`timerMessage`),totalHours:document.getElementById(`totalHours`),heartbeats:document.getElementById(`heartbeats`),messages:document.getElementById(`messages`),memories:document.getElementById(`memories`)}}start(){this.update(),this.intervalId=window.setInterval(()=>this.update(),1e3)}stop(){this.intervalId&&=(clearInterval(this.intervalId),null)}update(){let t=e.getTimeDifference(this.startDate);this.elements.years.textContent=t.years.toString(),this.elements.months.textContent=t.months.toString(),this.elements.days.textContent=t.days.toString(),this.elements.hours.textContent=t.hours.toString(),this.elements.minutes.textContent=t.minutes.toString(),this.elements.seconds.textContent=t.seconds.toString();let n=Math.floor(t.totalSeconds/3600);this.elements.totalHours.textContent=n.toLocaleString();let r=Math.floor(t.totalSeconds*1.2);this.elements.heartbeats.textContent=r.toLocaleString();let i=Math.floor(t.totalSeconds/1800);if(this.elements.messages.textContent=i.toLocaleString(),t.months>=5)this.elements.message.innerHTML=`🎉 Parabéns! Completamos 5 meses juntos! 🎉<br>Que venham muitos mais meses de amor e felicidade! 💖`;else{let e=5-t.months;this.elements.message.innerHTML=`⏳ Faltam ${e} ${e===1?`mês`:`meses`} para completarmos 5 meses!<br>Cada dia ao seu lado é especial ✨`}this.adjustFontSize()}adjustFontSize(){let e=window.innerWidth<=768;document.querySelectorAll(`.timer-value`).forEach(t=>{e?t.style.fontSize=`clamp(1rem, 5vw, 1.5rem)`:t.style.fontSize=``})}},n=class{container;events;constructor(e){this.container=document.getElementById(e),this.events=this.generateEvents()}generateEvents(){let e=new Date(2025,9,27);return[{id:1,date:e,title:`🎲 O Dia que Tudo Começou`,description:`Aquela madrugada, de conselhos e clima tenso de tanta emoção. Foi o início de uma história que eu jamais poderia imaginar. Entre palavras sinceras, silêncios cheios de significado e olhares que diziam mais do que qualquer frase, algo nasceu ali sem aviso, sem plano, só aconteceu. E, de alguma forma, desde aquele momento, tudo começou a mudar.`},{id:2,date:new Date(e.getFullYear(),e.getMonth()+1,27),title:`📅 1 Mês de Namoro`,description:`Um mês. Parece pouco, mas foi muito, não muito de tempo mas muito importante pra mim e para nós. Lembro da gente comprando o presente da minha mãe, do nosso primeiro beijo, do nosso primeiro abraço. Foi um mês de descobertas e de muito amor. Lembro da gente falando sobre o Natal e ano novo no próximo mês. E também eu fui a praia, como que eu queria que você tivesse ido comigo.`},{id:3,date:new Date(e.getFullYear(),e.getMonth()+2,27),title:`💕 2 Meses - Primeira Final de Ano`,description:`Já conhecíamos os gostos um do outro, as manias, o jeito único de cada um. E também as nossas alianças, quem diria que um dia EU seria pedido em namoro e não o contrário. Fora que o poder de ler a mente um do outro tava bem mais forte ksksksksks. Também passamos o ano novo juntos, foi mágico.`},{id:4,date:new Date(e.getFullYear(),e.getMonth()+3,27),title:`🎨 3 Meses - Nosso Ritmo`,description:`Foi o mês que trocamos os presentes de Natal, 1 mês atrasado… mas foi, ksksksks. E, no fim das contas, nem era sobre a data certa, era sobre o significado por trás de cada detalhe, de cada escolha, de cada sorriso meio bobo na hora de entregar. Porque ali já não era só um presente… era carinho em forma de gesto, era a gente criando memória sem nem perceber.`},{id:5,date:new Date(e.getFullYear(),e.getMonth()+4,27),title:`🌟 4 Meses - Planos para o Futuro`,description:`Foi quando eu te dei a primeira carta feita a mão, e também o mês que montei seu PC, e ver vc feliz até hoje com ele é um negócio que me deixa muito feliz. `},{id:6,date:new Date(e.getFullYear(),e.getMonth()+5,27),title:`🎉 5 MESES!`,description:`Cinco meses de pura felicidade. Obrigado por cada sorriso, cada abraço, cada momento. Você é tudo para mim!`}]}render(){this.container.innerHTML=this.events.map((t,n)=>`
            <div class="timeline-item" style="animation-delay: ${n*.1}s">
                <div class="timeline-date">${e.formatDate(t.date)}</div>
                <div class="timeline-content">
                    <h3>${t.title}</h3>
                    <p>${t.description}</p>
                </div>
            </div>
        `).join(``)}},r=class{container;modal;images;constructor(e,t){this.container=document.getElementById(e),this.modal=document.getElementById(t),this.images=this.generateSampleImages(),this.setupModal(),window.addEventListener(`resize`,()=>this.adjustGalleryLayout())}generateSampleImages(){return[{id:1,url:`public/assets/primeiro-encontro.jpg`,caption:`Nosso primeiro "encontro" - data inesquecível`,date:new Date(2025,8,20)},{id:2,url:`public/assets/passeioshopp.jpg`,caption:`O Passeio especial - só nós dois (Junto da marcação de terriório)`,date:new Date(2025,9,25)},{id:3,url:`public/assets/tardezinha.jpg`,caption:`Dia perfeito ao seu lado - Quando passamos a tarde vendo Ordem Paranormal`,date:new Date(2025,11,4)},{id:4,url:`public/assets/minhacasa.jpg`,caption:`Nossa primeira viagem - Indo pra minha casa pela primeira vez ksksksks`,date:new Date(2025,11,7)},{id:5,url:`public/assets/desenho.jpg`,caption:`O primeiro desenho que você fez pra mim - E eu amei demais, claro`,date:new Date(2025,11,16)},{id:6,url:`public/assets/presente.jpg`,caption:`O dia que você me deu um presente surpresa - Fiquei tão feliz, foi tão fofo da sua parte`,date:new Date(2026,0,17)},{id:7,url:`public/assets/bielssauro.jpg`,caption:`Cada segundo ao seu lado é único - Vc conhecendo a minha cidade pela primeira vez(Bielssauro)`,date:new Date(2026,1,28)},{id:8,url:`public/assets/sonhopc.jpg`,caption:`Realizando seu sonho - O dia que montei seu PC e vc ficou super feliz (E eu também, claro)`,date:new Date(2026,0,31)},{id:9,url:`public/assets/5meses.jpg`,caption:`Celebrando 5 meses de muito amor - Passando raiva juntos no Mario Party, mas rindo muito no final`,date:new Date(2026,2,29)}]}adjustGalleryLayout(){let e=window.innerWidth<=480,t=this.container;e?t.style.gap=`0.5rem`:t.style.gap=`1.5rem`}setupModal(){this.modal.querySelector(`.modal-close`)?.addEventListener(`click`,()=>{this.modal.classList.remove(`active`)}),this.modal.addEventListener(`click`,e=>{e.target===this.modal&&this.modal.classList.remove(`active`)}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.modal.classList.contains(`active`)&&this.modal.classList.remove(`active`)})}render(){let t=this.getColumnsCount();this.container.style.gridTemplateColumns=`repeat(auto-fill, minmax(${t}px, 1fr))`,this.container.innerHTML=this.images.map(t=>`
            <div class="gallery-card" data-id="${t.id}">
                <img src="${t.url}" alt="${t.caption}" loading="lazy">
                <div class="gallery-overlay">
                    <p>${t.caption}</p>
                    <small>${e.formatDate(t.date)}</small>
                </div>
            </div>
        `).join(``),this.container.querySelectorAll(`.gallery-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.getAttribute(`data-id`)),n=this.images.find(e=>e.id===t);n&&this.openModal(n)})})}getColumnsCount(){let e=window.innerWidth;return e<=480?140:e<=768?160:e<=1024?200:250}openModal(t){let n=this.modal.querySelector(`.modal-body`);n&&(n.innerHTML=`
                <img src="${t.url}" alt="${t.caption}" style="width: 100%; border-radius: 15px; margin-bottom: 1rem;">
                <h3 style="font-size: clamp(1rem, 4vw, 1.3rem);">${t.caption}</h3>
                <p style="color: var(--text-secondary); font-size: clamp(0.8rem, 3vw, 0.9rem); margin-top: 0.5rem;">
                    ${e.formatDate(t.date)}
                </p>
                <p style="margin-top: 1rem; font-size: clamp(0.85rem, 3vw, 1rem);">
                    Que momento especial! Cada foto traz de volta a emoção que sentimos. 💖
                </p>
            `),this.modal.classList.add(`active`)}addImage(e){this.images.push(e),this.render()}},i=class{container;modal;capsules;onAddCallback;onDeleteCallback;constructor(e,t){this.container=document.getElementById(e),this.modal=document.getElementById(t),this.capsules=this.loadCapsules(),this.setupModal()}loadCapsules(){let t=localStorage.getItem(`timeCapsules`);if(t)return JSON.parse(t).map(t=>({...t,unlockDate:new Date(t.unlockDate),createdAt:new Date(t.createdAt),isUnlocked:e.isDatePassed(new Date(t.unlockDate))}));let n=new Date,r=[{id:1,title:`📝 Primeira promessa`,message:`Prometo te fazer sorrir todos os dias, mesmo nos mais difíceis. Você merece todo o amor do mundo! 💖`,unlockDate:new Date(2025,9,27),createdAt:n,isUnlocked:!0},{id:2,title:`🌟 Meu agradecimento`,message:`Obrigado por existir na minha vida. Você trouxe cor para meus dias e sentido para minha existência. Sou grato por cada segundo ao seu lado! 🙏. Agora deixe você seu recado e quando ele deverá ser aberto`,unlockDate:new Date(2026,2,27),createdAt:n,isUnlocked:!0},{id:3,title:`🎉 1 ano de namoro`,message:`Se você está lendo isso, significa que chegamos ao primeiro ano! Parabéns para nós! Que venham muitos mais anos de amor e cumplicidade. Te amo mais a cada dia! 🎊`,unlockDate:new Date(2026,9,27),createdAt:n,isUnlocked:!1}];return localStorage.setItem(`timeCapsules`,JSON.stringify(r)),r}saveCapsules(){localStorage.setItem(`timeCapsules`,JSON.stringify(this.capsules))}setupModal(){this.modal.querySelector(`.modal-close`)?.addEventListener(`click`,()=>{this.modal.classList.remove(`active`)}),this.modal.addEventListener(`click`,e=>{e.target===this.modal&&this.modal.classList.remove(`active`)})}render(){if(this.capsules.length===0){this.container.innerHTML=`
                <div style="text-align: center; padding: 3rem; background: var(--card-bg); border-radius: 20px;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📦</div>
                    <h3>Nenhuma cápsula do tempo ainda</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 1rem;">Clique em "Adicionar Nova Mensagem" para criar sua primeira cápsula!</p>
                    <button id="resetExampleCapsules" style="background: var(--gradient-1); border: none; padding: 0.5rem 1rem; border-radius: 8px; color: white; cursor: pointer;">
                        🔄 Restaurar Cápsulas de Exemplo
                    </button>
                </div>
            `,document.getElementById(`resetExampleCapsules`)?.addEventListener(`click`,()=>{this.resetToExamples()});return}this.container.innerHTML=this.capsules.map(t=>{let n=e.isDatePassed(t.unlockDate);return n!==t.isUnlocked&&(t.isUnlocked=n,this.saveCapsules()),`
                <div class="capsule-card ${t.isUnlocked?``:`locked`}" data-id="${t.id}">
                    <div class="capsule-date">
                        ${t.isUnlocked?`📬 Disponível`:`Disponível em: ${e.formatDate(t.unlockDate)}`}
                    </div>
                    <div class="capsule-title">${t.title}</div>
                    <div class="capsule-message">
                        ${t.isUnlocked?t.message:`Esta mensagem ainda está trancada no tempo. Volte na data marcada para desvendá-la! ⏳`}
                    </div>
                    <button class="capsule-delete-btn" data-id="${t.id}" data-title="${t.title}">
                        🗑️ Excluir
                    </button>
                </div>
            `}).join(``),this.container.querySelectorAll(`.capsule-card`).forEach(t=>{t.addEventListener(`click`,n=>{if(n.target.classList.contains(`capsule-delete-btn`))return;let r=parseInt(t.getAttribute(`data-id`)),i=this.capsules.find(e=>e.id===r);i&&i.isUnlocked?this.openCapsule(i):i&&!i.isUnlocked&&this.showToast(`Esta cápsula estará disponível em ${e.formatDate(i.unlockDate)}`,`info`)})}),this.container.querySelectorAll(`.capsule-delete-btn`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.getAttribute(`data-id`)),r=e.getAttribute(`data-title`);this.confirmDelete(n,r)})})}resetToExamples(){let e=new Date;this.capsules=[{id:1,title:`📝 Primeira promessa`,message:`Prometo te fazer sorrir todos os dias, mesmo nos mais difíceis. Você merece todo o amor do mundo! 💖`,unlockDate:new Date(2025,9,27),createdAt:e,isUnlocked:!0},{id:2,title:`🌟 Meu agradecimento`,message:`Obrigado por existir na minha vida. Você trouxe cor para meus dias e sentido para minha existência. Sou grato por cada segundo ao seu lado! 🙏. Agora deixe você seu recado e quando ele deverá ser aberto`,unlockDate:new Date(e.getFullYear(),e.getMonth()+9,e.getDate()),createdAt:e,isUnlocked:!1},{id:3,title:`🎉 1 ano de namoro`,message:`Se você está lendo isso, significa que chegamos ao primeiro ano! Parabéns para nós! Que venham muitos mais anos de amor e cumplicidade. Te amo mais a cada dia! 🎊`,unlockDate:new Date(2026,9,27),createdAt:e,isUnlocked:!1}],this.saveCapsules(),this.render(),this.showToast(`Cápsulas de exemplo restauradas com sucesso!`,`success`)}confirmDelete(e,t){let n=this.modal.querySelector(`.modal-body`);if(n){n.innerHTML=`
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h2>Excluir Cápsula</h2>
                    <p style="margin: 1rem 0;">Tem certeza que deseja excluir a cápsula <strong>"${t}"</strong>?</p>
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
            `;let r=document.getElementById(`confirmDeleteBtn`),i=document.getElementById(`cancelDeleteBtn`);r?.addEventListener(`click`,()=>{this.deleteCapsule(e),this.modal.classList.remove(`active`)}),i?.addEventListener(`click`,()=>{this.modal.classList.remove(`active`)})}this.modal.classList.add(`active`)}deleteCapsule(e){let t=this.capsules.findIndex(t=>t.id===e);t!==-1&&(this.capsules.splice(t,1),this.saveCapsules(),this.render(),this.showToast(`Cápsula excluída com sucesso!`,`success`),this.onDeleteCallback&&this.onDeleteCallback(e))}showToast(e,t=`success`){let n=document.querySelector(`.toast`);n&&n.remove();let r=document.createElement(`div`);r.className=`toast toast-${t}`;let i=`✅`,a=`#4caf50`;t===`error`?(i=`❌`,a=`#ff4757`):t===`info`&&(i=`ℹ️`,a=`#2196f3`),r.innerHTML=`
            <span>${i}</span>
            <span>${e}</span>
        `,r.style.cssText=`
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${a};
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
        `,document.body.appendChild(r),setTimeout(()=>{r.style.animation=`slideOut 0.3s ease`,setTimeout(()=>r.remove(),300)},3e3)}openCapsule(t){let n=this.modal.querySelector(`.modal-body`);n&&(n.innerHTML=`
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📦✨</div>
                    <h2>${t.title}</h2>
                    <p style="margin: 1rem 0; font-size: 1.1rem; line-height: 1.6;">${t.message}</p>
                    <hr style="margin: 1rem 0; border-color: var(--card-border);">
                    <small style="color: var(--text-secondary);">
                        Criado em: ${e.formatDate(t.createdAt)}
                    </small>
                    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center;">
                        <button id="deleteFromModalBtn" class="capsule-delete-btn" data-id="${t.id}" data-title="${t.title}" style="background: #ff4757; padding: 0.5rem 1rem; border: none; border-radius: 6px; color: white; cursor: pointer;">
                            🗑️ Excluir esta cápsula
                        </button>
                    </div>
                </div>
            `,document.getElementById(`deleteFromModalBtn`)?.addEventListener(`click`,()=>{this.modal.classList.remove(`active`),this.confirmDelete(t.id,t.title)})),this.modal.classList.add(`active`)}addCapsule(t){let n={...t,id:Date.now(),createdAt:new Date,isUnlocked:e.isDatePassed(t.unlockDate)};this.capsules.push(n),this.saveCapsules(),this.render(),this.onAddCallback&&this.onAddCallback(n),this.showToast(`Cápsula criada com sucesso!`,`success`)}onAdd(e){this.onAddCallback=e}onDelete(e){this.onDeleteCallback=e}reload(){this.capsules=this.loadCapsules(),this.render()}forceResetToNewExamples(){localStorage.removeItem(`timeCapsules`),this.capsules=this.loadCapsules(),this.render(),this.showToast(`Cápsulas resetadas com sucesso! Usando novos exemplos.`,`success`)}},a=class{container;questions;userAnswers;resultElement;constructor(e){this.container=document.getElementById(e),this.questions=this.generateQuestions(),this.userAnswers=new Map,this.resultElement=document.createElement(`div`),this.resultElement.className=`quiz-result`,this.resultElement.style.display=`none`}generateQuestions(){return[{id:1,question:`Qual foi o dia do nosso primeiro encontro? Antes de namorarmos oficialmente?`,options:[`20 de Outubro`,`27 de Outubro`,`20 de Setembro`,`25 de Setembro`],correctAnswer:2},{id:2,question:`Onde aconteceu nosso primeiro beijo?`,options:[`No shopping`,`Na calçada`,`Sua casa`,`Minha casa`],correctAnswer:1},{id:3,question:`Quem foi o primeiro a dizer 'eu te amo'?`,options:[`Você`,`Eu`,`Você pq eu deixei`,`Os Dois`],correctAnswer:2},{id:4,question:`Qual nosso programa favorito para fazer juntos?`,options:[`Assistir filmes`,`Cozinhar`,`Caminhar`,`Jogar videogame`],correctAnswer:0},{id:5,question:`Como eu te chamo de carinho?`,options:[`Mor`,`Anjinho`,`Meu bem`,`Todos os anteriores`],correctAnswer:3}]}render(){this.container.innerHTML=`
            <div class="quiz-questions">
                ${this.questions.map(e=>`
                    <div class="quiz-question" data-id="${e.id}">
                        <div class="question-text">${e.question}</div>
                        <div class="quiz-options">
                            ${e.options.map((t,n)=>`
                                <label class="quiz-option">
                                    <input type="radio" name="q${e.id}" value="${n}">
                                    <span>${t}</span>
                                </label>
                            `).join(``)}
                        </div>
                    </div>
                `).join(``)}
                <button class="btn-add-capsule" id="submitQuiz" style="margin-top: 2rem;">Ver Resultado</button>
            </div>
        `,this.questions.forEach(e=>{document.querySelectorAll(`input[name="q${e.id}"]`).forEach(t=>{t.addEventListener(`change`,t=>{let n=parseInt(t.target.value);this.userAnswers.set(e.id,n)})})}),document.getElementById(`submitQuiz`)?.addEventListener(`click`,()=>this.calculateResult()),this.container.appendChild(this.resultElement)}calculateResult(){let e=0;this.questions.forEach(t=>{this.userAnswers.get(t.id)===t.correctAnswer&&e++});let t=e/this.questions.length*100,n=``,r=``;t===100?(n=`Perfeito! Você conhece nossa história como ninguém! 💖`,r=`🏆`):t>=80?(n=`Quase lá! Você lembra da maioria dos momentos especiais! 🌟`,r=`⭐`):t>=60?(n=`Bom! Vamos criar ainda mais memórias juntos! 💕`,r=`💪`):(n=`Que tal relembrarmos juntos cada momento especial? Vamos criar novas memórias! 🥰`,r=`🤗`),this.resultElement.style.display=`block`,this.resultElement.innerHTML=`
            <div style="font-size: 3rem;">${r}</div>
            <h3>Você acertou ${e} de ${this.questions.length} perguntas!</h3>
            <p>${n}</p>
            <button class="btn-add-capsule" id="retryQuiz" style="margin-top: 1rem; background: var(--accent-primary);">
                Tentar Novamente
            </button>
        `,document.getElementById(`retryQuiz`)?.addEventListener(`click`,()=>{this.userAnswers.clear(),this.resultElement.style.display=`none`,this.render()})}},o=class{canvas;ctx;particles;animationId=null;constructor(e){this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext(`2d`),this.particles=[],this.init()}init(){this.resizeCanvas(),window.addEventListener(`resize`,()=>this.resizeCanvas()),this.createParticles(),this.animate()}resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}createParticles(){let e=Math.min(100,Math.floor(window.innerWidth/15));for(let t=0;t<e;t++)this.particles.push({x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,size:Math.random()*3+1,speedX:(Math.random()-.5)*.5,speedY:(Math.random()-.5)*.5,color:`hsl(${Math.random()*60+340}, 70%, 60%)`,opacity:Math.random()*.5+.2})}animate(){this.ctx&&(this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(e=>{e.x+=e.speedX,e.y+=e.speedY,e.x<0&&(e.x=this.canvas.width),e.x>this.canvas.width&&(e.x=0),e.y<0&&(e.y=this.canvas.height),e.y>this.canvas.height&&(e.y=0),this.ctx.beginPath(),this.ctx.arc(e.x,e.y,e.size,0,Math.PI*2),this.ctx.fillStyle=e.color,this.ctx.globalAlpha=e.opacity,this.ctx.fill()}),this.animationId=requestAnimationFrame(()=>this.animate()))}stop(){this.animationId&&=(cancelAnimationFrame(this.animationId),null)}},s=new Date(2025,9,27,3,30,0),c=null;document.addEventListener(`DOMContentLoaded`,()=>{new o(`particles-canvas`);let e=new t(s),_=new n(`timelineContainer`),v=new r(`galleryGrid`,`modal`);c=new i(`capsuleContainer`,`modal`);let y=new a(`quizContainer`);e.start(),_.render(),v.render(),c.render(),y.render(),l(),u(),d(),f(),p(s),m(),h(),window.addEventListener(`resize`,()=>{g()})});function l(){let e=document.querySelectorAll(`.nav-link`),t=document.querySelectorAll(`.section`);e.forEach(n=>{n.addEventListener(`click`,()=>{let r=n.getAttribute(`data-section`);e.forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`),t.forEach(e=>{e.classList.remove(`active`),e.id===r&&(e.classList.add(`active`),window.scrollTo({top:0,behavior:`smooth`}))})})})}function u(){let e=document.getElementById(`themeToggle`),t=localStorage.getItem(`theme`)||`dark`;document.documentElement.setAttribute(`data-theme`,t),e?.addEventListener(`click`,()=>{let e=document.documentElement.getAttribute(`data-theme`)===`dark`?`light`:`dark`;document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`theme`,e)})}function d(){let e=document.getElementById(`addCapsuleBtn`),t=document.getElementById(`modal`);e?.addEventListener(`click`,()=>{let e=t?.querySelector(`.modal-body`);e&&(e.innerHTML=`
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
            `,document.getElementById(`capsuleForm`)?.addEventListener(`submit`,e=>{e.preventDefault();let n=document.getElementById(`capsuleTitle`).value,r=document.getElementById(`capsuleMessage`).value,i=document.getElementById(`capsuleDate`).value;n&&r&&i&&c&&(c.addCapsule({title:n,message:r,unlockDate:new Date(i)}),t?.classList.remove(`active`),_(`✨ Cápsula do tempo criada com sucesso! ✨`,`success`))})),t?.classList.add(`active`)})}function f(){let e=document.getElementById(`memories`);if(e){let t=156;e.textContent=t.toLocaleString(),setInterval(()=>{t<365&&(t+=Math.floor(Math.random()*3),e.textContent=t.toLocaleString())},8e3)}}function p(e){let t=new Date;(t.getFullYear()-e.getFullYear())*12+(t.getMonth()-e.getMonth())>=5&&!localStorage.getItem(`confettiShown`)&&(localStorage.setItem(`confettiShown`,`true`),setTimeout(()=>{_(`🎉 PARABÉNS! 5 MESES DE NAMORO! 🎉`,`success`)},1e3))}function m(){let e=document.querySelector(`.navbar`);window.innerWidth<=768?e?.classList.add(`mobile`):e?.classList.remove(`mobile`),window.addEventListener(`resize`,()=>{window.innerWidth<=768?e?.classList.add(`mobile`):e?.classList.remove(`mobile`)})}function h(){let e=0,t=0;document.addEventListener(`touchstart`,t=>{e=t.changedTouches[0].screenX}),document.addEventListener(`touchend`,e=>{t=e.changedTouches[0].screenX,n()});function n(){let n=t-e;if(Math.abs(n)<50)return;let r=[`home`,`timeline`,`gallery`,`capsule`,`quiz`],i=document.querySelector(`.section.active`)?.id,a=r.indexOf(i||`home`);if(n>0&&a>0){let e=r[a-1];document.querySelector(`[data-section="${e}"]`)?.click()}else if(n<0&&a<r.length-1){let e=r[a+1];document.querySelector(`[data-section="${e}"]`)?.click()}}}function g(){setTimeout(()=>{window.dispatchEvent(new Event(`resize`))},100)}function _(e,t=`success`){let n=document.querySelector(`.toast`);n&&n.remove();let r=document.createElement(`div`);r.className=`toast toast-${t}`;let i=`✅`,a=`#4caf50`;t===`error`?(i=`❌`,a=`#ff4757`):t===`info`&&(i=`ℹ️`,a=`#2196f3`),r.innerHTML=`${i} ${e}`,r.style.cssText=`
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${a};
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
    `,document.body.appendChild(r),setTimeout(()=>r.remove(),2e3)}c&&(window.timeCapsule=c);
//# sourceMappingURL=index-BXN9uz5j.js.map