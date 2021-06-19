// DOM variables

var startButton = document.getElementById("btn-start");
var countdownEl = document.getElementById("countdown");
var startQuizPage = document.getElementById("quiz-start");
var button1 = document.getElementById("button-A");
var button2 = document.getElementById("button-B");
var button3 = document.getElementById("button-C");
var button4 = document.getElementById("button-D");
var questionText = document.getElementById("question-text");
var quizForm = document.getElementById("quiz");
var restartForm = document.getElementById("final-score")
var answerValidationEl = document.getElementById("asnwer-validation");
// Question array
var quizQuestions = [{
        question: "Functions are used to _______",
        answerA: "Convert strings into numbers",
        answerB: "Display an alert message",
        answerC: "Perform an action",
        answerD: "Style elements",
        correctAnswer: "c"
    },
    {
        question: "CSS stands for:",
        answerA: "Computer System Storage",
        answerB: "Cascading Style Sheets",
        answerC: "Competitive Style Sheets",
        answerD: "Cascading Short Styles",
        correctAnswer: "b"
    },
    {
        question: "Which of the following is NOT a falsey value?",
        answerA: "false",
        answerB: "null",
        answerC: "0",
        answerD: "'false'",
        correctAnswer: "d"
    },
    {
        question: "The text run between the parenthesis () of a function is called a ___",
        answerA: "Method",
        answerB: "Object",
        answerC: "Variable",
        answerD: "Parameter",
        correctAnswer: "d"
    },
    {
        question: "The platform commonly used to host repositories and websites is",
        answerA: "Github",
        answerB: "Stack Overflow",
        answerC: "Bing",
        answerD: "Wordpress",
        correctAnswer: "a"
    }
];

// variables after object array so they can take the value of the object
var finalQuestion = quizQuestions.length;
var index = 0;
var score = 0;
var timeRemaining = 60;
var timer;

function generateQuestions() {
    if (index === finalQuestion); {
        console.log("broken");
        // restart();
    }
    // console.log(finalQuestion);
    // console.log(index);
    // alert("Game Over!");
    var activeQuestion = quizQuestions[index];
    questionText.innerHTML = "<p>" + activeQuestion.question + "<p>";
    button1.innerHTML = activeQuestion.answerA;
    button2.innerHTML = activeQuestion.answerB;
    button3.innerHTML = activeQuestion.answerC;
    button4.innerHTML = activeQuestion.answerD;
    // currentQuestion++;
};
var startQuiz = function() {
    startQuizPage.style.display = "none";
    
    generateQuestions();

    var timeRemaining = 60;
    var timer = setInterval(function(){
        if (timeRemaining > 0) {
            countdownEl.textContent = "Time Remaining: " + timeRemaining;
            timeRemaining--;
        }
        else {
            countdownEl.textContent = "";
            clearInterval(timer);
        }
    }, 1000);
    quizForm.style.display = "block";
}

var answerCheck = function(answer) {
    var rightAnswer = quizQuestions[index].correctAnswer
    if (rightAnswer === answer){
        index++;
        // answerValidationEl.textContent = "Correct!"
        generateQuestions();
    }
    else {
        index++
        alert("Incorrect!")
        generateQuestions();
    }
}
function gameEnd(){
    restartForm.style.display = "flex";
    quizForm.style.display = "none";
}
    

startButton.addEventListener("click", startQuiz); 