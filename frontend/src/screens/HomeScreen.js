import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productAction';

function HomeScreen (props) {

    const productList = useSelector(state => state.productList);
    const {productos, loading, error} = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts());
        return () => {
            //
        };
    }, [])

    return loading ? <div>Loading...</div> :
        error ? <div>{ error }</div> :
            <ul className="productos">
                {productos.map(producto =>
                <li key={producto._id}>
                    <div className="producto">
                        <Link to={'/producto/' + producto._id}>
                            <img className="productoImg" src={producto.imagen} alt="producto"></img>
                        </Link>
                        <div className="productoName">
                            <Link to={'/producto/' + producto._id}>{producto.nombre}</Link>
                        </div>
                        <div className="productoMarca">{producto.marca}</div>
                        <div className="precio">${producto.precio}</div>
                        <div className="rating">{producto.rating} Stars ({producto.numReviews} reviews)</div>
                    </div>
                </li>
                )}
            </ul>
}

export default HomeScreen;