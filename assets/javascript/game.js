//define global variables
var player = "Player 1";
var player1score = 0;
var player2score = 0;

//*****************************************************
//gets word from user submission and sets up game
function getWord() {
    //takes word, converts to lowercase, and puts it in a a string
    word = document.getElementById("playerWord").value;
    

    if (!word || word.length < 4 ||  word.length > 10 || !(word.match(/^[a-z]+$/))){

      alert('Please enter a word between 4 and 10 letters.');
      document.getElementById("playerWord").value = "";
    } else {

    word = word.toLowerCase();
   //creates a blank array to check for if the word is solved;
    wordCheck = [];
    lettersGuessed = [];
    missedletters = 0;
    //just a check to see if its working
    console.log(word);

    //Sets up game----code that replaces the original user word input with the other player's guess input
    if (player === "Player 1"){
       document.querySelector("#enterword").innerHTML = ('<div class="panel-heading"><h2 class="panel-title">Player 2, choose a letter to guess the word</h2></div> <div class="row panel-body"> <div class="col-sm-3"><input id="playerGuess" class="input" placeholder="?" name="playerGuess" type="text" value="" maxlength="1" /><br /><button  onclick="guessLetter()">Guess!</button></div><div id="wordbox" class="col-sm-6 col-sm-offset-2"></div></div>'); 
    } else {
    document.querySelector("#enterword").innerHTML = ('<div class="panel-heading"><h2 class="panel-title">Player 1, choose a letter to guess the word</h2></div> <div class="panel-body"> <input id="playerGuess" class="input" placeholder="?" name="playerGuess" type="text" value="" maxlength="1" /><br /><button  onclick="guessLetter()">Guess!</button></div><div id="wordbox" class="panel-footer"></div>'); 
      };

    //assigns ID's to each h4 and puts the correct number of blanks into the html for guessing
    for ( var i = 0, l = word.length; i < l; i++ ) {
            document.querySelector("#wordbox").innerHTML += ('<div class="blankletter"><h4 id="x' + i +'"></h4></div>'); 
            wordCheck.push("0");
          };
    document.getElementById("hangmanbox").style.display = "block"; 
    document.getElementById("letterbox").style.display = "block";
    document.getElementById("scoreboard").style.display = "block";  
    console.log(wordCheck);
  };
};

//*******************************************************
//gets letter guess from the user
function guessLetter() {
  //gets value of the letter guess

  guess = document.getElementById("playerGuess").value;
  //Check to see if input is valid or blank
 if (!guess || guess.length > 1 || !(guess.match(/[a-z]/i))){
      alert('Please enter a letter.');
      document.getElementById("playerGuess").value = "";
       
  } else  {
    //check to see if letter has been guessed
     letterGuessCheck();
 
    //writes letters to the Guessed Letters box
      writeLetterbox();

    //gets the first position of the letter value in the word
     pos = word.indexOf(guess);

    //check to see if the letter is in the word
 
    if (word.indexOf(guess) > -1 )  { 
          console.log(pos);
          enterLetters(); 
         } else {
          document.getElementById('audio').play();
          hangTheMan();
         };

    //function wordSolved to see if the word is solved and if anyone won and to switch players
      wordSolved(); 
  }; 
};

//check to see if letter has been guessed
function letterGuessCheck() {
  if ( lettersGuessed.indexOf(guess) > -1 )  { 
    alert("You have already guessed this letter.");
      document.getElementById("playerGuess").value = "";
      return; 
     } else { 
        lettersGuessed.push(guess);
        console.log(lettersGuessed);
     };
};

//writes letters to the Guessed Letters box
function writeLetterbox () {
  letterCount = lettersGuessed.length -1;
  document.querySelector("#letters").innerHTML += ('<span class = "margin">'+lettersGuessed[letterCount]+'</span>');
};

  //if the letter is in the word, add the letter to the html
  function enterLetters(){
  while (pos !== -1) { 
    var selector = '#x' + pos;
     document.querySelector(selector).innerHTML = ('<h4 id="' + pos +'">'+guess+'</h4>'); 
     wordCheck [pos] = "1";
  //checks for the next instance
       pos = word.indexOf(guess, pos + 1);
    };
};


//function that keeps track of how many letters have been missed
function hangTheMan (){
  missedletters = missedletters + 1;
  guessRemain = 10-missedletters;
  if (missedletters < 10) {
    //update the hangman
    document.querySelector("#hangmanimg").innerHTML = ('<img  src="assets/images/hangman'+missedletters+'.png"></img>')
    document.querySelector("#countdown").innerHTML = ('Guesses Remain: '+guessRemain);
  } else {
    alert('You lost!');
    document.querySelector("#hangmanbox").innerHTML = ('<img src="assets/images/hangman'+missedletters+'.png"></img>')
    document.querySelector("#countdown").innerHTML = ('Guesses Remain: '+guessRemain);
  }
};



function wordSolved(){
  //check to see if the word is solved
  if ( wordCheck.indexOf("0") > -1 )  { 
    document.getElementById("playerGuess").value = "";
  } else {
    document.getElementById("playerGuess").value = "";
    alert('You won!');

    if (player === "Player 1") {
      //If player 2 guessed the word, update Player 2 score
      player2score = player2score + 1;
      //update the word prompt
       document.querySelector("#enterword").innerHTML = ('<h2>Player 2, enter a word (between 4-10 letter):</h2> <input id="playerWord" class="input" placeholder="word" name="playerWord" type="text" value="" size="10" /><br /> <button onclick="getWord()">BEGIN!</button>');
      //update Player 2 scoreboard
        document.querySelector("#player2total").innerHTML = ('<h3>'+ player2score+'</h3>');
      //change player from player 1 to player 2
        player = "Player 2";
      } else if (player === "Player 2") {
      //if player 1 guessed the word, update Player 1 score
        player1score = player1score + 1;
      //update the word prompt
        document.querySelector("#enterword").innerHTML = ('<h2>Player 1, enter a word (between 4-10 letter):</h2> <input id="playerWord" class="input" placeholder="word" name="playerWord" type="text" value="" size="10" /><br /> <button onclick="getWord()">BEGIN!</button>');
      //update Player 1 scoreboard
        document.querySelector("#player1total").innerHTML = ('<h3>'+ player1score+'</h3>');
      //change player from player 2 to player 1
        player = "Player 1";
      //check to see if one player has reached 5, but only after complete rounds
        if (player1score > 4 && player1score > player2score) {
          alert('Player 1 wins!!!!!');
        } else if (player2score > 4 && player2score > player1score) {
          alert('Player 2 wins!!!!');
        } else if (player1score > 4 && player1score === player2score) {
          alert('Play another round to break the tie!');
        }
      };
  };

console.log(wordCheck);

};
    
