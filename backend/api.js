const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const pool = mysql.createPool
({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: process.env.DB_MULTIPLESTATEMENTS

})
router.use((req,res,next) => {
    next();
});

router.get('/getlists',(req,res) => {
    pool.query('SELECT * FROM lists WHERE active=1;',function(err,result,fields) {
      if(err) throw err;
      res.send(result);
    })
  
  
  })
  
  
  router.get('/getlist/:id',(req,res) => {
    pool.query('SELECT * FROM lists WHERE id=?',req.params.id,function(err,result,fields) {
      if(err) throw err;
      pool.query('SELECT * FROM tasks WHERE listid=?',req.params.id,function(err2,result2,fields2) {
        if(err2) throw err2;
        if(result.length === 0)
        {
            res.sendStatus(404);
            return;
        }
        
        result[0]["tasks"] = result2;
        res.send(result);
      })
    })
  })
  
  
  router.get('/gettasks/:listID',(req,res) => {
    pool.query('SELECT * FROM tasks WHERE listid=?',req.params.listID,function(err,result,fields) {
      if(err) throw err;
      res.send(result);
    })
  })
  
  
  router.get('/getactivtasks/:listID',(req,res) => {
    pool.query('SELECT * FROM tasks WHERE active=1 listid=?',req.params.listID,function(err,result,fields) {
      if(err) throw err;
      res.send(result);
    })
  })
  
  
  router.post('/settask/enable/:id',(req,res) => {
    pool.query('UPDATE tasks SET active=1 WHERE id=?',req.params.id,function(err,result,fields) {
      if(err) throw err;
      res.sendStatus(200);
    })
    
  })
  
  router.post('/setlist/enable/:id',(req,res) => {
    pool.query('UPDATE lists SET active=1 WHERE id=?',req.params.id,function(err,result,fields) {
      if(err) throw err;
      res.sendStatus(200);
    })
    
  })
  
  router.post('/setlist/disable/:id',(req,res) => {
    pool.query('UPDATE lists SET active=0 WHERE id=?',req.params.id,function(err,result,fields) {
      if(err) throw err;
      res.sendStatus(200);
    })
  })
  
  router.post('/settask/disable/:id',(req,res) => {
    pool.query('UPDATE tasks SET active=0 WHERE id=?',req.params.id,function(err,result,fields) {
      if(err) throw err;
      res.sendStatus(200);
    })
    
  })

  router.post('/addtask',(req,res) => {
    pool.query('INSERT INTO tasks (listid,task) VALUES (?,?)',[req.body.listID,req.body.taskName],function(err,result,fields) {
      if(err) throw err;
      res.sendStatus(200);
    })
    
  })
  
  
  router.post('/deltask/:id',(req,res) => {
    pool.query('DELETE FROM tasks WHERE id=?',req.params.id,function(err,result,fields) {
      if(err) throw err;
      res.sendStatus(200);
    })
  })
  
  router.post('/createlist',(req,res) => {
   pool.query('INSERT INTO lists (name,startDate,duration,repeatAfter,AutoReset) VALUES (?,?,?,?,?)',[req.body.listName,req.body.startingDate,req.body.duration,req.body.repeatAfter,req.body.autoReset],function (err,result,field)
   {
    if(err) 
      {
        res.sendStatus(400);
        throw err;
      }
    let sql = '';
    for(let i = 0; i < req.body.tasks.length; i++)
    {
      sql += `INSERT INTO tasks (task,listid) VALUES (?,${result.insertId});`;
    }
    pool.query(sql,req.body.tasks,function (err,result2,field2) {
      if(err) 
      {
        res.sendStatus(400);
        throw err;
      }
      res.send("Moin");
    })
  
   })
  })

module.exports = router;
