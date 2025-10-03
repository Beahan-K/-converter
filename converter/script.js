const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertButton = document.getElementById('convert');
const resultDiv = document.getElementById('result');

// Replace with actual API data for real-time rates
const exchangeRates = {
    'USD': 1,
    'EUR': 0.85,
    'GBP': 0.72,
    'INR': 74.5 // Example rate, replace with current rate
};

const canvas = document.getElementById('numbers-canvas');
const ctx = canvas.getContext('2d');
const styleTag = document.getElementById('numbers-style');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const numbers = [];
const numberOfNumbers = 75;
const possibleChars = '0123456789$€£¥₹';

for (let i = 0; i < numberOfNumbers; i++) {
    numbers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        text: possibleChars[Math.floor(Math.random() * possibleChars.length)],
        speed: Math.random() * 2 + 0.5,
        fontSize: Math.random() * 20 + 10,
    });
}

function drawNumbers() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    numbers.forEach(number => {
        number.y += number.speed;
        if (number.y > canvas.height) {
            number.y = 0 - number.fontSize;
            number.x = Math.random() * canvas.width;
        }

        ctx.font = `${number.fontSize}px serif`;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillText(number.text, number.x, number.y);
    });

    requestAnimationFrame(drawNumbers);
}

drawNumbers();

convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});



convertButton.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount)) {
        resultDiv.innerText = 'Please enter a valid amount.';
        return;
    }

    const result = amount / exchangeRates[fromCurrency] * exchangeRates[toCurrency];
    resultDiv.innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
});