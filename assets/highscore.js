
var highScore = document.querySelector(".scores");
var clear = document.querySelector(".clear");


//Clear the local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});


//access local storage 

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores != null) {
    var int = 1;
    allScores.forEach(function (scores) {
        var createButton = document.createElement("li");
        createButton.textContent = int + ". " + scores.initials + " - " + scores.score;
        highScore.appendChild(createButton);
        int++;
    });
}
