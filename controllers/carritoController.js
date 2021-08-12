
const {leer,escribir,agregar} = require('../persistencia/products');
const productos = require('../../Entrega_Final/entregable/api/productos');

class Carrito{

    #file = 'carritoProducts.json';

    constructor(){
        this.carrito=[]; //Se guardan LOS PRODUCTOS
        this.producto = []; //se guardan cada producto
    }



    async getCarritoProducto(productsId){
        this.carrito = await leer(this.#file);

        if(productsId){
            let producto = this.carrito.filter(producto => producto.id == productsId)
            if(producto.length != 0){
                return producto
            }else{
                return {error: 'No se ha encontrado el producto'}
            }
        }else{
            if(this.carrito.length == 0){
                return { error : 'Carrito vacío'}
            }
            return this.carrito
        }
    }
    async addCarritoProducto(productoId){
        this.carrito = await leer(this.#file); //Lo que hay en el carrito
        
        let productosdb = await leer('products.json');//Trae los productos 
    
        //Selecciona producto id con sus datos
        let compraProductoId = productosdb.filter(producto=>{
            if(producto.id == productoId){
                return producto
            }
        })
        if(compraProductoId.length == 0){
            return {error : 'No se ha encontrado el producto'}
        }
        this.producto = { //Asignamos los productos en el carrito con el id de compra y timestamp
            id : this.carrito.length + 1,
            timestamp : new Date(),
            producto :  compraProductoId[0]
        }
        // console.log(this.carrito) verifica lo que hay en el carrito
       this.carrito.push(this.producto)
       escribir(this.#file,this.carrito)
        return this.carrito
    }



    async deleteCarritoProducto(productoId){
        this.carrito = await leer(this.#file);
        let productosNoEliminado = this.carrito.filter(producto=>producto.id != productoId);

        let productEliminado =  this.carrito.filter(product=> product.id == productoId)

        if(productEliminado.length == 0){
                return {error : 'No se encontrado el producto'}
         
        }

        this.carrito = productosNoEliminado;
        escribir(this.#file,this.carrito)
        return this.carrito;
    }

}


module.exports = Carrito;