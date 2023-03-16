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
    const aiPlayer = Player('AI', "close")

    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;

    let availabeTile = [];
    let aiMove;


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
                console.log(item[0])
                console.log(item[1])
                console.log(item[1])

                console.log('winner!');
                subtext.innerHTML = `<b class="winner">${this.activePlayer.name} wins!</b>`;
                this.winnerDeclared = true;
            } 
        })
    }

    // alert next player
    function alertNextPlayer(withAI) {
        if (withAI) {
            this.activePlayer === playerOne ? playerName = 'AI' : 'Player 1';
        } else {
            this.activePlayer === playerOne ? playerName = 'Player 2' : playerName = 'Player 1';
            console.log(this.activePlayer.name, 'eww')

        }
        console.log('alerting player')
        console.log(playerName)
    }

    // next player
    function nextPlayer(withAI) {
        console.log(withAI)
        if(withAI){
            if(this.activePlayer === playerOne){
                this.activePlayer = aiPlayer
                console.log('braaa')
                playerColor = "maroon"
                playerMarker = "close"
                console.log(playerName)

                PlayGame(true)
            } else {
                this.activePlayer = playerOne;
                console.log('hiya')
                playerColor = "darkgreen"
                playerMarker = "done"
            }
            
        } else {
        if (this.activePlayer === playerOne) {
            this.activePlayer = playerTwo;
            console.log(this.activePlayer.name, 'masa', playerName)
            playerColor = "maroon"
            playerMarker = "close"
            } else {
                this.activePlayer = playerOne;
            playerColor = "darkgreen"
            playerMarker = "done"
            }
        }
        console.log(this.activePlayer.name)

        console.log('nextPlayer() function ran')

    }

    // declare tie
    function declareTie() {
        subtext.innerHTML = "<b>Tie game!</b>";
    }

    //versus human event listener. One of the game options
    versusHuman.addEventListener('click', PlayWithHuman)

    //versus AI event listener. One of the game options
    versusRobot.addEventListener('click', PlayWithAI)

    function CreateBoard() {

        for (let i = 0; i < 9; i++) {
            tile = document.createElement('span')
            tile.className = `${i} square material-symbols-outlined`
            subtext.innerHTML = `<span class="player-name">${playerName}</span>, make your move.`
            board.appendChild(tile)
            body.appendChild(subtext)
            body.appendChild(board)
    
        }
    }

    // function to play the game with a human
    function PlayWithHuman() {

        menu.style.display = 'none';
        menu.style.position = 'fixed';
    
        // Create the gameboard
        CreateBoard()

        PlayGame(false)
    
    
    }

    function AvailableTiles() {
        availabeTile = []
        Array.from(board.children).forEach((square, index) => {
            if (square.style.pointerEvents != 'none') {
                availabeTile.push(square.className.slice(0, 1))
            }
        })
        aiMove = availabeTile[Math.floor(Math.random()*availabeTile.length)];
    }

    // function to play the game with AI
    function PlayWithAI() {

        menu.style.display = 'none';
        menu.style.position = 'fixed';
    
        // Create the gameboard
        CreateBoard()

        PlayGame(true)
    }
    function PlayGame(withAI) {
        console.log(activePlayer.name)
        if (activePlayer.name === 'Player 1' || activePlayer.name === 'Player 2' ) {
        Array.from(board.children).forEach((square, index) => {
            subtext.innerHTML = `<span class="player-name"">${playerName}</span>, make your move.`

                square.addEventListener('click', () => {
                    
                    // update array value to be that of active player
                    board[index] = gameBoard.activePlayer.marker;
                    // display color and tiler marker
                    subtext.innerHTML = `<span class="player-name"">${playerName}</span>, make your move.`
                    subtext.firstChild.style.color = playerColor
                    square.style.backgroundColor = playerColor
                    square.textContent = playerMarker

                    // remove event listener from the marked index
                    square.style.pointerEvents = 'none';
                    console.log(square)
                    if(withAI) {
                        AvailableTiles()
                        console.log(availabeTile, aiMove)
                    }
                    // update remainingSpots
                    gameBoard.remainingSpots -= 1;
                    // check winner: if all 3 values within any of these conditions are ===...
                    gameBoard.checkWinner();
                    // check remaining spots
                    if (gameBoard.winnerDeclared == false) {
                        if (gameBoard.remainingSpots > 0) {
                            gameBoard.alertNextPlayer(withAI);

                            gameBoard.nextPlayer(withAI);
                        } else if (gameBoard.remainingSpots == 0) {
                            gameBoard.declareTie();
                        }
                    }
                })
            });

            } else if (playerName = 'AI'){
                console.log('balal')
                // update array value to be that of active player
                let boards = Array.from(board.children)
                let aiTile = boards[aiMove]
                // update array value to be that of active player
                aiTile = gameBoard.activePlayer.marker;
                console.log(boards[aiMove])
                aiTile.style.backgroundColor = playerColor
                aiTile.textContent = playerMarker

                // remove event listener from the marked index
                aiTile.style.pointerEvents = 'none';

                // update remainingSpots
                gameBoard.remainingSpots -= 1;
                // check winner: if all 3 values within any of these conditions are ===...
                gameBoard.checkWinner();
                // check remaining spots
                if (gameBoard.winnerDeclared == false) {
                    if (gameBoard.remainingSpots > 0) {
                        gameBoard.alertNextPlayer(withAI);
                        gameBoard.nextPlayer(withAI);
                    } else if (gameBoard.remainingSpots == 0) {
                        gameBoard.declareTie();
                    }
                }
            }
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
        PlayWithHuman
    };

})();

