import express from 'express';
import Product from '../models/productModel';
import { getToken } from '../util';

const router = express.Router();

router.get("/", async(req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.post("/", async(req, res) => {
    const products = new Product ({
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
    const newProduct = await products.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(505).send({ message: 'Error Creating Product'});
})

export default router;