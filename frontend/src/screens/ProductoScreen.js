import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productAction';

function ProductoScreen (props) {
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {producto, loading, error} = productDetails;
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, [])

const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
}

    return <div>
        <div>
            <Link to="/" className="volver">Volver al Inicio</Link>
        </div>
        {loading ? <div>Loading...</div> :
        error ? <div>{error}</div> :
            (
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
                                Cantidad: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
                                   {[...Array(producto.countInStock).keys()].map(x =>
                                        <option key={x+1} value={x+1}>{x+1}</option>
                                    )}
                                </select>
                            </li>
                            <li>
                                {producto.countInStock > 0 ? <button onClick={handleAddToCart} className="button">Agregar al carrito</button>
                                :
                                <div>Sin Stock.</div>
                                }
                            </li>
                        </ul>
                    </div>
                </div>

            )
        }
    </div>
}

export default ProductoScreen;