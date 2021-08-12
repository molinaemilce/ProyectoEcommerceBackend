const express = require('express');
const router = express.Router();

//Instanciamos el servicio de products
const Products = require('../controllers/productController');
const productsController = new Products();



router.get('/listar/:id?', async(req,res)=>{
    const id = req.params.id;
    res.json(await productsController.getProducts(id))
})

router.post('/agregar', async (req,res)=>{
    res.json(await  productsController.addProducto(req.body))
})

router.put('/actualizar/:id', async(req,res)=>{
    let idProducto = req.params.id;
    let productoDataNueva = req.body;
    res.json(await productsController.updateProducto(idProducto, productoDataNueva))
})

router.delete('/borrar/:id', async(req,res)=>{
    res.json(await productsController.deleteProducto(req.params.id))
})

module.exports = router;