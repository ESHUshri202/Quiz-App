const questions = [
    {
        question: "To access properties of an object, the mouse technique to use is ?",
        answers: [
            { text: "right-clicking", correct: true},
            { text: "shift-clicking", correct: false},
            { text: "dragging", correct: false},
            { text: "dropping", correct: false}
        ]
    },
    {
        question: "The term ______ refers to any computer component that is required to perform work ?",
        answers: [
            {text:"bootstrap", correct: false},
            {text:"kernel", correct: false},
            {text:"resource", correct: true},
            {text:"source code", correct: false}
        ]
    },
    {
        question: "______ key is the example of Toggle key ?",
        answers: [
            {text:"Alt", correct: false},
            {text:"Shift", correct: false},
            {text:"Control", correct: false},
            {text:"Caps Lock", correct: true}
        ]
    },
    {
        question: "The three main parts of the processor are ______?",
        answers: [
            {text:"ALU, CU and Register", correct: true},
            {text:"ALU, CU and RAM", correct: false},
            {text:"Cache, CU and Register", correct: false},
            {text:"CU, Registers and RAM", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0 ;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
    
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        startQuiz();
    }
});

startQuiz();