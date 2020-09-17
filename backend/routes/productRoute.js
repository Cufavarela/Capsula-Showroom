import express from 'express';
import Product from '../models/productModel';
import { getToken } from '../util';

const router = express.Router();

router.get("/", async(req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId});
    res.send(product);
});

router.post("/", async(req, res) => {
    const product = new Product ({
       nombre: req.body.nombre,
       precio: req.body.precio,
       imagen: req.body.imagen,
       marca: req.body.marca,
       categoria: req.body.categoria,
       countInStock: req.body.countInStock,
       descripcion: req.body.descripcion,
       rating: req.body.rating,
       numReviews: req.body.numReviews,

    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(505).send({ message: 'Error Creating Product'});
});

router.put("/:id", async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findOne({_id: productId});
    if (product) {
           product.nombre = req.body.nombre || "";
           product.precio = req.body.precio || 0;
           product.imagen = req.body.imagen || "";
           product.marca = req.body.marca || "";
           product.categoria = req.body.categoria || "";
           product.countInStock = req.body.countInStock || 0;
           product.descripcion = req.body.descripcion || "";

           const updatedProduct = await product.save();
           if (updatedProduct) {
               return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
           }
    }
    return res.status(505).send({ message: 'Error Updating Product'});
});

router.delete("/:id", async(req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if (deletedProduct) {
        await deletedProduct.remove();
        res.send({ message: "Product Deleted"})
    } else {
        res.send("Error Deleting Product");
    }
})

export default router;