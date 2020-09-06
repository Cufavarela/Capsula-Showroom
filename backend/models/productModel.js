import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    imagen: {type: String, required: true},
    marca: {type: String, required: true},
    precio: {type: Number, default: 0, required: true},
    categoria: {type: String, required: true},
    countInStock: {type: Number, default: 0, required: true},
    descripcion: {type: String, required: true},
    rating: {type: Number, default: 0, required: true},
    numReviews: {type: Number, default: 0, required: true},

});

const productModel = mongoose.model("Product", productSchema);

export default productModel;