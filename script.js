
const buttons= document.querySelectorAll("button");
const declaration= document.querySelector("#scoreInfo");
const roundResult= document.querySelector("#scoreMessage");
const finalResult= document.querySelector(".final-result");
const restart= document.querySelector(".restart");
const playerScore= document.querySelector("#player-score");
const computerScore= document.querySelector("#computer-score");
const playerSign= document.querySelector("#playerSign");
const computerSign= document.querySelector("#computerSign");


let playerWins=0, computerWins=0;
let gameOver= false;


function getComputerChoice(){
    const choices= ["rock","paper","scissors"];
    const random= Math.floor( Math.random()*choices.length );
    return choices[random];
}


//each game round
function playRound(playerSelection,computerSelection){
    if(playerSelection===computerSelection){
            declaration.innerText= "Round Draw :)";
            roundResult.innerText= `${playerSelection.toUpperCase()} ties with ${computerSelection.toUpperCase()}`;
            return "draw";
    }
    else if((playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper') ||
        (playerSelection === 'paper' && computerSelection === 'rock')){
            declaration.innerText= "You Win ✓";
            roundResult.innerText= `${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}`;
            return "win";
    }
    else if((computerSelection === 'rock' && playerSelection === 'scissors') ||
        (computerSelection === 'scissors' && playerSelection === 'paper') ||
        (computerSelection === 'paper' && playerSelection === 'rock')){
            declaration.innerText= "You Lose ✘";
            roundResult.innerText= `${playerSelection.toUpperCase()} is beaten by ${computerSelection.toUpperCase()}`;
            return "loss";
      }
}


//when the game has ended
function endGame(){
    gameOver=true; //change value to end the game
    if (playerWins > computerWins){
        finalResult.innerText = `YOU WON BY : ${playerWins} - ${computerWins}`;
        finalResult.style.color= 'green';
    }
    else if (playerWins < computerWins){
        finalResult.innerText = `YOU LOST BY : ${playerWins} - ${computerWins}`;
        finalResult.style.color= 'red';
    }
        
}


//when game has been restarted by user using restart button
function restartGame(){
    gameOver=false;
    playerWins=0, computerWins=0, drawCount=0;
    finalResult.innerText="";
    playerScore.innerText="You: 0", computerScore.innerText="Computer: 0";
    declaration.innerText="Choose your weapon";
    roundResult.innerText="First to score 5 points wins the game...";
    playerSign.innerText="❔";
    computerSign.innerText="❔";

    buttons.forEach( (button) => {
        button.disabled = false;  //eventHandlers of all buttons get activated again
    })
}


//everytime any one of the buttons is clicked, a round is played
buttons.forEach( (button) => {
    button.addEventListener("click", () => {
        if(gameOver)
            return;   //don't handle any more clicks when gameover is true (i.e. game is finished)
           
        let playerInput= button.getAttribute("class");
        let computerSelection= getComputerChoice();
        let result= playRound(playerInput,computerSelection);
        updateChoices(playerInput,computerSelection);

        if(result=="win")
            playerWins++;
        else if(result=="loss")
            computerWins++;
        playerScore.innerText= `You: ${playerWins}`;
        computerScore.innerText= `Computer: ${computerWins}`;

        if(playerWins>=5 || computerWins>=5)
            endGame();
    })
})


restart.addEventListener("click", () => {
    restartGame();
})


function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
      case 'rock':
        playerSign.textContent = '✊'
        break
      case 'paper':
        playerSign.textContent = '✋'
        break
      case 'scissors':
        playerSign.textContent = '✌'
        break
    }
  
    switch (computerSelection) {
      case 'rock':
        computerSign.textContent = '✊'
        break
      case 'paper':
        computerSign.textContent = '✋'
        break
      case 'scissors':
        computerSign.textContent = '✌'
        break
    }
  }






