let secretNumber = Math.floor(Math.random() * 100) + 1;

const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const messageDiv = document.getElementById('message');
const hintDiv = document.getElementById('hint');
const confettiDiv = document.getElementById('confetti');
const victorySound = document.getElementById('victory-sound');  // Referência ao áudio

function checkGuess() {
    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageDiv.textContent = "Por favor, insira um número válido entre 1 e 100.";
        hintDiv.textContent = "";
        return;
    }

    if (guess === secretNumber) {
        messageDiv.textContent = "Parabéns! Você acertou o número secreto!";
        hintDiv.textContent = "";
        triggerConfetti();
        victorySound.play();  // Toca o som de vitória
    } else if (guess < secretNumber) {
        messageDiv.textContent = "Está frio!";
        hintDiv.textContent = "Tente um número maior.";
    } else {
        messageDiv.textContent = "Quente demais!";
        hintDiv.textContent = "Tente um número menor.";
    }

    guessInput.value = '';
}

function triggerConfetti() {
    confetti({
        particleCount: 200,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#ffec8b', '#9b7cc5', '#ffab91', '#a5d6a7'],
    });
}

submitButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkGuess();
    }
});
