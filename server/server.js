import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = 3001;
app.use(cors({ origin: "http://localhost:3000" }));

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
  } = req.body;

  const saltRounds = 10; // Salt tur sayısı
  const hashedPassword = bcrypt.hashSync(userPassword, saltRounds);
  const sql = `INSERT INTO users (user_name, user_surname, user_mail, user_phone, user_address, user_password, user_type ) VALUES ('${userName}','${userSurname}','${userMail}','${userPhone}','${userAddress}','${hashedPassword}','${userType}')`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Kullanıcı kaydı sırasında hata oluştu:", err.message);
      return res
        .status(500)
        .json({ error: "Kullanıcı kaydı sırasında hata oluştu" });
    }
    console.log("Yeni kullanıcı başarıyla eklendi.");
    res.status(200).json({ message: "Kullanıcı başarıyla eklendi." });
  });
});

//LOGIN
app.post("/api/login", (req, res) => {
  const { userMail, password } = req.body;

  // Veritabanından kullanıcıyı sorgula
  const query = "SELECT * FROM users WHERE user_mail = ?";
  db.query(query, [userMail], (err, result) => {
    if (err) {
      console.error("Veritabanı sorgu hatası:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      if (result.length > 0) {
        const user = result[0];
        // Kullanıcı varsa, şifreyi kontrol et
        bcrypt.compare(
          password,
          user.user_password,
          (bcryptErr, bcryptResult) => {
            if (bcryptErr) {
              console.error("bcrypt karşılaştırma hatası:", bcryptErr);
              res.status(500).json({ message: "Internal Server Error" });
            } else {
              if (bcryptResult) {
                // Şifre doğru ise giriş başarılı
                res.status(200).json({ message: "Giriş başarılı", user });
              } else {
                // Şifre yanlış ise hata döndür
                res
                  .status(401)
                  .json({ message: "Hatalı kullanıcı adı veya şifre" });
              }
            }
          }
        );
      } else {
        // Kullanıcı bulunamadı
        res.status(401).json({ message: "Hatalı kullanıcı adı veya şifre" });
      }
    }
  });
});
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
