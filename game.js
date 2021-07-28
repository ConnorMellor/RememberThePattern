var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var levelNumber = 0;

//function to randomly select the next colour in the sequence
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + levelNumber);
  levelNumber++;



  //Test logs
  // console.log(randomNumber);
  // console.log(randomChosenColour);
  // console.log(gamePattern);
}

//Handle the user click for each colour
$(".btn").click(function() {
  var userChosenColour = ($(this).attr("id"));
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  //Test Logs
  // console.log(userChosenColour);
  // console.log(userClickedPattern);

});

//Play Audio of selected colour, on click and on randomly generated sequence
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

$(document).keydown(function(){
  if (gameStarted === false) {
    nextSequence();
    gameStarted = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver() {
  levelNumber = 0;
  gameStarted = false;
  gamePattern = [];
}
