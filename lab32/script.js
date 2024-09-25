const questions = [
    {
        question: "Você gosta de monstros S.A. ?",
        answers: ["SIM", "NÃO", "TALVEZ", "OQUE É ISSO?"],
        correctAnswer: 0
    },
    {
        question: "Quem é o vilão do filme?",
        answers: ["Sully", "Mike", "Boo", "Randall"],
        correctAnswer: 3
    },
    {
        question: "Qual empresa fez o filme?",
        answers: [
            "Dreamworks",
            "Blue Sky",
            "Pixar",
            "Marvel"
        ],
        correctAnswer: 2
    },
    {
        question: "Onde Mike e Sully se conheceram ?",
        answers: ["Universidade", "Trabalho", "Escola", "Outro"],
        correctAnswer: 0
    },
    {
        question: "Qual era o nome da fraternidade de Mike e Sully?",
        answers: ["Roar Omega Roar", "Slugma Slugma Kappa", "Oozma Kappa", "Jaws Theta Chis"],
        correctAnswer: 2
    },
    {
        question: "Qual o nome da diretora da Universidade Monstros?",
        answers: [
            "Hardscrabble",
            "Ross",
            "Sally",
            "Boo"
        ],
        correctAnswer: 0
    }
];
// Carrega perguntas na página
function loadQuestions() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ''; // Limpa o container antes de carregar novas perguntas
    questions.forEach((q, index) => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${q.question}</h3>`;
        q.answers.forEach((answer, i) => {
            div.innerHTML += `<label>
                <input type="radio" name="question${index}" value="${i}"> ${answer}
            </label><br>`;
        });
        questionContainer.appendChild(div);
    });
}

// Avalia as respostas fornecidas pelo usuário e exibe a correção
function submitAnswers() {
    let score = 0;
    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        const allAnswers = document.querySelectorAll(`input[name="question${index}"]`);
        
        allAnswers.forEach((input, i) => {
            const parentLabel = input.parentElement;  // O label pai do input

            // Colore a resposta correta de verde
            if (i === q.correctAnswer) {
                parentLabel.style.color = 'green';
            }

            // Se a resposta foi selecionada e está incorreta, mostra a resposta correta
            if (selectedAnswer && parseInt(selectedAnswer.value) !== q.correctAnswer && i === q.correctAnswer) {
                parentLabel.style.color = 'green';
            }
        });

        // Verifica se a resposta selecionada está correta
        if (selectedAnswer && parseInt(selectedAnswer.value) === q.correctAnswer) {
            score++;
        }
    });

    // Exibe a pontuação
    document.getElementById('result').innerHTML = `Você acertou ${score} de ${questions.length} perguntas.`;
}

// Função para reiniciar o quiz sem recarregar a página
function restartQuiz() {
    // Limpa todas as seleções feitas pelo usuário e reseta as cores dos labels
    questions.forEach((q, index) => {
        const allAnswers = document.querySelectorAll(`input[name="question${index}"]`);
        allAnswers.forEach((input) => {
            input.checked = false;  // Desmarca as respostas
            input.parentElement.style.color = '';  // Reseta a cor dos labels
        });
    });
    
    // Limpa o resultado
    document.getElementById('result').innerHTML = '';
}

window.onload = loadQuestions;

//oi