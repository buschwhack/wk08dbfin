const express = require('express');
const path = require('path');
let app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: '7062',
    port: '8889'
});

connection.connect((err)=>{
    if(err){
        return console.log(err.message);
    }
    console.log("connect to local db");
});


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));



app.get('/', function (req, res) {
    let title = "Week 08 Company";
    res.render('landing', { tdata: title });
});

app.get('/about', (req, res) => {
    let title = "About EJS";
    res.render('landing', { tdata: title });
});

app.get('/staff', function (req, res) {
    let title = "EJS Staff";
    let readstaff = "SELECT id, first_name, last_name FROM employees";
    connection.query(readstaff, (err, rows)=>{ 
        if(err) throw err;
        //console.log(rows);
        res.render('people', {tdata: title, rows});
    });

    
});

app.get('/person', (req, res) => {
    let title = "EJS Member";
    let rowid= req.query.id;
    let read = `SELECT * FROM employees WHERE id=${rowid} `;

    connection.query(read, (err, rows)=>{ 
        if(err) throw err;
        //get the only row from the data rows and make it a simple object
        let row = rows[0];
        res.render('member', { tdata: title,  row});
    });
});

app.listen(process.env.PORT || 3000);
console.log('Server is listening on  localhost:3000/');