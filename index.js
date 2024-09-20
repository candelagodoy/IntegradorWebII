const express = require('express');
const pug = require('pug');
//const cors = require('cors');
const path = require('path');


const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/',require('./routes/home'));




app.listen(3000,()=>{
    console.log("servidor levantado");
});