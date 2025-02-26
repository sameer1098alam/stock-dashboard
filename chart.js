let stockChart; // Global chart instance

function updateChart(data, companyName) {
    let filteredData = data.filter(item => item.index_name === companyName);

    // Extract dates & closing values
    let labels = filteredData.map(item => item.index_date);
    let closingValues = filteredData.map(item => item.closing_index_value);

    // Destroy previous chart (if exists)
    if (stockChart) {
        stockChart.destroy();
    }

    // Create new chart
    let ctx = document.getElementById("stockChart").getContext("2d");
    stockChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: `${companyName} Closing Prices`,
                data: closingValues,
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Date" } },
                y: { title: { display: true, text: "Closing Price" } }
            }
        }
    });
}
