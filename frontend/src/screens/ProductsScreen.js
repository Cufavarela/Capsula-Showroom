import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts } from '../actions/productAction';

function ProductsScreen (props) {

    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');
    const [categoria, setCategoria] = useState('');
    const [marca, setMarca] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const productList = useSelector(state => state.productList);
    const { loading, products, error } = productList;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(listProducts());
        return () => {
            //
        };
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({ nombre, precio, imagen, marca, categoria, countInStock, descripcion }));
        return false;
    }

    return <div className="content content-margined">
        <div className="product-header">
            <h3>Productos</h3>
            <button>Subir Producto</button>
        </div>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="formContainer">
                    <li>
                        <h3>Crear Producto</h3>
                    </li>
                    <li>
                        { loadingSave && <div>Loading...</div> }
                        { errorSave && <div>{errorSave}</div> }
                    </li>
                    <li>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" id="nombre" onChange={(e) => setNombre(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="precio">Precio</label>
                        <input type="text" name="precio" id="precio" onChange={(e) => setPrecio(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="imagen">Imagen</label>
                        <input type="text" name="imagen" id="imagen" onChange={(e) => setImagen(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="marca">Marca</label>
                        <input type="text" name="marca" id="marca" onChange={(e) => setMarca(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="categoria">Categoria</label>
                        <input type="text" name="categoria" id="categoria" onChange={(e) => setCategoria(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="countInStock">Stock</label>
                        <input type="text" name="countInStock" id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor="descripcion">Description</label>
                        <textarea type="text" name="descripcion" id="descripcion" onChange={(e) => setDescripcion(e.target.value)}></textarea>
                    </li>
                    <li>
                        <button type="submit" className="button full">Crear</button>
                    </li>
                </ul>
            </form>
        </div>

        <div className="product-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Marca</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.categoría}</td>
                            <td>{product.marca}</td>
                            <td>
                                <button>Editar</button>
                                <button>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    </div>


}

export default ProductsScreen;