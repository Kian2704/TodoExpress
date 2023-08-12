const express = require('express'); //Line 1
const router = express.Router();
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
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

router.get('/logout',async(req,res) => {
    res.clearCookie('AT');
    res.sendStatus(200);
})

router.post('/users',async (req,res) => {
    try {
        let username = req.body.username;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        pool.query('INSERT INTO users (username,password) VALUES (?,?)',[username,hashedPassword],function(err,result,fields) {
            
            if(err) {
                if(err.code == 'ER_DUP_ENTRY')
                res.sendStatus(409);
                return;
            }
            res.sendStatus(201);
        })
        
    }
    catch (e){
        res.status(500).send(e.stack);
    }
})

router.get('/auth',authToken,(req,res) => {
    if(req.user === null)
    req.sendStatus(403);
    else
    {
        res.send(req.user)
    }
})


router.post('/login',async(req,res) => {
    try {
        let username = req.body.username;
        const password = req.body.password;
        pool.query('SELECT * FROM users WHERE username=?',username, async function (err,result,fields) {
        if(result.length === 0)
        {
            res.sendStatus(404);
            return;
        }

        const user = await JSON.parse(JSON.stringify(result[0]));
        const allowed = await bcrypt.compare(password,user.password);
        if(!allowed)
        {
            res.sendStatus(403);
            return;
        }

        const accessToken = jwt.sign(user,process.env.ACCES_TOKEN_SECRET);
        res.cookie('AT',accessToken, {
            httpOnly: true,
            sameSite: 'lax'
        });
        res.sendStatus(200);
        
        } )
    }catch {
        res.sendStatus(500);
    }
})

function authToken(req,res,next) {
    const token = req.cookies['AT'];
    if(token === null) return res.sendStatus(401);

    jwt.verify(token,process.env.ACCES_TOKEN_SECRET,(err,user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
module.exports = router;