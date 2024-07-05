//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

let password = "fuck";
let passwordCheck = false;

app.use(bodyParser.urlencoded({extended: true}));

function check(req, res, next) {
  if (req.body["password"] === password) {
    passwordCheck = true;
  }
  next();
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
})

app.post("/check", check, (req, res) => {
    if (passwordCheck) {
        res.sendFile(__dirname + "/public/secret.html");
    } else {
        res.sendFile(__dirname + "/public/index.html");
    }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
