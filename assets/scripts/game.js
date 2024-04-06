const sum = (a, b) => {
    return a + b;
};

function clickAction() {
    document.getElementById('par').innerHTML = 'you clicked me';
};
module.exports = { clickAction, sum };