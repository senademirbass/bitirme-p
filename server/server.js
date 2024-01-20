import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import MySQLStoreImport from "express-mysql-session";

const MySQLStore = MySQLStoreImport(session);

const app = express();
const port = 3001;
const secretKey = "1928918291839819212";
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "sena123",
  database: "bitirme",
});

const sessionStore = new MySQLStore(
  {
    expiration: 86400000,
    createDatabaseTable: false,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { secure: true },
  })
);

app.use(bodyParser.json());

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql bağlantısı başarılı");
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.options("*", cors());

// REGISTER
app.post("/register", (req, res) => {
  const {
    userName,
    userSurname,
    userMail,
    userPhone,
    userAddress,
    userPassword,
    userType,
    userNickName,
  } = req.body;

  /*const saltRounds = 10; // Salt tur sayısı
  const hashedPassword = bcrypt.hashSync(userPassword, saltRounds);*/
  const sql = `INSERT INTO users (user_name, user_surname, user_mail, user_phone, user_address, user_password, user_type, user_nickname ) VALUES ('${userName}','${userSurname}','${userMail}','${userPhone}','${userAddress}','${userPassword}','${userType}','${userNickName}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Kullanıcı kaydı sırasında hata oluştu:", err.message);
      return res
        .status(500)
        .json({ error: "Kullanıcı kaydı sırasında hata oluştu" });
    }
    console.log("Yeni kullanıcı başarıyla eklendi.");
    res.status(200).json({ message: "Kullanıcı başarıyla eklendi." });
    console.log(result);
  });
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const [rows, fields] = db.query(
      "SELECT * FROM users WHERE user_nickname = ? AND user_password = ?",
      [nickname, password]
    );

    if (rows && rows.length > 0) {
      req.session.user = {
        userId: rows[0].user_id,
        username: rows[0].user_nickname,
      };

      res.json({ message: "Giriş Başarılı" });
    } else {
      res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
