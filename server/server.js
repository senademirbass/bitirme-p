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
    checkExpirationInterval: 900000, // 15 dakika
    expiration: 86400000, // 1 gün
    createDatabaseTable: true,
    schema: {
      tableName: "sessions",
      columnNames: {
        session_id: "sessions_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 1000, // 1 saat
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    },
  })
);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql bağlantısı başarılı");
});

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

  // Önce var olan kullanıcının kontrolü
  const checkUserQuery = "SELECT * FROM users WHERE user_mail = ?";
  db.query(checkUserQuery, [userMail], (checkUserErr, checkUserResult) => {
    if (checkUserErr) {
      console.error(
        "Kullanıcı kontrolü sırasında hata oluştu:",
        checkUserErr.message
      );
      return res
        .status(500)
        .json({ error: "Kullanıcı kontrolü sırasında hata oluştu" });
    }

    // Eğer kullanıcı zaten varsa hata döndür
    if (checkUserResult && checkUserResult.length > 0) {
      return res.status(400).json({ error: "Bu e-posta adresi zaten kayıtlı" });
    }

    // Eğer kullanıcı yoksa yeni kullanıcı ekle
    const insertUserQuery = `INSERT INTO users (user_name, user_surname, user_mail, user_phone, user_address, user_password, user_type, user_nickname) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(
      insertUserQuery,
      [
        userName,
        userSurname,
        userMail,
        userPhone,
        userAddress,
        userPassword,
        userType,
        userNickName,
      ],
      (err, result) => {
        if (err) {
          console.error("Kullanıcı kaydı sırasında hata oluştu:", err.message);
          return res
            .status(500)
            .json({ error: "Kullanıcı kaydı sırasında hata oluştu" });
        }
        console.log("Yeni kullanıcı başarıyla eklendi.");
        res.status(200).json({ message: "Kullanıcı başarıyla eklendi." });
        console.log(result);
      }
    );
  });
});

// Oturumu başlat
// LOGIN
app.post("/api/login", async (req, res) => {
  const { nickname, password } = req.body;

  try {
    const [rows, fields] = await db
      .promise()
      .query(
        "SELECT * FROM users WHERE user_nickname = ? AND user_password = ?",
        [nickname, password]
      );

    if (rows && rows.length > 0) {
      const user = {
        userId: rows[0].user_id,
      };

      // Eğer 'data' alanı yoksa oluştur
      req.session.data = req.session.data || {};

      // 'data' içinde 'user_id' bilgisini sakla
      req.session.data.user_id = user.userId;

      // Oturum veritabanına kaydedilen bilgileri güncelle
      sessionStore.set(req.sessionID, { ...req.session }, (err) => {
        if (err) {
          console.error("Oturum veritabanına güncelleme hatası:", err);
        }
      });

      res.json({
        message: "Giriş Başarılı",
        session: req.session.data.user_id,
      });
      console.log(req.session.data.user_id);
    } else {
      res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
    }
  } catch (error) {
    console.error("hata:", error.stack);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});
// Middleware'i kullan
app.use((req, res, next) => {
  if (!req.session.data) {
    // Eğer req.session.data henüz oluşturulmamışsa, oluştur
    req.session.data = {};
  }

  if (req.session && req.session.user && req.session.user.userId) {
    // Eğer kullanıcı giriş yapmışsa, user_id'yi req.session.data içinde güncelle
    req.session.data.user_id = req.session.user.userId;

    // Oturum veritabanına kaydedilen bilgileri güncelle
    sessionStore.set(req.sessionID, { ...req.session }, (err) => {
      if (err) {
        console.error("Oturum veritabanına güncelleme hatası:", err);
      }
      next();
    });
  } else {
    // Kullanıcı giriş yapmamışsa devam et
    next();
  }
});

//SESSION INFO
app.get("/api/session-user", (req, res) => {
  // req.session.data içinde user_id varsa, bu değeri gönder
  const userId = req.session.data.user_id;

  if (userId) {
    res.json({ userId });
  } else {
    res.status(401).json({ message: "Kullanıcı oturumu bulunamadı." });
  }
});

// PROFILE
app.get("/api/profile", async (req, res) => {
  if (req.session && req.session.user && req.session.user.userId) {
    const userId = req.session.user.userId;

    // Kullanıcının profil bilgilerini veritabanından çek
    const [rows, fields] = await db
      .promise()
      .query("SELECT * FROM users WHERE user_id = ?", [userId]);

    if (rows && rows.length > 0) {
      const userProfile = {
        userId: req.session.user.userId,
        username: req.session.user.username,
        usersurname: rows[0].user_surname,
        usermail: rows[0].user_mail,
        userphone: rows[0].user_phone,
        useraddress: rows[0].user_address,
        user_type: rows[0].user_type,
        user_nickname: rows[0].user_nickname,
      };

      res.json({ userProfile, session: req.session });
    } else {
      res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
  } else {
    res.status(401).json({ message: "Giriş yapmış bir kullanıcı bulunamadı" });
  }
});

// CREATE AD
app.post("/createAd", (req, res) => {
  const { title, content, closingDate } = req.body;

  const insertAd = `INSERT INTO helps (ad_title, ad_desc, ad_finish) VALUES (?,?,?)`;
  db.query(insertAd, [title, content, closingDate], (err, result) => {
    if (err) {
      console.error("İlan kaydı sırasında hata oluştu:", err.message);
      return res
        .status(500)
        .json({ error: "İlan kaydı sırasında hata oluştu" });
    }
    console.log("Yeni ilan başarıyla eklendi.");
    res.status(200).json({ message: "İlan başarıyla eklendi." });
    console.log(result);
  });
});

// AD DETAILS
app.get("/api/cards", (req, res) => {
  const query = "SELECT ad_title, ad_desc, ad_finish FROM helps";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Veri çekme hatası: " + err.stack);
      res.status(500).send("Veri çekme hatası");
      return;
    }
    // Çekilen verileri JSON formatında gönder
    res.json(results);
  });
});

// VOLUNTEER API
app.post("/api/volunteer", (req, res) => {
  const { userId, helpId } = req.body;

  // Yardım ilanını güncelle, gönüllüyü ata
  const updateQuery = `UPDATE helps SET user_id = ? , status = 'in progress' WHERE ad_id = ?`;
  db.query(updateQuery, [userId, helpId], (updateErr, updateResult) => {
    if (updateErr) {
      console.error("Gönüllü atama hatası: " + updateErr.stack);
      res.status(500).send("Gönüllü atama hatası");
      return;
    }

    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
