let player = 1;
let prevHouse = [];
let gameOver = false;
// 0 = empty, n = player n
let board = [];
let gameConfigs = { "Petteia": { "boardSize": 8 } };
let defaultGame = "Petteia";
let gameChosen = defaultGame;
let gameChosenConfigs = gameConfigs[gameChosen];
let totalPieces = []
populateBoard();
populateInitHouses();
renderBoard();

function updateGame() {
    renderBoard();
    checkGameOver();
    if (gameOver) {
        alert("Player " + player + " venceu!")
        return
    }
    changePlayer();
    reloadScripts();
}

function populateBoard(sizeX = gameChosenConfigs.boardSize, sizeY = sizeX) {
    for (let i = 0; i < sizeX; i++) {
        let row = [];
        for (let j = 0; j < sizeY; j++) {
            row[j] = 0;
        }
        board[i] = row;
    }
}

function populateInitHouses(boardType = gameChosen) {
    switch (boardType) {
        case "Petteia":
            petteiaInitHouses();
            break;

        default:
            break;
    }
}

function petteiaInitHouses() {
    for (let i = 0; i < gameChosenConfigs.boardSize; i++) {
        board[0][i] = 1;
        board[7][i] = 2;
    }
    totalPieces = [8, 8]
}

function petteiaGameFunctions(house) {
    movePiece(house)
    piecesSituation(house);
    updateGame();
}

function changePlayer() {
    player = player == 1 ? 2 : 1;
}

function playerAction(p, [x, y]) {
    let isValid = false;
    let house = [x, y, p];
    /* check direction of movement,                                                     - OK
    based on direction, get row or column (create a function to get column),            - OK
    check if there is a piece (not 0) between player prev house and player new house,   -
    if yes, return */
    if (house != prevHouse) {
        if (house[2] == "" && prevHouse[2] != "" && prevHouse[2] == player) {
            let newPlayerHouse = [x, y, prevHouse[2]];
            let diffY = house[0] - prevHouse[0];
            // console.log(house[0], prevHouse[0], diffX < 0);
            let diffX = house[1] - prevHouse[1];
            // console.log(house[1], prevHouse[1], diffY < 0);
            let row = board[x];
            let column = getColumn(y);
            if (diffX < 0) {
                // console.log(row)
                for (let i = house[0]; i < prevHouse[0]; i++) {
                    // console.log(row[i])
                }
            }
            // } else if (diffX > 0) {
            // }
            // if (diffY < 0) {
            // } else if (diffY > 0) {
            // }

            if ((house[0] != prevHouse[0]) && (house[1] == prevHouse[1])) {
                isValid = true;
                petteiaGameFunctions(newPlayerHouse);
            } else if ((house[1] != prevHouse[1]) && (house[0] == prevHouse[0])) {
                isValid = true;
                petteiaGameFunctions(newPlayerHouse);
            }
        }
    }

    if (isValid) {
        prevHouse = [];
    } else {
        prevHouse = house;
    }
}

function renderBoard() {
    $('table').empty();
    for (let i = 0; i < board.length; i++) {
        $('table').append($('<tr row="' + i + '"></tr>'))
        for (let j = 0; j < board[i].length; j++) {
            $('table tr[row="' + i + '"]').append('<td class="house" X="' + i + '" Y="' + j + '">' + (board[i][j] != 0 ? board[i][j] : "") + '</td>')
        }
    }
}

function piecesSituation(house) {
    let piecesTaken = [];
    let x = parseInt(house[0]);
    let y = parseInt(house[1]);
    let p = parseInt(house[2]);
    let score = 0;
    if (x + 2 < gameChosenConfigs.boardSize) {
        if (board[x][y] == p && board[x + 2][y] == p && board[x + 1][y] == otherPlayer()) {
            score++;
            piecesTaken.push([x + 1, y]);
        }
    }
    if (x - 2 > 0) {
        if (board[x][y] == p && board[x - 2][y] == p && board[x - 1][y] == otherPlayer()) {
            score++;
            piecesTaken.push([x - 1, y]);
        }
    }
    if (y + 2 < gameChosenConfigs.boardSize) {
        if (board[x][y] == p && board[x][y + 2] == p && board[x][y + 1] == otherPlayer()) {
            score++;
            piecesTaken.push([x, y + 1]);
        }
    }
    if (y - 2 > 0) {
        if (board[x][y] == p && board[x][y - 2] == p && board[x][y - 1] == otherPlayer()) {
            score++;
            piecesTaken.push([x, y - 1]);
        }
    }
    if (score > 0) {
        totalPieces[otherPlayer() - 1] -= score;
        for (let i = 0; i < piecesTaken.length; i++) {
            let [x, y] = piecesTaken[i];
            board[x][y] = 0;
        }
    }
}

function checkGameOver() {
    let p = otherPlayer();
    if (totalPieces[p - 1] == 0) {
        gameOver = true;
    }
}

function otherPlayer() {
    return player == 1 ? 2 : 1;
}

function movePiece([newX, newY, _]) {
    let [x, y, player] = prevHouse;
    board[x][y] = 0;
    board[newX][newY] = parseInt(player);
}

function getColumn(y) {
    let column = [];
    for (let i = 0; i < board.length; i++) {
        column.push(board[i][y]);
    }
    return column;
}