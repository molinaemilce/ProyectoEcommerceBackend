const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Importacion de rutas
const productsRutas = require('./routes/productsRouter');
const carritoRutas = require('./routes/carritoRouter');






//Ruta de aplicación
app.use('/productos', productsRutas);
app.use('/carrito', carritoRutas);

//Servidor corriendo
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Corriendo en el puerto ${PORT}`);
})
