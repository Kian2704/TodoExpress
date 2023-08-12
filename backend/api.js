const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: process.env.DB_MULTIPLESTATEMENTS,
});
router.use(cookieParser());
router.use((req, res, next) => {
  next();
});

function authToken(req, res, next) {
  const token = req.cookies["AT"];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.get("/getlists", authToken, (req, res) => {
  pool.query(
    "SELECT lists.* FROM lists JOIN users ON lists.owner = users.id WHERE active=1 AND lists.owner = ?",
    req.user.id,
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/getlist/:id", authToken, (req, res) => {
  pool.query(
    "SELECT * FROM lists WHERE id=? AND owner=?",
    [req.params.id, req.user.id],
    function (err, result, fields) {
      if (err) throw err;
      pool.query(
        "SELECT * FROM tasks WHERE listid=?",
        req.params.id,
        function (err2, result2, fields2) {
          if (err2) throw err2;
          if (result.length === 0 || result[0].owner !== req.user.id) {
            res.sendStatus(404);
            return;
          }

          result[0]["tasks"] = result2;
          res.send(result);
        }
      );
    }
  );
});

router.get("/gettasks/:listID", authToken, (req, res) => {
  pool.query(
    "SELECT tasks.* FROM tasks JOIN lists ON tasks.listid=lists.id WHERE tasks.listid=? AND lists.owner = ?",
    [req.params.listID, req.user.id],
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/getactivtasks/:listID", authToken, (req, res) => {
  pool.query(
    "SELECT tasks.* FROM tasks JOIN lists ON tasks.listid=lists.id WHERE tasks.listid=? AND lists.owner = ? AND tasks.active=1",
    [req.params.listID, req.user.id],
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.post("/settask/enable/:id", authToken, (req, res) => {
  pool.query(
    "UPDATE tasks JOIN lists ON tasks.listid = lists.id SET tasks.active = 1 WHERE tasks.id=? AND lists.owner = ?",
    [req.params.id, req.user.id],
    function (err, result, fields) {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

router.post("/setlist/enable/:id", authToken, (req, res) => {
  pool.query(
    "UPDATE lists SET active=1 WHERE id=? AND owner=?",
    [req.params.id, req.user.id],
    function (err, result, fields) {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

router.post("/setlist/disable/:id", authToken, (req, res) => {
  pool.query(
    "UPDATE lists SET active=0 WHERE id=? AND owner=?",
    [req.params.id, req.user.id],
    function (err, result, fields) {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

router.post("/settask/disable/:id", authToken, (req, res) => {
  pool.query(
    "UPDATE tasks JOIN lists ON tasks.listid = lists.id SET tasks.active=0 WHERE tasks.id=? AND lists.owner = ?",
    [req.params.id, req.user.id],
    function (err, result, fields) {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

router.post("/addtask", authToken, (req, res) => {
  pool.query(
    "INSERT INTO tasks (listid,task) VALUES (?,?)",
    [req.body.listID, req.body.taskName],
    function (err, result, fields) {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

router.post("/deltask/:id", authToken, (req, res) => {
  pool.query(
    "DELETE tasks FROM tasks JOIN lists ON tasks.listid = lists.id WHERE tasks.id = ? AND lists.owner = ?;",
    [req.params.id, req.user.id],
    function (err, result, fields) {
      if (err) throw err;
      res.sendStatus(200);
    }
  );
});

router.post("/createlist", authToken, (req, res) => {
  if(req.body.startingDate)
    req.body.duration = req.body.duration || 1;
  pool.query(
    "INSERT INTO lists (name,startDate,duration,repeatAfter,AutoReset,owner) VALUES (?,?,?,?,?,?)",
    [
      req.body.listName,
      req.body.startingDate,
      req.body.duration,
      req.body.repeatAfter,
      req.body.autoReset,
      req.user.id,
    ],
    function (err, result, field) {
      try {
        if (err) throw err;
        let sql = "";
        for (let i = 0; i < req.body.tasks.length; i++) {
          sql += `INSERT INTO tasks (task,listid) VALUES (?,${result.insertId});`;
        }
        pool.query(sql, req.body.tasks, function (err, result2, field2) {
          if (err) throw err;
          res.sendStatus(201);
        });
      } catch {
        res.sendStatus(500);
      }
    }
  );
});

module.exports = router;
