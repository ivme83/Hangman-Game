// initialize all the variables
var puzzleWords = [""];
var gameState = [""];
var i = 0;
var currentWord = "";
var solution = [""];
var playerGuesses = [""];
var guessesLeft = 0;

// this function sets up all the variables with their starting values
initiateGame();

// main gain loop that is listening for a key press
document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;

        // allLetter is a function that checks if the input was a letter and no other key press
        // will only run the following code if the player pressed a valid key
        if(allLetter(userGuess)) {
            
            // checks if the player has already guessed this letter and if they have guesses left
            if (playerGuesses.indexOf(userGuess) === -1 && guessesLeft > 0) {

                // if the player hasn't guessed this letter yet, it is added to the array of guesses
                playerGuesses.push(userGuess);
                
                // Clears the html element that displays all of the players guesses
                document.getElementById("guessWin").innerHTML = "";
                
                // this for loop iterates through the playerGuesses array and prints all of the
                // current guesses
                for (i = 0; i < playerGuesses.length; i++){
                    document.getElementById("guessWin").innerHTML += f[i] + " | "; 
                }
               
                // checks to see if the word includes the letter that is currently being guessed
               if (currentWord.includes(userGuess)) {

                    // calls this function if the letter is in the word
                    updateSolution();
        
                } else {
                    
                    // calls this function if the letter is not in the word
                    updateLives();
                    
                }
        
            }
        }

    // this function updates the Game State (can be playing, You Lose, or You Win)
    updateGameState();
    
}

// This function is called when the Reset button is pressed
function gameButton() {
    resetGame();
}


// This function gives the variables all of their initial values
function initiateGame() {
    puzzleWords = ["happy","tree","mouse","cup","phone","computer"];
    gameState = ["playing","You Win", "You Lose"];
    // Randomly chooses a new word
    currentWord = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
    guessesLeft = 11;
    //document.getElementById("lives").innerHTML = guessesLeft;
    // these three update the screen for the lives,the blank word, and the current game state
    updateLives();
    updateSolution();
    updateGameState();
}

// this function is called when the Reset button is pressed and restarts the game
// and game variables and clears out the arrays
function resetGame() {
    currentWord = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
    guessesLeft = 11;
    updateLives();
    solution.length = 0;
    playerGuesses.length = 0;
    updateSolution();
    updateGameState();
    document.getElementById("guessWin").innerHTML = "";
}

// This is a function that chceks if the passed through argument only contains
// the letters a-z (upper or lower case) and returns true or false
function allLetter(inputtxt) {
    var input = inputtxt;

    var letters = /^[A-Za-z]+$/;

    if (input.match(letters)) {
        return true;
    } else {
        return false;
    }
}

// Changes lives only if there are any left and prints to the screen
function updateLives() {
    if (guessesLeft > 0) {
        guessesLeft--;
        document.getElementById("lives").innerHTML = "";
        document.getElementById("lives").innerHTML = guessesLeft;
    }
}

// This function does a lot with the displayed solution
function updateSolution() {

    // clears out the array
    solution.length = 0;

    // This updates the display solution with either _ or any correctly guessed letters
    // at the start of the game it will only print _ for each letter of the word
    for (i = 0; i < currentWord.length; i++) {
        if (playerGuesses.indexOf(currentWord.charAt(i)) === -1) {
            solution.push(" _ ");
        } else {
            solution.push(" " + currentWord.charAt(i) + " ");
        }
    }

    // Clears the screen to prepare for reprinting
    document.getElementById("blanks").innerHTML = "";

    //  loops through the solution array to print out the current state of the solution
    for (i=0; i < solution.length; i++) {
        document.getElementById("blanks").innerHTML += solution[i];
    }
}

// updates game state so that the player can see if they are still playing,
// they have won, or if they have lost
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