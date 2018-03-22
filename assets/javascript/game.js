var game = {
    // Initialize variables here
    userGuess: "",
    puzzleWords: [""],
    gameState: [""],
    currentWord: "hello",
    guessesLeft: 0,
    livesID: "",
    solutionID: "",
    stateID: "",
    solution: [""],
    guesID: [""],
    playerGuesses: [""],

    // Insert Methods here
    initializeGame: function() {
        
        this.puzzleWords = ["happy","tree","mouse","cup","phone","computer"];
        this.gameState = ["playing","You Win", "You Lose"];
        this.currentWord = this.puzzleWords[Math.floor(Math.random() * this.puzzleWords.length)];
        this.guessesLeft = 11;
        this.livesID = "lives";
        this.solutionID = "blanks";
        this.stateID = "game-state";
        this.guessID = "guessWin";
        
        this.updateLives();
        this.updateSolution();
        this.updateGameState();
    },

    gameButton: function() {
        this.resetGame();
    },

    resetGame: function() {
        this.currentWord = this.puzzleWords[Math.floor(Math.random() * this.puzzleWords.length)];
        this.guessesLeft = 11;
        this.updateLives();
        this.solution.length = 0;
        this.playerGuesses.length = 0;
        this.updateSolution();
        this.updateGameState();
        document.getElementById(this.guessID).innerHTML = "";
    },

    updateLives: function() {
        if (this.guessesLeft > 0) {
            this.guessesLeft--;
            document.getElementById(this.livesID).innerHTML = "";
            document.getElementById(this.livesID).innerHTML = this.guessesLeft;
        }
    },
     

    updateSolution: function() {
        
        // clears out the array
        this.solution.length = 0;
        
        // This updates the display solution with either _ or any correctly guessed letters
        // at the start of the game it will only print _ for each letter of the word
        for (var i = 0; i < this.currentWord.length; i++) {
            if (this.playerGuesses.indexOf(this.currentWord.charAt(i)) === -1) {
                this.solution.push(" _ ");
            } else {
                this.solution.push(" " + this.currentWord.charAt(i) + " ");
            }
        }   
        
        // Clears the screen to prepare for reprinting
        document.getElementById(this.solutionID).innerHTML = "";
        
        //  loops through the solution array to print out the current state of the solution
        for (i=0; i < this.solution.length; i++) {
            document.getElementById(this.solutionID).innerHTML += this.solution[i];
        }
    },

    updateGameState: function() {
        if (this.solution.indexOf(" _ ") === -1) {
            document.getElementById(this.stateID).innerHTML = this.gameState[1];
            this.guessesLeft = 0;
        } else if (this.guessesLeft < 1) {
            document.getElementById(this.stateID).innerHTML = this.gameState[2];
        } else if (this.guessesLeft > 0 && this.guessesLeft < 11) {
            document.getElementById(this.stateID).innerHTML = this.gameState[0];
        }
    },

    getPress: function (newPr) {

        // Validate input
        if(this.allLetter(newPr)) {
            this.userGuess = newPr;
            this.mainGameLogic();
        }
    },

    allLetter: function(inputtxt) {
        var input = inputtxt;

        var letters = /^[A-Za-z]+$/;
    
        if (input.match(letters)) {
            return true;
        } else {
            return false;
        }
    },

    mainGameLogic: function() {
        if (this.playerGuesses.indexOf(this.userGuess) === -1 && this.guessesLeft > 0) {

            // if the player hasn't guessed this letter yet, it is added to the array of guesses
            this.playerGuesses.push(this.userGuess);
            
            // Clears the html element that displays all of the players guesses
            document.getElementById(this.guessID).innerHTML = "";
            
            // this for loop iterates through the playerGuesses array and prints all of the
            // current guesses
            for (i = 0; i < this.playerGuesses.length; i++){
                document.getElementById(this.guessID).innerHTML += this.playerGuesses[i] + " | "; 
            }
           
            // checks to see if the word includes the letter that is currently being guessed
           if (this.currentWord.includes(this.userGuess)) {

                // calls this function if the letter is in the word
                this.updateSolution();
    
            } else {
                
                // calls this function if the letter is not in the word
                this.updateLives();
                
            }
        }
        this.updateGameState();      
    }
}

game.initializeGame();

document.onkeyup = function(event) {
    // Determines which key was pressed.
    var newPress = event.key;
    
   game.getPress(newPress);

}