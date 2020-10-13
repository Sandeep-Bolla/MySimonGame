var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0, currentLevel = 0;
var start = true; //only if start=true next Sequence should work 



function playAudio(input) { // To play Audio
    var aud = new Audio("sounds/" + input + ".mp3");
    aud.play();
}

function nextSequence() { //To flash the Next One
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    setTimeout(() => {
        playAudio(randomChosenColor);
        $("." + randomChosenColor).fadeOut(100).fadeIn(100);
    }, 500);

};

function clickAnimation(input) { //User Click Animation

    $(input).addClass("pressed");
    setTimeout(() => {
        $(input).removeClass("pressed");
    }, 100);

}

function startOver() {
    currentLevel = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    start = true;
}

function checkAnswer() {
    if (userClickedPattern[currentLevel - 1] != gamePattern[currentLevel - 1]) { //wrong answer
        $("body").addClass("game-over");
        playAudio("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            startOver();
        }, 200);
    }
    else {
        if (currentLevel === level) {
            setTimeout(() => {
                userClickedPattern = [];
                currentLevel = 0;
                nextSequence();
            }, 1000);
        }
    }
}

$(".btn").click(function () { //When a user clicks
    userClickedPattern.push($(this).attr("id"));
    playAudio($(this).attr("id"));
    clickAnimation(this);
    currentLevel++;
    checkAnswer();
});

$(document).keypress(function (event) { //When a user presses the keyboard
    if (start) {
        nextSequence();
        start = false;
    }
    else {
        if (event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4) {
            var pressedColor = buttonColors[event.key - 1];
            userClickedPattern.push(pressedColor);
            playAudio(pressedColor);
            clickAnimation($("#" + pressedColor));
            currentLevel++;
            checkAnswer();
        }
    }
});
