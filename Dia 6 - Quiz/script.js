// ------------------------ Initial data ------------------------------------
let currentQuestion = 0;
let correctAnswer = 0;

showQuestion();

// ------------------------ Events --------------------------------
document.querySelector('.scoreArea buttom').addEventListener('click', resetEvent);

// ------------------------------ functions -------------------------------
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        // barrinha de progresso
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;

        let optionsHTML = '';
        for(let i in q.options) {
            optionsHTML += `<div data-op="${i}"class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHTML;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz()
    }
}

function optionClickEvent(e) {
    let clickOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickOption) {
        correctAnswer++;
    }

    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points =Math.floor((correctAnswer/ questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scorePct').innerHTML = 'Tá ruím em ?';
        document.querySelector('.scorePct').style.color = 'ff0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scorePct').innerHTML = 'Muito bom !';
        document.querySelector('.scorePct').style.color = '#ffff00';
    } else if(points >= 70) {
        document.querySelector('.scorePct').innerHTML = 'Parabéns !';
        document.querySelector('.scorePct').style.color = '#0d630d';
    }


    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} e acertou ${correctAnswer}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswer = 0;
    currentQuestion = 0;
    showQuestion();
}