const board =[
    ['','',''],
    ['','',''],
    ['','',''],
];

let turn = 0; //o = user, 1 = pc

const boardContainer = document.querySelector('#board');
const playerDiv = document.querySelector('#player');

startGame();

function startGame () {
    renderBoard();
    turn = Math.random() <= 0.5 ? 0 : 1;

    renderCurentPlayer();

    if (turn === 0) {
        playerPlays();
    } else {
        pcPlays();
    }
}
function playerPlays () {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell,i) => {
        const row = i % 3;
        const column = parseInt(i / 3);

        if (board[row][column] == '') {
            cell.addEventListener('click', (e) => {
                board[row][column] = 'O';
                cell.textContent = board[row][column];

                turn = 1;
                const won = checkIfWinner();

                if (won === 'none') {
                    pcPlays();
                    return;
                }
                if (won === 'draw') {
                    renderDraw();
                    cell.removeEventListener('click', this);
                    return;
                }
                
            });
        }
    });
}
function pcPlays () {
    renderCurentPlayer();
    setTimeout(() => {
        let played = false;

        const options = checkIfCanWin();

        if (options.length > 0) {
            const bestOption = options[0];
            for (let i = 0; i < bestOption.length; i++) {
                if (bestOption[i].value === 0) {
                    const positioni = bestOption[i].i
                    const positionj = bestOption[i].j;
                    board[positioni][positionj] = 'X';
                    played = true;
                    break;
                }
            }
        } else {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === '' && !played) {
                        board[i][j] = 'X';
                        played = true;
                    }
                }   
            }
        }
        turn = 0;
        renderBoard();
        renderCurentPlayer();

        const won = checkIfWinner();

        if (won === 'none') {
            playerPlays();
            return;
        }
        if (won === 'draw') {
            renderDraw();
            return;
        }

        
    },1500);
}

function renderDraw () {
    playerDiv.textContent = 'Draw';
}

function checkIfCanWin () {
    const arr = JSON.parse(JSON.stringify(board)); //Bidimentional deep copy

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] === 'X') {
                arr[i][j] = {value: 1,i,j};
            }
            if (arr[i][j] === '') {
                arr[i][j] = {value: 0,i,j};
            }
            if (arr[i][j] === 'O') {
                arr[i][j] = {value: -2,i,j};
            }
        }
    }

    const position1 = arr[0][0];
    const position2 = arr[0][1];
    const position3 = arr[0][2];
    const position4 = arr[1][0];
    const position5 = arr[1][1];
    const position6 = arr[1][2];
    const position7 = arr[2][0];
    const position8 = arr[2][1];
    const position9 = arr[2][2];

    const posibility1 = [position1, position2 ,position3];
    const posibility2 = [position4, position5 ,position6];
    const posibility3 = [position7, position8 ,position9];
    const posibility4 = [position1, position4 ,position7];
    const posibility5 = [position2, position5 ,position8];
    const posibility6 = [position3, position6 ,position9];
    const posibility7 = [position1, position5 ,position9];
    const posibility8 = [position3, position5 ,position7];

    const answer = [posibility1, posibility2, posibility3, posibility4, posibility5, posibility6, posibility7, posibility8].filter((line) => {
        return (line[0].value + line[1].value + line[2].value === 2 ||
            line[0].value + line[1].value + line[2].value === -4);
    });

    return answer;

}

function checkIfWinner () {
    const position1 = board[0][0];
    const position2 = board[0][1];
    const position3 = board[0][2];
    const position4 = board[1][0];
    const position5 = board[1][1];
    const position6 = board[1][2];
    const position7 = board[2][0];
    const position8 = board[2][1];
    const position9 = board[2][2];

    const posibility1 = [position1, position2 ,position3];
    const posibility2 = [position4, position5 ,position6];
    const posibility3 = [position7, position8 ,position9];
    const posibility4 = [position1, position4 ,position7];
    const posibility5 = [position2, position5 ,position8];
    const posibility6 = [position3, position6 ,position9];
    const posibility7 = [position1, position5 ,position9];
    const posibility8 = [position3, position5 ,position7];

    const answer = [posibility1, posibility2, posibility3, posibility4, posibility5, posibility6, posibility7, posibility8].filter((line) => {
        return (line[0] + line[1] + line[2] === 'XXX' ||
        line[0] + line[1] + line[2] === 'OOO');
    });
    if (answer.length > 0) {
        if (answer[0][0] === 'X') { //If exist a winner
            playerDiv.textContent = 'PC WINS';
            return 'pcwon';
        } else {
            playerDiv.textContent = 'PLAYER WINS';
            return 'playerwon';
        }
    } else {
        let draw = true;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                if (board[i][j] === '') {
                    draw = false;
                }
            }
        }
        return draw ? 'draw' : 'none';
    }

}

function renderCurentPlayer () {
    playerDiv.textContent = `${turn === 0 ? 'Player turn' : 'PC turn'}`;
}

function renderBoard () {
    const html = board.map(row => {
        const cells = row.map(cell => {
            return `<button class="cell">${cell}</button>`
        });
        return `<div class="row">${cells.join('')}</div>`
    });

    boardContainer.innerHTML = html.join('');
}
