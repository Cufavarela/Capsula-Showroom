import express from 'express';
import data from './data';

const app = express();

app.get("/api/productos/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.productos.find(x => x._id === productId);
    if (product)
        res.send(product);
    else
        res.status(404).send({ msg: "Producto no encontrado."})

});

app.get("/api/productos", (req, res) => {

    res.send(data.productos);
});


const server = app.listen(5000, () => {console.log("server started at http://localhost:5000") });

process.once("SIGUSR2", function () {
    server.close(function () {
        process.kill(process.pid, "SIGUSR2");
    });
});