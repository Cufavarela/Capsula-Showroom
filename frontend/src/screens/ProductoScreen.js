import React from 'react'
import data from '../data';
import {Link} from 'react-router-dom';

function ProductoScreen (props) {
    const producto = data.productos.find(x => x._id === props.match.params.id);
    return (
    <div>
        <div>
            <Link to="/" className="volver">Volver al Inicio</Link>
        </div>
        <div className="detalles">
        <div className="detallesImg">
            <img src={producto.imagen} alt="producto"></img>
        </div>
        <div className="detallesInfo">
            <ul>
                <li>
                    <h2>{producto.nombre}</h2>
                </li>
                <li>
                    {producto.rating} Stars ({producto.numReviews} Reviews)
                </li>
                <li>
                    <h2>${producto.precio}</h2>
                </li>
                <li>
                    <h5>Descripción</h5>
                    <div>
                        {producto.descripcion}
                    </div>
                </li>
            </ul>
        </div>
        <div className="detallesAccion">
            <ul>
                <li>
                    Talle: <select>
                        <option>XS</option>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                </li>
                <li>
                    {producto.status}
                </li>
                <li>
                    Cantidad: <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </li>
                <li>
                    <button className="button">Agregar al carrito</button>
                </li>
            </ul>
        </div>
        </div>
    </div>
    );
}

export default ProductoScreen;