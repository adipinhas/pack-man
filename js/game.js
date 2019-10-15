'use strict';
var WALL = '🔥';
var FOOD = '.';
var EMPTY = '';
var CHERRY = '🍒'
var POWERFOOD = '🍪';
var gIsSuperFood = false;
var intervalCehrry;
var gSIZE=12
var gFoodCount = 0;
var gBoard;
var gBtn = document.querySelector('.button');
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);

  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  gGame.score = 0;
  updateScore(0);
  document.querySelector('h2').innerText = ''
  gBtn.classList.add('button');
  intervalCehrry = setInterval(getRandomEmpty, 5000);
}


function buildBoard() {
  var SIZE = gSIZE;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      gFoodCount++;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2) ||
        (j === 6 && i > 0 && i < 3) ||
        (j === 5 && i >= SIZE - 3)) {

        board[i][j] = WALL;
        gFoodCount--;
      }


    }

  }
  board[1][1] = POWERFOOD;
  board[1][SIZE - 2] = POWERFOOD;
  board[SIZE - 2][1] = POWERFOOD;
  board[SIZE - 2][SIZE - 2] = POWERFOOD;
  gFoodCount = gFoodCount - 4;

  return board;
}

function updateScore(value) {
  // Update both the model and the dom for the score
  gGame.score += value;
  console.log(gFoodCount, gGame.score)

  if ((gFoodCount ) + 30 <= gGame.score) {
    gameOver(true)

  }
  document.querySelector('header h3 span').innerText = gGame.score+' score for victory :'+(gFoodCount + 30);
}


function gameOver(isVictory) {
  if (isVictory) {
    document.querySelector('h2').innerText = 'victory!!!!!!'
  } else {
    document.querySelector('h2').innerText = 'you lose...';
  }
  //console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  gBtn.classList.remove('button');
  clearInterval(intervalCehrry)
}

function victorius() {
  document.querySelector('h2').innerText = 'victorius!!!!!';
  gBtn.classList.remove('button');
}
function eatingSuperFood() {
  var ColorGhosts = document.querySelectorAll('.ghost');
  for (var i = 0; i < ColorGhosts.length; i++) {
    ColorGhosts[i].style.backgroundColor = 'blue';
  }
  gIsSuperFood = true;
  setTimeout(function () {
    gIsSuperFood = false;
  }, 5000)
}
function getRandomEmpty() {
  var emptyCells = [];
  //debugger;
  for (var i = 0; i < gSIZE; i++) {
    for (var j = 0; j < gSIZE; j++) {
      if (gBoard[i][j] === '') {
        emptyCells.push({ i: i, j: j })
      }
    }
  }
  var shuffleCells = shuffle(emptyCells)
  var randEmptyCell = shuffleCells.pop();
  //console.log(randEmptyCell)
  gBoard[randEmptyCell.i][randEmptyCell.j] = '🍒'
  renderCell(randEmptyCell, CHERRY)
}


