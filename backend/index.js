const express = require('express'); //Line 1
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cron = require('node-cron');
const dotenv = require('dotenv').config();
const path = require('node:path');
const pool = mysql.createPool

({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: process.env.DB_MULTIPLESTATEMENTS

})
const app = express(); //Line 2
const port = process.env.PORT; //Line 3
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cron.schedule('8 2 * * *', async () => {
pool.query('SELECT * from lists where repeatAfter IS NOT NULL AND repeatOn IS NULL',function(err,result,fields) {
  if(err) throw err;
  for(let i = 0; i < result.length;i++)
  {
    let startDate = new Date(result[i].startDate);
    let repeatOn = new Date(startDate);
    repeatOn.setDate(startDate.getDate() + (result[i].repeatAfter));
    pool.query('UPDATE lists SET repeatOn = ? WHERE id=?',[repeatOn,result[i].id],function(err2,result2,fields2) {
      if(err2) throw err2;
    })
  }
})

let today = new Date();

let dateString = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;


pool.query('SELECT * from lists where repeatOn=?',[dateString],function(err,result,fields){
  if (err) throw err;
  
  for(let i = 0; i < result.length;i++)
  {
    if(result[i].AutoReset === 1)
    pool.query('UPDATE tasks SET active=1 where listid=?',[result[i].id]);

    pool.query('UPDATE lists SET repeatOn=NULL,startDate=? where id=?',[dateString,result[i].id])
  }
})




})

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

const api = require("./api");
app.use('/api',api);
const auth = require("./auth.js");
app.use('/auth',auth);


if(process.env.NODE_ENV === 'production')
{
  app.use(express.static(path.join(__dirname,'..','frontend','build')))

app.use('*',function(request,response) {
  response.sendFile(path.resolve(__dirname,'..','frontend','build','index.html'))
})

}