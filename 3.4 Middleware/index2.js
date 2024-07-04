import express from "express";
import morgan from "morgan";
import cowsay from "cowsay";

const app = express();
const port = 3000;

// app.use(morgan('common'));
app.use(logger);

function logger(req, res, next) {
  console.log("Request method: " + req.method);
  console.log("Request url   : " + req.url);
  next();
}

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(cowsay.say({
    text : `All hail on port ${port}`,
    f: 'yasuna_06',
  }));
});
