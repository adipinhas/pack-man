var GHOST = '&#9781;';

var gIntervalGhosts;
var gGhosts;

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color:getRandomColor()
    };
    gGhosts.push(ghost);
    board[ghost.location.i][ghost.location.j] = GHOST;
}


function createGhosts(board) {
    gGhosts = [];
    
    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = {i: ghost.location.i + moveDiff.i, j: ghost.location.j + moveDiff.j}
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)
        
        // if WALL return
        if (gBoard[nextLocation.i][nextLocation.j] === WALL) return

        // if PACMAN - gameOver, return
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN) {
            if(!gIsSuperFood){
                gameOver(false)
            }
            
            return
        }
        // if GHOST - give up
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
            return
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost))

    }
}
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return {i: 0, j: 1}
    } else if (randNum < 50) {
        return {i: -1, j: 0}
    } else if (randNum < 75) {
        return {i: 0, j: -1}
    } else {
        return {i: 1, j: 0}
    }    
}


function getGhostHTML(ghost) {
    
    if(!gIsSuperFood){
        return `<span class="ghost" style="background-color:${ghost.color} ">${GHOST}</span>`
    }else{
        
        return `<span class="ghost" style="background-color:blue">${GHOST}</span>`
    }


}
function killGhost(pos){
  
    for(var i=0;i <gGhosts.length;i++){
      if(pos.i===gGhosts[i].location.i&&pos.j===gGhosts[i].location.j){
        gGhosts.splice(i,1)
        return;
      }
    }
  
  }






