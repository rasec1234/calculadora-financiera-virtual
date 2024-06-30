document.addEventListener('DOMContentLoaded', () => {
    // Canvas setup
    const ctx = document.getElementById('resultsChart').getContext('2d');
    var resultsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Interés Simple',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    data: [],
                    fill: false,
                },
                {
                    label: 'Interés Compuesto',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    data: [],
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Años' }},
                y: { title: { display: true, text: 'Valor (COP)' }}
            }
        }
    });
});

function calculate() {
    const principal = parseFloat(document.getElementById('principal').value);
    const rate = parseFloat(document.getElementById('rate').value) / 100;
    const time = parseInt(document.getElementById('time').value);
    const interestType = document.querySelector('input[name="interestType"]:checked').value;

    let results = [];
    for (let year = 1; year <= time; year++) {
        let value;
        if (interestType === 'simple') {
            value = principal * (1 + rate * year);
        } else {
            value = principal * Math.pow(1 + rate, year);
        }
        results.push({ year: year, value: value });
    }

    displayResults(results, interestType);
}

function displayResults(results, interestType) {
    // Update chart
    const chart = Chart.getChart("resultsChart");
    chart.data.labels = results.map(result => result.year);
    if (interestType === 'simple') {
        chart.data.datasets[0].data = results.map(result => result.value);
    } else {
        chart.data.datasets[1].data = results.map(result => result.value);
    }
    chart.update();

    // Update table
    const table = document.getElementById('resultsTable');
    table.innerHTML = '<tr><th>Año</th><th>Valor (COP)</th></tr>';
    results.forEach(result => {
        const row = table.insertRow();
        row.insertCell(0).innerText = result.year;
        row.insertCell(1).innerText = result.value.toFixed(2);
    });

    document.getElementById('results').style.display = 'block';
}

function loadScenario(scenario) {
    let principal, rate, time;
    switch (scenario) {
        case 'university':
            principal = 5000000;
            rate = 5;
            time = 10;
            break;
        case 'phone':
            principal = 1000000;
            rate = 12;
            time = 2;
            break;
        case 'investment':
            principal = 2000000;
            rate = 7;
            time = 20;
            break;
    }
    document.getElementById('principal').value = principal;
    document.getElementById('rate').value = rate;
    document.getElementById('time').value = time;
}

