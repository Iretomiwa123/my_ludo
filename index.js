'use strict';

//Selecting Element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const score2El = document.querySelector('#score--2');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const current2El = document.getElementById('current--2');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
    scores = [0, 0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
  
    score0El.textContent = 0;
    score1El.textContent = 0;
    score2El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    current2El.textContent = 0;
  
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner', 'player--active');
    player1El.classList.remove('player--winner', 'player--active');
    player2El.classList.remove('player--winner', 'player--active');
  
    player0El.classList.add('player--active');
  };
  
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = (activePlayer + 1) % 3; // Cycles through 0, 1, 2
    
    // Remove active class from all players, then add to the current active player
    player0El.classList.remove('player--active');
    player1El.classList.remove('player--active');
    player2El.classList.remove('player--active');
    
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  };
  

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
      // 1. Generating a random dice roll
      const dice = Math.trunc(Math.random() * 6) + 1;
  
      // 2. Display dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
  
      // 3. Check for rolled 1
      if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(
          `current--${activePlayer}`
        ).textContent = currentScore;
      } else {
        // Switch to next player
        switchPlayer();
      }
    }
  });


btnHold.addEventListener('click', function () {
    if (playing) {
      // Add current score to the active player's score
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
  
      // Check if player's score is >= 50
      if (scores[activePlayer] >= 50) {
        // End the game
        playing = false;
        diceEl.classList.add('hidden');
        
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        // Switch to the next player
        switchPlayer();
      }
      
    }
  });
  

btnNew.addEventListener('click', function(){
    init();
});
