import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import MySQLStore from "express-mysql-session";

const app = express();

const dbOptions = {
  host: "localhost",
  user: "root",
  password: "sena123",
  database: "bitirme",
};
const sessionStore = new MySQLStore(dbOptions);
app.use(
  session({
    secret: "KksEQPjP6l", // Güvenli bir rastgele anahtar
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

const port = 3001;

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "sena123",
  database: "bitirme",
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql bağlantısı başarılı");
});

app.use(bodyParser.json());
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

//LOGIN
// Kullanıcı girişi
app.post("/api/login", (req, res) => {
  const { nickname, password } = req.body;

  const query =
    "SELECT user_id, user_nickname FROM users WHERE user_nickname = ? AND user_password = ?";

  db.query(query, [nickname, password], (err, result) => {
    if (err) {
      console.error("Giriş başarısız.", err);
      res.status(500).send("Giriş başarısız.");
    } else {
      if (result.length > 0) {
        const userId = result[0].user_id;
        const userNickname = result[0].user_nickname;

        req.session.userNickname = userNickname; // Oturum verilerine kullanıcı adını ekle

        console.log("Kullanıcının ID'si:", userId);
        console.log("Oturuma eklenen kullanıcı adı (nickname):", userNickname);

        console.log("Sorgu Sonucu:", result);
        console.log("user_nickname Değeri:", result[0].user_nickname);

        res.json({ success: true, message: "Giriş başarılı", userId });
      } else {
        res.status(401).json("E-posta veya şifre hatalı.");
      }
    }
  });
});

// Kullanıcı profil bilgilerini getirme
app.get("/api/profile", (req, res) => {
  const userNickname = req.session.userNickname; // Güncelleme burada
  console.log("Oturumdan alınan kullanıcı adı (nickname):", userNickname);
  console.log("Oturum verisi:", req.session);

  if (!userNickname) {
    return res.status(401).json({ error: "Kullanıcı oturumu bulunamadı." });
  }

  const query = "SELECT * FROM users WHERE user_nickname = ?"; // Güncelleme burada
  db.query(query, [userNickname], (err, result) => {
    if (err) {
      console.error("Kullanıcı bilgileri alınamadı.", err);
      res.status(500).json({ error: "Kullanıcı oturumu bulunamadı." });
    } else {
      if (result.length > 0) {
        const userData = result[0];
        res.json({
          user_name: userData.user_name,
          user_surname: userData.user_surname,
          user_mail: userData.user_mail,
          user_phone: userData.user_phone,
          user_address: userData.user_address,
          user_type: userData.user_type,
          user_nickname: userData.user_nickname,
        });
      } else {
        res.status(404).json({ error: "Kullanıcı bulunamadı." });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
