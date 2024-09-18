const express = require('express');
const pug = require('pug');
//const cors = require('cors');


const app = express();
app.set('view engine', 'pug');
app.use('/',require('./routes/home'));




app.listen(3000,()=>{
    console.log("servidor levantado");
});