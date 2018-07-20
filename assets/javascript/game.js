// Array of options for computer to choose
var computerChoices = ["par", "birdie", "bogey", "eagle", "albatross", "ace", "bunker", "hazard", "green", "fairway", "hole", "tee", "driver", "woods", "irons", "putter"];


// Variables for number of wins, losses, guesses left, number of guesses taken

// Number of wins
var wins = 0;
// number of losses
var losses = 0;
// Remaining guesses
var guessesLeft = 0;
// Index of chosen word selected from array
var wordIndex;
// Array to store correctly guessed letters
var guessingWord = [];
// Array of letters guessed
var guessedLetters = [];
// Indicate game has started
var startGame = false;
// indicate game has ended, alert player to try again
var endGame = false;
// Tries for a player
const tries = 9;

// Reset the Game
function reset() {
    guessesLeft = tries;
    startGame = false;

    // Computer's random choice
    wordIndex = [Math.floor(Math.random() * computerChoices.length)];

    // Set arrays for start
    guessedLetters = [];
    guessingWord = [];

    // Have computer choose word 
    for (var i = 0; i < computerChoices[wordIndex].length; i++) {
        guessingWord.push("_");
    }

    // Show display
    updateDisplay();
}

function updateDisplay() {
    // this defers slightly from example

    document.getElementById("wins").innerText = "Wins: " + wins;
    document.getElementById("losses").innerText = "Losses: " + losses;
    document.getElementById("word").innerText = "";
        for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("word").innerText += guessingWord[i];
        }
    
    document.getElementById("guessesLeft").innerText = "Guesses Left: " + guessesLeft;
    document.getElementById("guessedLetters").innerText = "Letters Guessed: " + guessedLetters;
        if (guessesLeft <= 0) {
            endGame = true;
        }
}

document.onkeyup = function(event) {

    // When game is over
    if(endGame) {
        reset();
        endGame = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            userGuess(event.key.toLowerCase());
        }
    }
}

function userGuess(letter) {
    // make sure user has guesses left
    if (guessesLeft > 0) {
        if (!startGame) {
            startGame = true;
        }
        // Do not allow duplicate entries
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            checkGuess(letter);
        }

    }

    updateDisplay();
    // Check to see if user has guessed word
    win();
    if (guessesLeft <= 0) {
        lose();
    }

}

// Place checked letters in the correct guess string if guessed properly
function checkGuess(letter) {
    var stringLetters = [];

    // for loop to check in word if guesses are correct and stores the index as part of corresponding array
    for (var i = 0; i < computerChoices[wordIndex].length; i++) {
        if (computerChoices[wordIndex][i] === letter) {
            stringLetters.push(i);
        }
    }

    // If incorrect, remove a guess
    if (stringLetters.length <= 0) {
        guessesLeft--;
    }
    // If correct, replace the dash line with the correct letter
    else {
        for (var i = 0; i < stringLetters.length; i++) {
            guessingWord[stringLetters[i]] = letter;
        }
    }

}

function win() { 
    if (guessingWord.indexOf("_") === -1) {
        wins++;
        endGame = true;
        alert("Congratulations, you win!");
    }   
}

function lose() {
    if (guessingWord.indexOf("_") !== -1) {
        losses++;
        endGame = true;
        alert("Sorry, you lose. Try Again!");
    }   
}


// need to set losses to increase on loss



