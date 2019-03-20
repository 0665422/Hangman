// GLABAL VARIABLES
//-------------------------------------------------------------------------------------
// Array of word options (all lowercase)
var wordsList = ["mira", "alibi", "dokkaebi"];

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
var lossCunter = 0;
var numGuesses = 0;


// FUNCTIONS
//-------------------------------------------------------------------------------------


/* It's how we will start and restart the game. It's not being run here.
    It is just being made for future use. */
function startGame() {
    // Resets guesses to specified number
    numGuesses = 9;

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
    document.getElementById.("word-blanks").innerHTML = blanksAndSuccesses.join(' ');

    // Clears the wrong guesses from the previous round
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(' ');
}