/**
 * Copyright By Nobir
 * 
 * This is a Pig game that I created for learn Javascript more Logically
 * and Funny things to do well the real creator is "Jonas Schmedtmann"
 * I just created my own way in the code :D
 * 
 * Author: Nobir
 * Author URI: https://github.com/nobir
 */




/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

document.addEventListener( "DOMContentLoaded", function(){

    var scores, scoreRound, activePlayer, selectDiv, diceDOM;

    scores = [0, 0];
    scoreRound = 0;
    activePlayer = 0;
    selectDiv = [ "#score-0", "#score-1", "#current-0", "#current-1" ];
    diceDOM = querySelect( ".dice" );
    
    
    diceDOM.style.display = "none";
    
    for( var i = 0; i < selectDiv.length; i++ ){

        querySelect( selectDiv[i] ).textContent = "0";
        //console.log( selectDiv[i] );

    }
    

    /**
     * All Events
     * 
     * @param {}
     */

    querySelect( ".btn-roll" ).addEventListener( "click", rollDice );
    querySelect( ".btn-hold" ).addEventListener( "click", holdScore );
    querySelect( ".btn-new" ).addEventListener( "click", newGame );
    
    
    
    

    /**
     * all function
     * 
     * @param {}
     */

    function querySelect( arg ){
    
        return document.querySelector( arg );
    
    }

    function rollDice(){
        // Generate Ramdom Number for roll the dice
        var dice = (Math.floor( Math.random() * 6 ) + 1 );
        // console.log( dice );


        // Display the dice using ramdom number
        diceDOM.src = "img/dice-" + dice + ".png";
        diceDOM.style.display = "block";


        // Update the round score if the roll dice shows 1
        if( dice !== 1 ){

            scoreRound += dice;
            querySelect( "#current-" + activePlayer ).textContent = scoreRound;

        }else{

            nextPlayer();

        }
    }

    function holdScore(){

        // Add the scores in score var
        scores[activePlayer] += scoreRound;

        // Update the UI
        querySelect( "#score-" + activePlayer ).textContent = scores[activePlayer];

        // Check IF player won
        if( scores[activePlayer] >= 10 ){
            querySelect( "#name-" + activePlayer ).textContent = "Winner !";
        }

        nextPlayer();
    }

    function newGame(){

        window.location.reload();

    }

    function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        scoreRound = 0;

        querySelect( selectDiv[2] ).textContent = "0";
        querySelect( selectDiv[3] ).textContent = "0";

        querySelect( ".player-0-panel" ).classList.toggle( "active" );
        querySelect( ".player-1-panel" ).classList.toggle( "active" );

        setTimeout(() => {
            diceDOM.style.display = "none";
        }, 200);
    }

});
