import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";

const app = express();
const port = 3001;

app.use(bodyParser.json());

/*app.use(
  session({
    secret: "KksEQPjP6l", // Güvenli bir rastgele anahtar
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);*/

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

// Kullanıcı modeli
const User = {
  findByNicknameAndPassword: (nickname, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE user_nickname = ? AND user_password = ?",
        [nickname, password],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results[0]);
        }
      );
    });
  },
};
// Login endpoint'i
app.post("/api/login", async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const user = await User.findByNicknameAndPassword(nickname, password);

    if (user) {
      res.json({ message: "Giriş Başarılı" });
    } else {
      res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

/* Kullanıcı profil bilgilerini getirme
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
});*/
app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
