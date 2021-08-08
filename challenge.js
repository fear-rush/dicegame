const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

const dice = document.querySelectorAll('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnSet = document.querySelector('.btn--set');

var currentScore, globalScore, activePlayer, isPlaying, scoreLimit;

function showDice() {
  for(i = 0; i < dice.length; i++){
    dice[i].classList.remove('hidden');
  }
}

function hideDice() {
  for(i = 0; i < dice.length; i++){
    dice[i].classList.add('hidden');
  }
}

function init() {
  globalScore = [0,0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  current0.textContent = 0;
  current1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;

  document.getElementById('name--0').textContent = 'Player 1'
  document.getElementById('name--1').textContent = 'Player 2'
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.remove('player--active');
  player1.classList.remove('player--active');
  player0.classList.add('player--active');
  // dice.classList.add('hidden');
  hideDice();
}

init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}


btnRoll.addEventListener('click', function() {
  if (isPlaying) {
    var diceRollOne = Math.floor(Math.random() * 6 + 1);
    var diceRollTwo = Math.floor(Math.random() * 6 + 1);
    console.log('Dice One = ' + diceRollOne);
    console.log('Dice Two = ' + diceRollTwo);
  
    showDice();
    dice[0].src = `dice-${diceRollOne}.png`;
    dice[1].src = `dice-${diceRollTwo}.png`;
    var previousDiceOne;
    var previousDiceTwo;

    if ( (diceRollOne === 6 && previousDiceOne === 6) || (diceRollTwo === 6 && previousDiceTwo === 6 )) {
      switchPlayer();
      globalScore[activePlayer] = 0;
      currentScore = 0;
      document.getElementById(`score--${activePlayer}`).textContent = '0';
      document.getElementById(`current--${activePlayer}`).textContent = '0';
    } else if (diceRollOne !== 1 && diceRollTwo !== 1) {
      currentScore += diceRollOne + diceRollTwo;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }  else {
      switchPlayer();
    }

    previousDiceOne = diceRollOne;
    previousDiceTwo = diceRollTwo;

  }
});

btnHold.addEventListener('click', function() {
  if(isPlaying) {
    
    globalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = globalScore[activePlayer];

    if (globalScore[activePlayer] >= scoreLimit) {

      hideDice();
      isPlaying = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).textContent = 'WINNER!';
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

btnSet.addEventListener('click', function() {
  scoreLimit = document.getElementById('input--score').value;
  document.getElementById('input--score').value = '';


})






