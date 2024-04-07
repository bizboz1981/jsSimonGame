// biome-ignore lint/style/useConst: <explanation>
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ['button1', 'button2', 'button3', 'button4'],
    turnNumber: 0
};

const newGame = () => {
    // set score to 0
    game.score = 0;
    // set currentGame to empty array
    game.currentGame = [];
    // set playerMoves to empty array
    game.playerMoves = [];
    // reset turnNumber to 0
    game.turnNumber = 0;
    for (let circle of document.getElementsByClassName('circle')) { // Added let to declare circle
        if (circle.getAttribute('data-listener') !== 'true') {
            circle.addEventListener('click', (event) => {
                let move = event.target.getAttribute('id');
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
            });
            circle.setAttribute('data-listener', 'true');
        }
    }
    showScore(); // Fixed misplaced parentheses
    addTurn();
};


const showScore = () => {
    document.getElementById('score').innerText = game.score;
};

const addTurn = () => {
    // clear playerMoves arr
    game.playerMoves = [];
    // randomly add button id to currentGame arr
    game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);
    // call showTurns function
    showTurns();
};

const lightsOn = (circ) => {
    document.getElementById(circ).classList.add('light');
    setTimeout(() => {
        document.getElementById(circ).classList.remove('light');
    }, 400);
};

const showTurns = () => {
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
};

module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns};