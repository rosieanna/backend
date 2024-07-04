import express from "express";
import morgan from "morgan";
import cowsay from "cowsay";

const app = express();
const port = 3000;

app.use(morgan('common'));

app.get("/", nonsense, (req, res) => {
  res.send("Hello");
});

function nonsense(req, res, next) {
  console.log(cowsay.say({ text : `I hate Duck Fuck` }));
  next();
}

app.listen(port, () => {
  console.log(cowsay.say({
    text : `Listening on port ${port}`
  }));
});
