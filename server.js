import express from "express";

const app = express();
const port = 3001;
const dataDirectory = `${import.meta.dirname}/public/data`;

app.get("/api/case", (_req, res) => {
  res.sendFile(`${dataDirectory}/case.json`);
});

app.get("/api/evidence", (_req, res) => {
  res.sendFile(`${dataDirectory}/evidence.json`);
});

app.get("/api/people", (_req, res) => {
  res.sendFile(`${dataDirectory}/people.json`);
});

app.get("/api/locations", (_req, res) => {
  res.sendFile(`${dataDirectory}/locations.json`);
});

app.get("/api/timeline", (_req, res) => {
  res.sendFile(`${dataDirectory}/timeline.json`);
});

app.listen(port, "127.0.0.1", () => {
  console.log(`API läuft auf http://127.0.0.1:${port}`);
});
