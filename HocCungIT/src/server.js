import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("sample.ejs", {
        saySomeThing: "<h1>Welcum to Herogasm</h1>",
    });
});

app.listen(port, () => {
    console.log(`Server runs on port ${port}`);
})