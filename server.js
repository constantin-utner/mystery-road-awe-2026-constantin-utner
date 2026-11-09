import express from "express";

const app = express();
const port = 3001;
const dataDirectory = `${import.meta.dirname}/public/data`;

async function simulateApiConditions(req, res, next) {
  const delay = Number(req.query.delay ?? 0);

  if (delay > 0 && delay <= 5000) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  if (req.query.error === "true") {
    return res.status(500).json({ message: "Simulierter Serverfehler" });
  }

  next();
}

app.get("/api/case", simulateApiConditions, (req, res) => {
  const fileName = req.query.id === "b" ? "case-b.json" : "case.json";
  res.sendFile(`${dataDirectory}/${fileName}`);
});

app.get("/api/evidence", simulateApiConditions, (_req, res) => {
  res.sendFile(`${dataDirectory}/evidence.json`);
});

app.get("/api/people", simulateApiConditions, (_req, res) => {
  res.sendFile(`${dataDirectory}/people.json`);
});

app.get("/api/locations", simulateApiConditions, (_req, res) => {
  res.sendFile(`${dataDirectory}/locations.json`);
});

app.get("/api/timeline", simulateApiConditions, (_req, res) => {
  res.sendFile(`${dataDirectory}/timeline.json`);
});

app.listen(port, "127.0.0.1", () => {
  console.log(`API läuft auf http://127.0.0.1:${port}`);
});
