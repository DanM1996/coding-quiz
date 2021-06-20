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
var scoreDisplay = document.getElementById("points-display");
var initialInput = document.getElementById("add-initial");
var verifyInitials = document.getElementById("message");
var addScore = document.getElementById("score-submit");
var highscoreList = document.getElementById("scoreboard-list");
var highscoreListContainer = document.querySelector(".scoreboard-list");
var scoreList = document.getElementById("score-list");

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
        question: "The text run between the parenthesis () of a function is called a _________",
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
var timeRemaining = 50;
var timer;

function generateQuestions() {
    if (index === finalQuestion) {
        gameEnd();
    } else {
    
    var activeQuestion = quizQuestions[index];
    questionText.innerHTML = "<p>" + activeQuestion.question + "<p>";
    button1.innerHTML = activeQuestion.answerA;
    button2.innerHTML = activeQuestion.answerB;
    button3.innerHTML = activeQuestion.answerC;
    button4.innerHTML = activeQuestion.answerD;
    }
};
var startQuiz = function() {
    startQuizPage.style.display = "none";
    
    generateQuestions();
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
        alert("Correct!")
        generateQuestions();
    }
    else {
        index++
        alert("Incorrect!")
        timeRemaining = timeRemaining - 7;
        generateQuestions();
        
    }
}
function displayMessage(type, message) {
    verifyInitials.textContent = message;
    verifyInitials.setAttribute('class', type);
}
function gameEnd(){
    restartForm.style.display = "flex";
    quizForm.style.display = "none";
    highscoreListContainer.style.display = "none";
    score = timeRemaining;
    scoreDisplay.textContent = "Your final score is " + score;
    timeRemaining = 0;  
}

addScore.addEventListener('click', function highscore() {
    //Stops this button from refreshing the page
    event.preventDefault();

    if (initialInput.value === "") {
        alert("Enter your intials to register a highscore")
        
    }
    else {
        var savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];
        var user = initialInput.value.trim();
        var currentScore = {
            name: user,
            score: score,
        };

        restartForm.style.dispaly = "none";
        quizForm.style.display = "none";
        highscoreListContainer.style.display = "flex";


        savedScores.push(currentScore);
        localStorage.setItem("savedScores", JSON.stringify(savedScores));
        renderScoreBoard();
    }
}); 

function renderScoreBoard() {
    initialInput.innerHTML = "";
    scoreList.innerHTML = "";
    var highscoreList = JSON.parse(localStorage.getItem("savedScores")) || [];

    for (i=0; i<highscoreList.length; i++) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent =  highscoreList[i].name + ":  " + highscoreList[i].score;
        scoreList.appendChild(scoreItem);
    }
    restartForm.style.display = "none";
    startQuizPage.style.display = "none";
    highscoreListContainer.style.display = "block";
}
var restart = function(){
    restartForm.style.display = "none";
    startQuizPage.style.display = "block";
    highscoreListContainer.style.display = "none";
    index = 0;
    timeRemaining = 50;
}
 function clearBoard() {
    localStorage.clear();
    scoreList.textContent = "";
 }   
startButton.addEventListener("click", startQuiz); 