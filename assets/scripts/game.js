let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ['button1', 'button2', 'button3', 'button4'],
};

const newGame = () => {
    // set score to 0
    game.score = 0;
    // set currentGame to empty array
    game.currentGame = [];
    // set playerMoves to empty array
    game.playerMoves = [];
    showScore();
};

const showScore = () => {
    document.getElementById('score').innerText = game.score;
};

module.exports = {game, newGame, showScore};