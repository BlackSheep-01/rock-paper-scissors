
const buttons= document.querySelectorAll("button");
const roundResult= document.querySelector(".each-round");
const finalResult= document.querySelector(".final-result");
const restart= document.querySelector(".restart");
const playerScore= document.querySelector("#player-score");
const computerScore= document.querySelector("#computer-score");

let playerWins=0, computerWins=0;
let gameOver= false;
let drawCount=0;


function getComputerChoice(){
    const choices= ["rock","paper","scissors"];
    const random= Math.floor( Math.random()*choices.length );
    return choices[random];
}


//play & return result of each round
function playRound(playerSelection,computerSelection){
    if(playerSelection==="rock" && computerSelection==="paper"){
        roundResult.innerText= "You Lose!!, Paper beats Rock....";
        return "loss";
    }   
    else if(playerSelection==="rock" && computerSelection==="scissors"){
        roundResult.innerText= "You Win!!, Rock beats Scissors....";
        return "win";
    }   
    else if(playerSelection==="paper" && computerSelection==="scissors"){
        roundResult.innerText= "You Lose!!, Scissors beats Paper....";
        return "loss";
    }    
    else{
        drawCount++;
        if(drawCount<=1)
            roundResult.innerText= "Round Draw :)";
        else
            roundResult.innerText= `${drawCount} Rounds Draw :)`;
        return "draw";
    }
}


//when the game has ended
function endGame(){
    gameOver=true; //change value to end the game
    if (playerWins > computerWins){
        finalResult.innerText = `YOU WON BY : ${playerWins} - ${computerWins}. Good Game.`;
        finalResult.style.color= 'green';
    }
    else if (playerWins < computerWins){
        finalResult.innerText = `YOU LOST BY : ${playerWins} - ${computerWins}. Loser lol.`;
        finalResult.style.color= 'red';
    }
        
}


//when game has been restarted by user using restart button
function restartGame(){
    gameOver=false;
    playerWins=0, computerWins=0, drawCount=0;
    roundResult.innerText="", finalResult.innerText="";
    playerScore.innerText="Your Score: ?", computerScore.innerText="Computer Score: ?";

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

        if(result=="win")
            playerWins++;
        else if(result=="loss")
            computerWins++;
        playerScore.innerText= `Your Score: ${playerWins}`;
        computerScore.innerText= `Computer Score: ${computerWins}`;

        if(playerWins>=5 || computerWins>=5)
            endGame();
    })
})


restart.addEventListener("click", () => {
    restartGame();
})









