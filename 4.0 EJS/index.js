import express from "express";
import cowsay from "cowsay";

const app = express();
const port = 3000;
const d = new Date();
let day = d.getDay();
let script = "";

if (day == 0 || day == 6) {
    script = "It's weekend";
} else {
    script = "It's weekday";
}


app.get("/", (req, res) => {
    res.render("index.ejs", {message: script});
})

app.listen(port, () => {
    console.log(cowsay.say({
      text : `All hail on port ${port}`,
      f: 'yasuna_06',
    }));
  });