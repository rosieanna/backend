import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

let bandName = "";

app.use(bodyParser.urlencoded({extended: true}));

function bandNameGenerator(req, res, next) {
  bandName = req.body["street"] + req.body["pet"]
  next();
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.post("/submit", bandNameGenerator, (req, res) => {
  res.send(`<h1>Your band name: ${bandName} </h1>`);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
