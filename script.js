function Player(name, marker) {
    return {name, marker};
}

const gameBoard = (() => {

    let versusRobot = document.querySelector('.robot');
    let versusHuman = document.querySelector('.human');
    let menu = document.querySelector('.menu');
    let body = document.querySelector('body');

    let board = document.createElement('div')
    board.className = 'squares';
    let tile;

    let subtext = document.createElement('p')
    subtext.className = 'subtext'

    let playerName ="Player 1";
    let playerColor = "darkgreen";
    let playerMarker = "done";


     // declare players
    const playerOne = Player('Player 1', 'done');
    const playerTwo = Player('Player 2', 'close');

    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;


     // winning conditions
    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];


    // check winner
    function checkWinner() {
        winningAxes.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            if (board[item[0]] === this.activePlayer.marker && board[item[1]] === this.activePlayer.marker && board[item[2]] === this.activePlayer.marker) {
                console.log('winner!');
                subtext.innerHTML = `<b class="winner">${this.activePlayer.name} wins!</b>`;
                this.winnerDeclared = true;
            } 
        })
    }

    // alert next player
    function alertNextPlayer() {
        console.log('alerting player')
        this.activePlayer === playerOne ? playerName = 'Player 2' : playerName = 'Player 1';
    }

    // next player
    function nextPlayer() {
        if (this.activePlayer === playerOne) {
            this.activePlayer = playerTwo;
            console.log('nigga!')
            console.log(this.activePlayer.name)
            playerColor = "red"
            playerMarker = "close"
        } else {
            this.activePlayer = playerOne;
            playerColor = "darkgreen"
            playerMarker = "done"

        }
        
        console.log('nextPlayer() function ran')

    }

    // declare tie
    function declareTie() {
        subtext.innerHTML = "<b>Tie game!</b>";
    }

    //versus human event listener. One of the game options
    versusHuman.addEventListener('click', PlayGame)


    // function to play the game
    function PlayGame() {

        menu.style.display = 'none';
        menu.style.position = 'fixed';
    
        for (let i = 0; i < 9; i++) {
            tile = document.createElement('span')
            tile.className = 'square material-symbols-outlined'
            subtext.innerHTML = `<span class="player-name">${playerName}</span>, make your move.`
            board.appendChild(tile)
            body.appendChild(subtext)
            body.appendChild(board)
    
        }
    
        Array.from(board.children).forEach((square, index) => {
            square.addEventListener('click', () => {
                // update array value to be that of active player
                board[index] = gameBoard.activePlayer.marker;

                // display color and tiler marker
                subtext.innerHTML = `<span class="player-name"">${playerName}</span>, make your move.`
                subtext.firstChild.style.color = playerColor
                square.style.backgroundColor = playerColor
                square.textContent = playerMarker

                // update remainingSpots
                gameBoard.remainingSpots -= 1;
                // check winner: if all 3 values within any of these conditions are ===...
                gameBoard.checkWinner();
                // check remaining spots
                if (gameBoard.winnerDeclared == false) {
                    if (gameBoard.remainingSpots > 0) {
                        gameBoard.alertNextPlayer();
                        gameBoard.nextPlayer();
                    } else if (gameBoard.remainingSpots == 0) {
                        gameBoard.declareTie();
                    }
                }

            })
        });
    
    
    }

    // return
    return {
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared,
        versusRobot,
        versusRobot,
        menu,
        body,
        board,
        tile,
        subtext,
        Player,
        PlayGame
    };

})();

