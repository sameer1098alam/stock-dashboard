document.addEventListener("DOMContentLoaded", () => {
    const companyList = document.getElementById("companyList");
    const ctx = document.getElementById("stockChart").getContext("2d");
    let stockChart;

    // Fetch list of companies
    fetch("http://localhost:5000/api/indices")
        .then(response => response.json())
        .then(indices => {
            indices.forEach(index => {
                const li = document.createElement("li");
                li.textContent = index;
                li.classList.add("list-group-item");
                li.addEventListener("click", () => fetchStockData(index));
                companyList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching indices:", error));

    // Fetch stock data and update chart
    function fetchStockData(indexName) {
        fetch(`http://localhost:5000/api/indices/${encodeURIComponent(indexName)}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("chartTitle").textContent = `Stock Data for ${indexName}`;
                if (stockChart) stockChart.destroy();

                const labels = data.map(row => row.index_date);
                const closingValues = data.map(row => parseFloat(row.closing_index_value));

                stockChart = new Chart(ctx, {
                    type: "line",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: `${indexName} Closing Value`,
                            data: closingValues,
                            borderColor: "#007bff",
                            fill: false
                        }]
                    }
                });
            })
            .catch(error => console.error("Error fetching stock data:", error));
    }
});
