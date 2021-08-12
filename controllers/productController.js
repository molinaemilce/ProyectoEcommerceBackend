const fs = require('fs')
const db = JSON.parse(fs.readFileSync('./data/products.json','utf-8')) ; //Base de datos/Api
const {leer,escribir} = require('../persistencia/products');
const products = require('../persistencia/products');

class Products{
    #products;
    #file='products.json';
    constructor(){
        this.#products= [];
    }


    async getProducts(id){
       const filedb = await leer(this.#file);
       if(id){//Si encuentra id
          let product = filedb.filter(product=>product.id == id)
          if(product.length==0){
              return {error : 'No se ha encontrado el producto'}
          }
          return product;
       }else{
        if(filedb.length == 0){//Si el archivo esta vacio
            return {error : 'No hay productos'}
        }   
        return filedb;//Si hay valor en el archivo retorna los valores
       }
    }

    async addProducto(productoDatos){
        this.#products = await leer(this.#file)
        const newProducto = {
            //Valores que le asigno
            id : this.#products.length + 1,
            timestamp  : Date.now(),
            //Valores del post
            ...productoDatos
        }
        this.#products.push(newProducto);
        escribir(this.#file,this.#products);
        return newProducto;
    }

    async updateProducto(idProducto,productoDataNuevo){
        this.#products = await leer(this.#file);
        
        let update = false;

     
        this.#products.map(product=>{
            if(product.id == +idProducto){
                update = true;

                product.nombre = productoDataNuevo.nombre;
                product.descripcion = productoDataNuevo.descripcion;
                product.codigo = productoDataNuevo.codigo;
                product.foto = productoDataNuevo.foto;
                product.price = productoDataNuevo.price;
                product.stock = productoDataNuevo.stock;
            }
        })
        escribir(this.#file,this.#products)
        if(update){//Si se modifico
            return productoDataNuevo
        }else{//Si sigue falso es xq no pasó nada, es decir no encontro el id
            return {error : 'No se ha encontrado el producto'}
        }

    }

    async deleteProducto(id){
        this.#products = await leer(this.#file);

        let eliminado = null;

       const productosNoEliminados = this.#products.filter(producto=>{
            if(producto.id != id){
                return producto
            }
            eliminado = producto;
        })
        
        this.#products = productosNoEliminados;
        escribir(this.#file,this.#products)

        if(eliminado){
            console.log(productosNoEliminados)
            return eliminado
        }else{
            return {error : 'No se ha eliminado el producto'}
        }
      
        
    }

}


module.exports = Products;
