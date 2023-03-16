function Player(name, marker) {
    return {name, marker};
}

const gameBoard = (() => {

    let versusRobot = document.querySelector('.robot');
    let versusHuman = document.querySelector('.human');
    let menu = document.querySelector('.menu');
    let body = document.querySelector('body');
    let result, tempBoard = [0,1,2,3,4,5,6,7,8];

    let board = document.createElement('div');
    board.className = 'squares';
    let tile, tempAiMove;

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
    let winnerDeclared = false, winnerDeclaredTemp = false;
    let remainingSpots = 9;

    let availabeTile = [];
    let aiMove, moves = [], allScores = [];


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
        console.log(board[0], board[1], board[2])
        winningAxes.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            // console.log(item, board[item[0]], board[item[1]], board[item[2]])
            if (board[item[0]] === this.activePlayer.marker && board[item[1]] === this.activePlayer.marker && board[item[2]] === this.activePlayer.marker) {
                /* console.log(item[0])
                console.log(item[1])
                console.log(item[2]) */

                gameBoard.winnerDeclared = true;
                gameBoard.result = gameBoard.activePlayer.marker;
                console.log('winner!', gameBoard.winnerDeclared);
                subtext.innerHTML = `<b class="winner">${gameBoard.activePlayer.name} wins!</b>`;

                gameBoard.StopTile()
            } 
        })
    }

    function checkWinnerTemp() {
        winningAxes.forEach((item, index) => { // [0, 1, 2, 3, 4, 5, 6, 7]
            //console.log(item, board[item[0]], board[item[1]], board[item[2]])
            if (board[item[0]] === this.activePlayer.marker && board[item[1]] === this.activePlayer.marker && board[item[2]] === this.activePlayer.marker) {

                gameBoard.winnerDeclaredTemp = true;
                console.log(`${gameBoard.activePlayer.name} wins`)
                this.result = gameBoard.activePlayer.marker;
            } 
        })
    }

    // alert next player
    function alertNextPlayer(withAI) {
        if (withAI) {
            this.activePlayer === playerOne ? playerName = 'AI' : 'Player 1';

        } else {
            this.activePlayer === playerOne ? playerName = 'Player 2' : playerName = 'Player 1';

        }
        console.log('alerting player')
        console.log(playerName)
    }

    // next player
    function nextPlayer(withAI) {

        if(withAI){
            if(this.activePlayer === playerOne){
                this.activePlayer = aiPlayer
                playerColor = "maroon"
                playerMarker = "close"

                gameBoard.BestMove()
                PlayGame(true)
            } else {
                this.activePlayer = playerOne;
                playerColor = "darkgreen"
                playerMarker = "done"
            }
            
        } else {
        if (this.activePlayer === playerOne) {
            this.activePlayer = playerTwo;
            playerColor = "maroon"
            playerMarker = "close"
            } else {
                this.activePlayer = playerOne;
            playerColor = "darkgreen"
            playerMarker = "done"
            }
        }

        console.log('nextPlayer() function ran')

    }

    // declare tie
    function declareTie() {
        gameBoard.result = 'tie'
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
            subtext.innerHTML = `<span class="player-name">${activePlayer.name}</span>, make your move.`
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
    }

    // function to get rid of unused tiles
    function StopTile() {
        Array.from(board.children).forEach((square) => {
            if(square.textContent === '') {
                square.style.backgroundColor = 'grey'
                square.textContent = 'sentiment_very_dissatisfied'
                square.style.color = 'rgb(189, 189, 189)';
            }
            square.style.pointerEvents = 'none'

        })
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
        if (aiMove != undefined) {
            Array.from(board.children)[aiMove] = 'close'
        }
        if (playerName === 'Player 1' || playerName === 'Player 2' ) {
        Array.from(board.children).forEach((square, index) => {
            if(gameBoard.winnerDeclared != true)subtext.innerHTML = `<span class="player-name"">${playerName}</span>, make your move.`

                square.addEventListener('click', () => {
                    
                    // update array value to be that of active player
                    board[index] = gameBoard.activePlayer.marker;
                    if(aiMove != undefined) {
                        board[aiMove] = 'close'
                        console.log('jigaass', aiMove)
                    }
                    // display color and tiler marker
                    
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
                            if (gameBoard.winnerDeclared != true){
                                subtext.innerHTML = `<span class="player-name"">${playerName}</span>, make your move.`
                                subtext.firstChild.style.color = playerColor
                            } else {
                                gameBoard.StopTile()
                            }
                        } else if (gameBoard.remainingSpots == 0) {
                            gameBoard.declareTie();
                        }
                    }
                })
            });

            } else if (playerName = 'AI'){
                console.log('haku', aiMove)
                // update array value to be that of active player
                let boards = Array.from(board.children)
                let aiTile = boards[aiMove]
                board[aiMove] = gameBoard.activePlayer.marker;

                aiTile.style.backgroundColor = playerColor
                aiTile.textContent = playerMarker

                // remove event listener from the marked index
                aiTile.style.pointerEvents = 'none';

                // update remainingSpots
                gameBoard.remainingSpots -= 1;
                // check winner: if all 3 values within any of these conditions are ===...
                console.log('checking winner')
                gameBoard.checkWinner();
                // check remaining spots
                console.log(gameBoard.winnerDeclared, 'waqwqa')
                if (gameBoard.winnerDeclared == false) {
                    console.log(gameBoard.winnerDeclared, 'waqwqa')
                    if (gameBoard.remainingSpots > 0) {
                        gameBoard.alertNextPlayer(withAI);
                        gameBoard.nextPlayer(withAI);
                        
                    } else if (gameBoard.remainingSpots == 0) {
                        gameBoard.declareTie();
                    }
                } else {
                    console.log(gameBoard.winnerDeclared, 'waqwqa')
                    remainingSpots = 0;
                    subtext.innerHTML = `<b class="winner">${gameBoard.activePlayer.name} wins!</b>`;
                }
            }
        
    }

    function BestMove() {
        let move = []
        // debugger
        let tempActivePlayer = gameBoard.activePlayer;
        AvailableTiles()
        let bestMove; 
        let bestScore = -1000;
        gameBoard.result = undefined

        Array.from(board.children).forEach((square, index) => {
            if(square.textContent === '') {
                square.style.backgroundColor = 'maroon'
                square.textContent = 'close';
                
                board[index] = gameBoard.activePlayer.marker
                console.log(square.className, gameBoard.winnerDeclaredTemp)

                gameBoard.result = undefined
                let score = Minimax(board, 0, true)
                board[index] = undefined
                console.log(`the score is ${score} and ${bestScore} and moves are ${gameBoard.moves} and ${gameBoard.allScores}`)
                square.style.backgroundColor = 'lightgreen'
                square.textContent = ''
                if (score > bestScore) {
                    bestScore = score;
                    console.log(square.className, bestScore)
                    bestMove = square.className.slice(0, 1)
                }
                console.log(bestMove,'ggrgrgrgrrg')
            }
            
        })
        gameBoard.moves[gameBoard.allScores.indexOf(Math.max(...gameBoard.allScores))] === undefined ? aiMove = bestMove : aiMove = gameBoard.moves[gameBoard.allScores.indexOf(Math.max(...gameBoard.allScores))];
        gameBoard.activePlayer = tempActivePlayer
        gameBoard.allScores = []
        gameBoard.moves = []
    }

    function Minimax(board ,depth, isMaximizing) {
        //gameBoard.result = undefined
        gameBoard.checkWinnerTemp()
        console.log(depth, 'lklklk', gameBoard.result)

        switch (scores[gameBoard.result]) {
            case 'done':
                return depth -10;
            case 'close':
                
                return 10 - depth;
                
            case 'tie':
                return 0;
            default:
                break;
        }

        if (isMaximizing) {
            let bestScore = -1000;
            gameBoard.AvailableTiles()
            Array.from(board.children).forEach((square, index) => {
                if(square.textContent === '') {

                    gameBoard.activePlayer = aiPlayer
                    
                    square.style.backgroundColor = 'maroon'
                    square.textContent = 'close'

                    board[index] = gameBoard.activePlayer.marker
                    console.log(gameBoard.activePlayer, "maxing", board[index], square.className)

                    //if (depth === 0 && bestScore > -1000 && bestScore < 1000) gameBoard.moves.push([depth, bestScore, square.className.slice(0, 1)])
                    let score = Minimax(board, depth, false)
                    console.log(`score is ${score}, bestscore is ${bestScore}, maxing and depth is ${depth} on ${square.className}`)
                    board[index] = undefined
                    square.style.backgroundColor = 'lightgreen'
                    square.textContent = ''
                    if (bestScore > -1000 && bestScore < 1000) {
                        gameBoard.moves.push(square.className.slice(0, 1))
                        gameBoard.allScores.push(bestScore)
                    }
                    bestScore = Math.max(score, bestScore)
                }
                if (depth === 0) tempAiMove = square.className.slice(0, 1)
                
            })

            return bestScore;
        } else {
            let bestScore = 1000;
            gameBoard.AvailableTiles()
            Array.from(board.children).forEach((square, index) => {
                if(square.textContent === '') {

                    gameBoard.activePlayer = playerOne
                    console.log(gameBoard.activePlayer, "mmining", square.className)
                    square.style.backgroundColor = 'darkgreen'
                    square.textContent = 'done'
                    board[index] = gameBoard.activePlayer.marker

                    let score = Minimax(board, depth + 1, true)
                    console.log(`score is ${score}, bestscore is ${bestScore}, minimizing and depth is ${depth} with squre ${square.className}`)
                    board[index] = undefined
                    square.style.backgroundColor = 'lightgreen'
                    square.textContent = ''
                    bestScore = Math.min(score, bestScore)
                    if (bestScore > -1000 && bestScore < 1000) {
                        gameBoard.moves.push(square.className.slice(0, 1))
                        gameBoard.allScores.push(bestScore)
                    }
                    //if (depth === 0) tempAiMove = square.className.slice(0, 1)
                }
            })
            return bestScore;
        }
    }

    let scores = {
        close: 'close',
        done: 'done',
        tie: 'tie',
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
        PlayWithHuman,
        StopTile,
        AvailableTiles,
        BestMove,
        result,
        winnerDeclaredTemp,
        checkWinnerTemp,
        moves,
        allScores
    };

})();

