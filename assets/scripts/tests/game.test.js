const { sum } = require('../game');
const { clickAction } = require('../game');

describe('sum', () => {
    it('should add two numbers', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

describe('clickAction', () => {
    it('should change the innerHTML of the element with id par to "you clicked me"', () => {
        document.body.innerHTML = '<div id="par"></div>';
        clickAction();
        expect(document.getElementById('par').innerHTML).toBe('you clicked me');
    });
});