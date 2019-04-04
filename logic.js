// GLABAL VARIABLES
//-------------------------------------------------------------------------------------
// Array of word options (all lowercase)
var wordsList = 
["kapkan", 
"tachanka", 
"glaz", 
"fuze", 
"iq", 
"blitz", 
"bandit", 
"jager", 
"rook", 
"doc", 
"twitch", 
"montagne", 
"thermite", 
"pulse", 
"castle", 
"ash", 
"thatcher", 
"smoke", 
"sledge", 
"mute", 
"frost", 
"buck", 
"valkyrie", 
"blackbeard", 
"capitao", 
"caveira", 
"echo", 
"hibana", 
"jackal", 
"mira", 
"lesion", 
"ying", 
"ela", 
"zofia", 
"dokkaebi", 
"vigil", 
"finka", 
"lion", 
"alibi", 
"maestro", 
"maverick", 
"clash", 
"kaid", 
"nomad", 
"gridlock", 
"mozzie"];

// Solution will be held here
var chosenWord = "";

// This will break the solution into individual letters to be stored in an array
var lettersInChosenWord = [];

// This will be the numbwer of blanks we show based on the solution
var numBlanks = 0;

// Holds a mix of blank and solved letters (ex: a_p_le)
var blanksAndSuccesses = [];

// Holds wrong guesses
var wrongGuesses = [];


// Game counters
var winCounter = 0;
var lossCounter = 0;
var numGuesses = 0;


// FUNCTIONS
//-------------------------------------------------------------------------------------


/* It's how we will start and restart the game. It's not being run here.
    It is just being made for future use. */
function startGame() {
    // Resets guesses to specified number
    numGuesses = 9;

    document.getElementById("loss-counter").innerHTML = lossCounter;
    document.getElementById("guesses-left").innerHTML = numGuesses;
    document.getElementById("win-counter").innerHTML = winCounter;

    // Soultion is chosen randomly from wordList
    chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];

    // The word is brocken into individual letters
    lettersInChosenWord = chosenWord.split("");

    // We count the number of letters in the word
    numBlanks = lettersInChosenWord.length;
    
    // We print the solution in the console (for testing)
    console.log(`Chosen word: ${chosenWord}`);

    // CRITICAL LINE - Here we reset the guess and success array at each round
    blanksAndSuccesses = [];

    // CRITICAL LINE - Here we reset the wrong guesses from the previous round
    wrongGuesses = [];

    /* Fill up the blanksAndSuccesses list with appropriate number of blanks,
        which is based on number of letters in the solution. */
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push('_');
    }

    // Print the initial blanks in console.
    console.log(blanksAndSuccesses);

    //Reprint the guessesLeft to 9
    document.getElementById("guesses-left").innerHTML = numGuesses;

    // Print the blanks at the beginng of each round in the HTML
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(' ');

    // Clears the wrong guesses from the previous round
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(' ');
}

// It's where we will do all of the comparisons for matches
function checkLetters(letter) {
    // This boolean will be toggled based on whether or not a user letter is found
    var letterInWord = false;

    // Checks if a letter exists inside the array at all
    for (var i = 0; i < numBlanks; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }

    // If the letter exists somewhere in the word, then figure out exactly where (which index?)
    if (letterInWord) {
        // Loop through the word
        for (var x = 0; x < numBlanks; x++) {
            // Populate the blancksAndSucesses with every instance of the letter
            if (chosenWord[x] === letter) {
                // Here we set the specific space in blanks and letters equal to the letter when it matches
                blanksAndSuccesses[x] = letter;
            }
        }

        console.log(blanksAndSuccesses);
    }

    // If the letter doesn't exist at all...
    else {
        // ...then we add the letter to the list of wrong letters, and we subtract one of the guesses
        wrongGuesses.push(letter);
        numGuesses--;
    }
}

// Here we will have all of the code that needs to be run after each guess is made
function roundComplete() {
    // First, log initial status update in the console telling us how many wins, losses, and guesses left
    console.log(`Win counter: ${winCounter} | Loss counter: ${lossCounter} | Guesses: ${numGuesses}`);

    // Update the HTML to reflect the number of guesses. Also update the correct guess.
    document.getElementById("guesses-left").innerHTML = numGuesses;

    // This will print the array of guesses and blanks onto the page
    document.getElementById("word-blanks").innerHTML = blanksAndSuccesses.join(" ");

    // This will print the wrong guesses onto the page
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

    // If you got all letters to match the solution...
    if (lettersInChosenWord.toString() === blanksAndSuccesses.toString()) {
        //... add to win counter and give the user an alert
        winCounter++;
        alert("You win!");

        // Update the winCounter in the HTML and restart the game
        document.getElementById("win-counter").innerHTML = winCounter;
        
        startGame();
    }
    //if we've run out of guesses
    else if (numGuesses === 0) {
        //add to the lossCounter
        lossCounter++;

        // give user an alert
        alert("You lose");

        // Update the loss counter in HTML
        document.getElementById("loss-counter").innerHTML = lossCounter;

        //Restart the game
        startGame();

    }
}

// MAIN PROCESS (Controls actual code running)
//-------------------------------------------------------------------------------------

// Starts Game
startGame();

// Captures keys pressed
document.onkeyup = function(event) {
    // converts all key klicks to lowercase
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();

    // runs code to check correctness
    checkLetters(letterGuessed);

    // runs code after each round
    roundComplete();
}