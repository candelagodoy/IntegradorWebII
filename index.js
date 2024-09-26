const express = require('express');
const pug = require('pug');
//const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended:true}))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',require('./routes/home'));



app.listen(3000,()=>{
    console.log("servidor levantado");
});