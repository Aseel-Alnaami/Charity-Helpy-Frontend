const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: 0
    },
    {
        question: "Which language is used for web development?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correct: 3
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Marie Curie"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.textContent = currentQuestion.options[index];
        option.disabled = false;
        option.style.backgroundColor = '#007bff';
    });
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('result').textContent = '';
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    if (selectedOption === currentQuestion.correct) {
        score++;
        options[selectedOption].style.backgroundColor = '#28a745';
    } else {
        options[selectedOption].style.backgroundColor = '#dc3545';
        options[currentQuestion.correct].style.backgroundColor = '#28a745';
    }
    options.forEach(option => option.disabled = true);
    document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        document.getElementById('question').textContent = 'Quiz Completed!';
        document.querySelector('.options-container').style.display = 'none';
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('result').textContent = `Your score is ${score} out of ${quizData.length}`;
    }
}

window.onload = loadQuestion;
