var puzzleWords = ["happy","tree","mouse","cup","phone","computer"];
var gameState = ["playing","You Win", "You Lose"];
var i = 0;
var currentWord = puzzleWords[Math.floor(Math.random() * puzzleWords.length)];
var solution = [""];
var playerGuesses = [""];
var guessesLeft = 10;

document.getElementById("game-state").innerHTML = gameState[0];

solution.length = 0;
for (i=0; i < currentWord.length; i++) {
    solution.push(" _ ");
}

for (i=0; i < solution.length; i++) {
    document.getElementById("blanks").innerHTML += solution[i];
}

document.getElementById("lives").innerHTML = guessesLeft;

document.onkeyup = function(event) {

    // Determines which key was pressed.
    var userGuess = event.key;

    if (playerGuesses.indexOf(userGuess) === -1 && guessesLeft > 0) {
        playerGuesses.push(userGuess);

        document.getElementById("guessWin").innerHTML = "";

        for (i = 0; i < playerGuesses.length; i++){
            document.getElementById("guessWin").innerHTML += playerGuesses[i] + " | "; 
        }
        
        if (currentWord.includes(userGuess)) {

            solution.length = 0;

            for (i = 0; i < currentWord.length; i++) {
                if (playerGuesses.indexOf(currentWord.charAt(i)) === -1) {

                    solution.push(" _ ");
                } else {
                    solution.push(currentWord.charAt(i));
                }
            }

            document.getElementById("blanks").innerHTML = "";
            for (i=0; i < solution.length; i++) {
                document.getElementById("blanks").innerHTML += solution[i];
            }

        } else {
            if (guessesLeft > 0) {
                guessesLeft--;
                document.getElementById("lives").innerHTML = "";
                document.getElementById("lives").innerHTML = guessesLeft;
            }
        }

    }

    if (guessesLeft < 1) {
        document.getElementById("game-state").innerHTML = gameState[2];
    }
    

}