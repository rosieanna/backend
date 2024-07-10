import express from "express";
import axios from "axios";
import cowsay from "cowsay";

const app = express();
const port = 3000;
const API_URL = "http://api.openweathermap.org/data/2.5/";
const API_Key = "d0313c721bec2ec2de4b9825d499e007";

let city = "Hanoi";

app.get("/", async (req, res) => {
    const result = await axios(API_URL + "forecast", {
        params: {
            q: city,
            appid: API_Key,
            lang: "vi",
            units: "metric",
        }
    });
    res.json(result.data);
})

app.listen(port, () => {
    console.log(cowsay.say({
      text : `All hail on port ${port}`,
      f: 'yasuna_06',
    }));
});