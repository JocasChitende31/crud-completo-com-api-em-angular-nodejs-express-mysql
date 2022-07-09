//
const express = require('express');
const cors = require('cors');
//const bodyparser = require('body-parser');
const mysql = require('mysql2');
const app = express();


app.use(cors());

//app.use(cors);
//app.use(bodyparser);
//conectar a base de dados com o server.
//database connection.

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simpledb',
    port: 3306
});

//test database connection
db.connect(err => {
    if (err) { console.log(err, 'dberr'); }
    console.log('database connected...');
})

//get all date
app.get("/users", (req, res) => {

    let qr = "select * from users";
    db.query(qr, (err, result) => {

        if (err) {
            console.log(err, 'errs')
        }
        if (result.length > 0) {
            res.send({
                message: "all user date",
                data: result
            });
        }
    });

    //console.log('get all users');    
});

//get single user data
app.get("/users/:id", (req, res) => {

    //console.log('get single user date');
    let gID = req.params.id;

    let qr = `select * from users where id= ${gID}`;
    db.query(qr, (err, result) => {

        if (err) {
            console.log(err, 'errs')
        }
        if (result.length > 0) {
            res.send({
                massege: 'get single user data',
                data: result
            })
        }
        else {
            res.send({
                message: 'user not found.'
            })

        }
    });
})

//to call bodyparser
const bodyparser = require('body-parser');
//const { response } = require('express');
//to suport a json-encoded bodies
app.use(bodyparser.json());
//to support a url-encoded bodies
app.use(bodyparser.urlencoded({

    extended: true
}));

//create data or post
app.post('/users', function (req, res) {

    console.log(req.body, 'createdata');
    //Tem-se a variável id pelo facto do mesmo ser introduzido manual, pois, não é um id auto incremental.
    let pID = req.body.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;


    let qr = `INSERT INTO users (id, fullname, email, mobile) 
                VALUES('${pID}','${fullName}','${eMail}','${mb}')`;
    console.log(qr, 'qr');

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result, 'result')
        res.send({
            message: 'data inserted'
        });
    });

    //console.log('postdate'); 
});

//update single data
app.put('/users/:id', (req, res) => {

    console.log(req.body, 'updatedata');

    let gID = req.params.id;
    //actualiza também o id pelo simples ffaacto: o id da tabela user não auto incremetaado, mas sim manual.
    //let pID = req.body.id;
    let fullName = req.body.fullname;
    let eMail = req.body.email;
    let mb = req.body.mobile;

    //id = '${pID}',
    let qr = `UPDATE users SET   fullname = '${fullName}', email = '${eMail}', mobile = '${mb}' 
                WHERE id = '${gID}'`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.send({
            message: 'data updated'
        });
    });

})

// delete single data

app.delete('/users/:id', (req,res)=>{

    let qID=req.params.id;

    let qr = `DELETE FROM users WHERE id = ${qID} `;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err);
        }
        res.send({
            message: "data deleted"
        });
    });
})

//3000 porta aond o app vai rodar
app.listen(3000, () => {
    console.log('server runnin...');
})

function newFunction() {
    app.use(express.json());
}
