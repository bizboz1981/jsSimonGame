// biome-ignore lint/style/useConst: <explanation>
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ['button1', 'button2', 'button3', 'button4'],
    turnNumber: 0,
    turnInProgress: false,
    lastButton: '',
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
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = event.target.getAttribute('id');
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                };
            });
            circle.setAttribute('data-listener', 'true');
        }
    }
    showScore();
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
    }, 600);
};

const showTurns = () => {
    game.turnInProgress = true;
    let index = 0; // This will keep track of the current index in the sequence.

    // Function to handle the flashing logic for one circle.
    const flashCircle = () => {
        const circleId = game.currentGame[index];
        lightsOn(circleId);
        index++;
        
        // If we've shown all circles in the sequence, stop the interval.
        if (index >= game.currentGame.length) {
            game.turnInProgress = false;
        } else {
            // Otherwise, set a timeout to flash the next circle after a short delay.
            setTimeout(flashCircle, 800); // Adjust this delay to control the gap between flashes.
        }
    };

    // Start the flashing sequence.
    flashCircle();
};


const playerTurn = () => {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            setTimeout(() => {
                addTurn();
            }, 2000);
        }
    } else {
        alert('Wrong move!');
        newGame();
    }
};


module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn};