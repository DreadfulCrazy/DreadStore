require('./config/index');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser'); // Libreria que se utiliza para obtener la informacion que se nos envie en u n JSON

//normalmente todo lo que lleve el app.use significa que es un midelware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));// path se usa cuando una carpeta esta fuera de la carpeta del servidor

//Routes
app.use(require('./routes/index'));


mongoose.connect(process.env.urlDB,
                {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true},
                (err,res) => { // se realiza el callbac para ver si realiza la coneccion o no con la db
                    if (err) throw err;
                    
                    console.log('Base de datos Online');

});

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando puerto ${process.env.PORT}`);
});