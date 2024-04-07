import exp from 'node:constants';
import fs from 'node:fs';
const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require('../game');

jest.spyOn(window, 'alert').mockImplementation(() => {});

beforeAll(() =>{
    const fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();});

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
    test('turnNumber key exists', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('turnInProgress key exists', () => {
        expect('turnInProgress' in game).toBe(true);
    });
    test('lastButton key exists', () => {
        expect('lastButton' in game).toBe(true);
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
        game.turnNumber = 42;
        document.getElementById('score').innerText = '42';
        newGame();
    });
    test('score is set to 0', () => {
        expect(game.score).toBe(0);
    });
    test('should be 1 move (element) in currentGame array', () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test('playerMoves is empty array', () => {
        expect(game.playerMoves).toEqual([]);
    });
    test('turnNumber is equal to zero', () => {
        expect(game.turnNumber).toEqual(0);
    });
    test('should display 0 for element with id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('expect data-listener to be true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toBe('true');
        }
    });
});

describe('gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('addTurn adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('should add correct class to light up the buttons', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test ('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test ('should increment the score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test ('should call an alert if the turn is incorrect', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!');
    });
    test ('should set turnInProgress to true if computer playing', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test ('clicking during computer go should fail', () => {
        showTurns();
        game.lastButton = '';
        document.getElementById('button1').click();
        expect(game.lastButton).toEqual('');
    });
});