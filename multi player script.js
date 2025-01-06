let cells = document.querySelectorAll('.cell');
let gameStatus = document.querySelector('#statusText');
let restart = document.getElementById('restartBtn');

let winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let game = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = 'X';
let running = false;

startGame();

function startGame(){
    running = true;
    cells.forEach(cell => cell.addEventListener("click", cellClicked) );
    restart.addEventListener("click", restartGame);
    gameStatus.textContent = `${currentPlayer}'s turn`;
}
function cellClicked(){
    let index = this.getAttribute("cellIndex");

    if(!running){
        return;
    }
    updateCell(this, index);
    changePlayer();
    checkWinner();
    if(running){
        checkTie();
    }

}
function updateCell(cell, index){
    game[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O': 'X';
    gameStatus.innerText = `${currentPlayer}'s turn`;
}
function restartGame(){
    for(let i=0; i<9; i++){
        game[i] = '';
    }
    cells.forEach(cell => cell.innerText = '');
    cells.forEach(cell => cell.classList.remove('winner'))
}
function checkWinner(){
    for(let i=0; i<winPosition.length; i++){
        let posA = winPosition[i][0];
        let posB = winPosition[i][1];
        let posC = winPosition[i][2];

        if(game[posA] == '' || game[posB] == '' || game[posC] == ''){
            continue;
        }
        if(game[posA] == game[posB] && game[posB] == game[posC]){
            running = false;
            gameStatus.innerText = `${game[posA]} is the winner!!`
            cells[posA].classList.add('winner');
            cells[posB].classList.add('winner');
            cells[posC].classList.add('winner');
            
        }
    }

}
function checkTie(){
    for(let i=0; i<9; i++){
        if(game[i] == ''){
            return;
        }
    }
    running = false;
    gameStatus.innerText = "It's a tie!! Hit the restart button to start new game!! "

}