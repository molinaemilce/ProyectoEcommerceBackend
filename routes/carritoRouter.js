const express = require('express');
const router = express.Router();

const Carrito = require('../controllers/carritoController');

const carritoProducto = new Carrito()

router.get('/listar/:id?', async(req,res)=>{
    res.json(await carritoProducto.getCarritoProducto(req.params.id))
})


router.post('/agregar/:id_producto', async(req,res)=>{
    res.json(await carritoProducto.addCarritoProducto(req.params.id_producto))
})


router.delete('/borrar/:id', async(req,res)=>{
    res.json( await carritoProducto.deleteCarritoProducto(req.params.id))
})

module.exports = router;