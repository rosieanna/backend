import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "a",
  port: 5432
});
db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function checkVisited() {
  const result = await db.query("select country_code from visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisited();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const country = req.body["country"];
  const result = await db.query(
    "select country_code from countries where lower(country_name) like '%' || $1 || '%';", 
    [country]
  );
  if (result.rows.length > 0) {
    const countryCode = result.rows[0].country_code;
    try {
      await db.query(
        "insert into visited_countries (country_code) values ($1)", 
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
        const countries = await checkVisited();
        res.render("index.ejs", { 
          countries: countries,
          total: countries.length,
          error: "Country has already been added, try again.",
        });
    }
  } else {
    const countries = await checkVisited();
    res.render("index.ejs", { 
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
