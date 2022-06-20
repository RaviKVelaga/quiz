var timerElement = document.querySelector(".time-count");
var startButton = document.querySelector(".start-button");
var quizBlock = document.querySelector(".quiz-start");
var questionElement = document.querySelector(".question");
var optionElement = document.querySelector(".optionsUl");
var questionsElement = document.querySelector(".questions");
var containerElement = document.querySelector(".container");
var line = document.querySelector(".hLine");





var allQuestions = [{
    question: "What keyword is used to check whether a given property is valid or not?",
    options: ["1.in", "2.is in", "3.exists", "4.lies"],
    answer: "1.in"
},
{
    question: "What does the Javascript “debugger” statement do?",
    options: ["1.It will debug all the errors in the program at runtime.",
        "2.It acts as a breakpoint in a program.",
        "3.NIt will debug error in the current statement if any.",
        "4.All of the above"],
    answer: "2.It acts as a breakpoint in a program.",
},
{
    question: "Javascript is an __________language?",
    options: ["1.Object-Oriented", "2.Object-Based", "3.Procedural", "4.None of the above"],
    answer: "1.Object-Oriented"
},
{
    question: "Which of the following keywords is used to define a variable in Javascript?",
    options: ["1.var", "2.let", "3.Both A and B", "4.None of the above"],
    answer: "3.Both A and B"
}];

// display questions
function displayQuestions(indx) {

    clearPrevQuestion();
    console.log(indx);
    questionElement.textContent = allQuestions[indx].question;

    var codeOptions = allQuestions[indx].options;
    // console.log(questionElement);
    codeOptions.forEach(function (option) {
        var buttonEl = document.createElement("button");
        buttonEl.setAttribute("style", "colour:white;display:block;margin:5px 0px;background-color: indigo;");
        buttonEl.focus();
        buttonEl.innerText = option;
        optionElement.appendChild(buttonEl);
        buttonEl.addEventListener("click", compare);
    });

}

// timer functions
function startTimer() {
    // event.preventDefault();

    timer = setInterval(function () {
        // console.log(timerCount);

        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            currentScore = timerCount;
            // clearInterval(timer);
            quizOver();
        }
        else {
            timerCount--;
        }

    }, 1000);
}

function minusTime() {
    var penality = 10;
    timerCount = timerCount - penality;
    if (timerCount < 0) {
        timerCount = 0;
    }
}

function switchPage(from, to) {
    var location = window.location.pathname;
    location = location.replace(from, to);
    window.location.assign(location);
}

function hideDiv(selectedDiv) {
    selectedDiv.setAttribute("style", "display:none;");
}