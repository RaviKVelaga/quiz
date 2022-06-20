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

function switchPage(from, to) {
    var location = window.location.pathname;
    location = location.replace(from, to);
    window.location.assign(location);
}

var indx = 0;
var timerCount = 40;
var currentScore;
var timer;

var allScores = [];

var createEl = document.createElement("p");
createEl.setAttribute("id", "createP");



startButton.addEventListener("click", start);

function start() {
    hideDiv(quizBlock);
    displayQuestions(indx);
    startTimer();
}

function startTimer() {

    timer = setInterval(function () {
        // console.log(timerCount);

        timerElement.textContent = timerCount;
        if (timerCount === 0) {
            currentScore = timerCount;
            quizOver();
        }
        else {
            timerCount--;
        }

    }, 1000);
}

function hideDiv(selectedDiv) {
    selectedDiv.setAttribute("style", "display:none;");


}

function minusTime() {
    var penality = 10;
    timerCount = timerCount - penality;
    if (timerCount < 0) {
        timerCount = 0;
    }
}

function clearPrevQuestion() {
    questionElement.textContent = '';
    optionElement.textContent = '';
}

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
// to compare the answer with chosen option
function compare(event) {
    var element = event.target;
    createEl.textContent = '';

    if (element.matches("button")) {


        if (element.textContent == allQuestions[indx].answer) {
            createEl.textContent = "Correct!";
        }
        else {
            minusTime();
            createEl.textContent = "Wrong!";
        }

    }
    indx++;
    if (indx == allQuestions.length) {
        currentScore = timerCount;
        quizOver();


    }
    else {

        displayQuestions(indx);
    }
    line.setAttribute("style", "display:block");
    containerElement.appendChild(createEl);


}
// This is to get the details of user when quiz finished
function quizOver() {
    clearInterval(timer);
    clearPrevQuestion();

    timerElement.textContent = timerCount;

    var createHeader = document.createElement("createHeader");
    createHeader.setAttribute("class", "createHeader");
    createHeader.textContent = "QUIZ Over!"

    questionsElement.appendChild(createHeader);

    var createPara = document.createElement("createPara");
    createPara.setAttribute("class", "crecreatePara");

    questionsElement.appendChild(createPara);

    //Calculate remaining time and replace it with the score
    createP.textContent = "Your Score is : " + currentScore;

    var createLabel = document.createElement("label");
    createLabel.setAttribute("class", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsElement.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("class", "createInput");
    createInput.setAttribute("type", "text");
    createInput.textContent = "";

    questionsElement.appendChild(createInput);


    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("class", "createSubmit");
    createSubmit.setAttribute("type", "submit");
    createSubmit.textContent = "Submit";

    questionsElement.appendChild(createSubmit);


    createSubmit.addEventListener("click", function (event) {
        event.preventDefault();
        var inputVal = createInput.value;

        if (inputVal === "") {

            console.log("No Initials Entered");
        }
        else {
            var finalScore = {
                initials: inputVal,
                score: currentScore
            }

            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }

            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            switchPage("index", "highscore");

        }
    });
}





