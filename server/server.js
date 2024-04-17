import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import MySQLStoreFactory from "express-mysql-session";

const MySQLStore = MySQLStoreFactory(session);

const app = express();
const port = 3001;
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "sena123",
  database: "bitirme",
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "sena123",
  database: "bitirme",
  createDatabaseTable: false,
  schema: {
    tableName: "sessions",
    columnNames: {
      session_id: "session_id",
      expires: "expires",
      data: "data",
    },
  },
};
const sessionStore = new MySQLStore(options);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  session({
    key: "cookine_name",
    secret: "session_cookie_secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

// Optionally use onReady() to get a promise that resolves when store is ready.
sessionStore
  .onReady()
  .then(() => {
    // MySQL session store ready for use.
    console.log("MySQLStore ready");
  })
  .catch((error) => {
    // Something went wrong.
    console.error(error);
  });

app.get("/", (req, res) => {
  req.session.isAuth = true;
  console.log(req.session);
  res.send("hello sessions");
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Mysql bağlantısı başarılı");
});

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("api/login");
  }
};

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
      // Kullanıcı bulunduğunda oturumu işaretle
      req.session.isAuth = true;
      req.session.user_id = rows[0].user_id; // Kullanıcı kimliğini kaydet

      res.json({
        message: "Giriş Başarılı",
        session: req.session.user_id, // Kullanıcı kimliğini döndür
      });
      console.log(req.session.user_id);
    } else {
      res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
    }
  } catch (error) {
    console.error("hata:", error.stack);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

// SESSION INFO
app.get("/api/session-user", (req, res) => {
  // Oturum içinde isAuth ve user_id varsa, bu değerleri gönder
  const isAuth = req.session.isAuth;
  const userId = req.session.user_id;

  if (isAuth && userId) {
    res.json({ isAuth, userId });
  } else {
    res.status(401).json({ message: "Kullanıcı oturumu bulunamadı." });
  }
});

// Kullanıcı profilini alma endpoint'i
app.get("/api/profile", isAuth, async (req, res) => {
  const userId = req.session.user_id;

  try {
    // Kullanıcının profil bilgilerini veritabanından çek
    const [rows, fields] = await db
      .promise()
      .query("SELECT * FROM users WHERE user_id = ?", [userId]);

    if (rows && rows.length > 0) {
      const userProfile = {
        userId: rows[0].user_id,
        username: rows[0].user_name, // Kullanıcı adını buradan al
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
  } catch (error) {
    console.error("Profil bilgileri alınırken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası" });
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

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

//profil güncelle
app.put("/api/updateProfile", isAuth, async (req, res) => {
  const userId = req.session.user_id;
  const {
    userName,
    userSurname,
    userMail,
    userPhone,
    userAddress,
    userType,
    userNickname,
  } = req.body;

  // Gelen verilerin kontrolü
  if (
    !userName ||
    !userSurname ||
    !userMail ||
    !userPhone ||
    !userAddress ||
    !userType ||
    !userNickname
  ) {
    return res.status(400).json({ message: "Tüm alanları doldurunuz" });
  }

  try {
    // Veritabanında kullanıcının profil bilgilerini güncelle
    await db
      .promise()
      .query(
        "UPDATE users SET user_name = ?, user_surname = ?, user_mail = ?, user_phone = ?, user_address = ?, user_type = ?, user_nickname = ? WHERE user_id = ?",
        [
          userName,
          userSurname,
          userMail,
          userPhone,
          userAddress,
          userType,
          userNickname,
          userId,
        ]
      );

    res.status(200).json({ message: "Profil bilgileri başarıyla güncellendi" });
  } catch (error) {
    console.error("Profil bilgileri güncellenirken hata oluştu:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});

app.listen(port, () => {
  console.log(`Server ${port} portunda çalışıyor`);
});
