// Variables globales
let chart;

// Función para inicializar la calculadora
function initCalculator() {
    // Inicializar gráfico
    const ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Crecimiento del dinero',
                data: [],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Añadir event listeners
    document.querySelectorAll('input[type="range"]').forEach(input => {
        input.addEventListener('input', updateCalculator);
    });

    document.querySelectorAll('input[name="interest-type"]').forEach(radio => {
        radio.addEventListener('change', updateCalculator);
    });

    document.getElementById('scenario-university').addEventListener('click', () => loadScenario(5000000, 5, 10));
    document.getElementById('scenario-phone').addEventListener('click', () => loadScenario(1000000, 12, 2));
    document.getElementById('scenario-investment').addEventListener('click', () => loadScenario(2000000, 7, 20));

    document.getElementById('calculate-goal').addEventListener('click', calculateGoal);
    document.getElementById('check-guess').addEventListener('click', checkInterestGuess);

    // Inicializar calculadora
    updateCalculator();
}

// Función para actualizar la calculadora
function updateCalculator() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const time = parseInt(document.getElementById('time').value);
    const interestType = document.querySelector('input[name="interest-type"]:checked').value;

    const results = calculateInterest(principal, rate, time, interestType);
    updateChart(results);
    updateSummaryTable(results);
}

// Función para calcular el interés
function calculateInterest(principal, rate, time, type) {
    let results = [];
    for (let t = 0; t <= time; t++) {
        if (type === 'simple') {
            results.push(principal * (1 + rate * t));
        } else {
            results.push(principal * Math.pow(1 + rate, t));
        }
    }
    return results;
}

// Función para actualizar el gráfico
function updateChart(data) {
    chart.data.labels = data.map((_, index) => `Año ${index}`);
    chart.data.datasets[0].data = data;
    chart.update();
}

// Función para actualizar la tabla de resumen
function updateSummaryTable(data) {
    const table = document.getElementById('summary-table');
    let html = '<table><tr><th>Año</th><th>Valor</th></tr>';
    data.forEach((value, index) => {
        html += `<tr><td>${index}</td><td>$${value.toFixed(2)}</td></tr>`;
    });
    html += '</table>';
    table.innerHTML = html;
}

// Función para cargar escenarios predefinidos
function loadScenario(principal, rate, time) {
    document.getElementById('principal').value = principal;
    document.getElementById('rate').value = rate;
    document.getElementById('time').value = time;
    updateCalculator();
}

// Función para calcular el ahorro mensual para alcanzar una meta
function calculateGoal() {
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);
    const time = parseInt(document.getElementById('time').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;

    const monthlyRate = rate / 12;
    const months = time * 12;

    const monthlySavings = goalAmount / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const resultElement = document.getElementById('goal-results');
    resultElement.innerHTML = `Para alcanzar tu meta de $${goalAmount.toFixed(2)} en ${time} años, necesitas ahorrar aproximadamente $${monthlySavings.toFixed(2)} al mes.`;
}

// Función para el juego "Adivina el Interés"
function checkInterestGuess() {
    // Implementar lógica del juego aquí
}

// Inicializar la calculadora cuando se carga la página
window.addEventListener('load', initCalculator);