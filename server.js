const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for frontend access

let stockData = [];

// Read and parse CSV file
fs.createReadStream("dump.csv")
  .pipe(csv())
  .on("data", (row) => {
    stockData.push(row);
  })
  .on("end", () => {
    console.log("CSV file successfully processed.");
  });

// API to get all indices
app.get("/api/indices", (req, res) => {
  const indices = stockData.map((row) => row.index_name);
  res.json([...new Set(indices)]); // Remove duplicates
});

// API to get stock data for a specific index
app.get("/api/indices/:index_name", (req, res) => {
  const { index_name } = req.params;
  const filteredData = stockData.filter(
    (row) => row.index_name.toLowerCase() === index_name.toLowerCase()
  );

  if (filteredData.length > 0) {
    res.json(filteredData);
  } else {
    res.status(404).json({ message: "Index not found" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
