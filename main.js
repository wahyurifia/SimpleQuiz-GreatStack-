const questions = [
    {
        question: "Dimana ibu kota negara indonesia?",
        answer: 
        [
            {
                text: "Depok",
                correct: false
            },{
                text: "Jakarta",
                correct: true
            },{
                text: "Tangerang",
                correct: false
            },{
                text: "Bogor",
                correct: false
            },
        ]
    },{
        question: "Siapa saya?",
        answer: 
        [
            {
                text: "Wahyu",
                correct: true
            },{
                text: "Fikhi",
                correct: false
            },{
                text: "Ari",
                correct: false
            },{
                text: "Altan",
                correct: false
            },
        ]
    },{
        question: "Wahyu Tinggal dimana?",
        answer: 
        [
            {
                text: "jakarta",
                correct: false
            },{
                text: "Bogor",
                correct: false
            },{
                text: "Tangerang",
                correct: true
            },{
                text: "Depok",
                correct: false
            },
        ]
    },{
        question: "Siapa Presiden negara indonesia?",
        answer: 
        [
            {
                text: "Prabowo",
                correct: false
            },{
                text: "Anies",
                correct: false
            },{
                text: "Ganjar",
                correct: false
            },{
                text: "Jokowi",
                correct: true
            },
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =  answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
};

function showScore() {
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
};


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else {
        showScore();
    }
};



nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else {
        startQuiz();
    }
});


startQuiz();
