import mysql2 from "mysql2";
import express from "express";

const app = express();

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "sena123",
  database: "bitirme",
});
app.get("/", (req, res) => {
  res.json("hello this is backend");
});

app.get("/users", (req, res) => {
  const user = "SELECT * FROM users";
  db.query(user, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/users", (req, res) => {
  const user = "INSERT INTO users (`user_name`,`user_mail`) VALUES (?)";
  const values = ["can", "cansaginc@hotmail.com"];

  db.query(user, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("New users added");
  });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
