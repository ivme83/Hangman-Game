var puzzleWords = [""];
var gameState = [""];
var i = 0;
var currentWord = "";
var solution = [""];
var playerGuesses = [""];
var guessesLeft = 0;

initiateGame();

document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;

        if(allLetter(userGuess)) {
            if (playerGuesses.indexOf(userGuess) === -1 && guessesLeft > 0) {
                playerGuesses.push(userGuess);
        
                document.getElementById("guessWin").innerHTML = "";
        
                for (i = 0; i < playerGuesses.length; i++){
                    document.getElementById("guessWin").innerHTML += playerGuesses[i] + " | "; 
                }
                
               if (currentWord.includes(userGuess)) {
        
                    updateSolution();
        
                } else {
        
                    updateLives();
                    
                }
        
            }
        }

    updateGameState();
    
}

function initiateGame() {
    puzzleWords = ["happy","tree","mouse","cup","phone","computer"];
    gameState = ["playing","You Win", "You Lose"];
    currentWord = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
    guessesLeft = 10;
    document.getElementById("lives").innerHTML = guessesLeft;
    updateSolution();
    updateGameState();
}

function allLetter(inputtxt) {
    var input = inputtxt;

    var letters = /^[A-Za-z]+$/;

    if (input.match(letters)) {
        return true;
    } else {
        return false;
    }
}


function updateLives() {
    if (guessesLeft > 0) {
        guessesLeft--;
        document.getElementById("lives").innerHTML = "";
        document.getElementById("lives").innerHTML = guessesLeft;
    }
}

function updateSolution() {

    solution.length = 0;

    for (i = 0; i < currentWord.length; i++) {
        if (playerGuesses.indexOf(currentWord.charAt(i)) === -1) {
    
            solution.push(" _ ");
        } else {
            solution.push(" " + currentWord.charAt(i) + " ");
        }
    }

    document.getElementById("blanks").innerHTML = "";

    for (i=0; i < solution.length; i++) {
        document.getElementById("blanks").innerHTML += solution[i];
    }
}

function updateGameState() {

    if (solution.indexOf(" _ ") === -1) {
        document.getElementById("game-state").innerHTML = gameState[1];
        guessesLeft = 0;
    } else if (guessesLeft < 1) {
        document.getElementById("game-state").innerHTML = gameState[2];
    } else if (guessesLeft > 0 && guessesLeft < 11) {
        document.getElementById("game-state").innerHTML = gameState[0];
    }
}
