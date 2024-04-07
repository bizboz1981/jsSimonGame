
const {game, newGame, showScore} = require('../game');

import fs from 'node:fs';
const fileContents = fs.readFileSync('index.html', 'utf-8');
document.open();
document.write(fileContents);
document.close();

describe('Game object contains the correct keys', () => {
    test('score key exists', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('choices contains the correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
});

describe('newGame function works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = [1, 2, 3, 4];
        game.playerMoves = [1, 2, 3, 4];
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('score is set to 0', () => {
        expect(game.score).toBe(0);
    });
    test('currentGame is empty array', () => {
        expect(game.currentGame).toEqual([]);
    });
    test('playerMoves is empty array', () => {
        expect(game.playerMoves).toEqual([]);
    });
    test('should display 0 for element with id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
});