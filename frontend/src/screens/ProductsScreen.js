import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { saveProduct, listProducts, deleteProduct } from '../actions/productAction';

function ProductsScreen (props) {

    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState('');
    const [categoria, setCategoria] = useState('');
    const [marca, setMarca] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const productList = useSelector(state => state.productList);
    const { loading, productos, error } = productList;

    const [modalVisible, setModalVisible] = useState(false);

    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
    const dispatch = useDispatch();

    useEffect (() => {
        if(successSave) {
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = (producto) => {

        setModalVisible(true);

        setId(producto._id);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setImagen(producto.imagen);
        setMarca(producto.marca);
        setCategoria(producto.categoria);
        setCountInStock(producto.setCountInStock);
        setDescripcion(producto.descripcion);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveProduct({
            "_id": id,
            "nombre": nombre,
            "precio": precio,
            "imagen": imagen,
            "marca": marca,
            "categoria": categoria,
            "countInStock": countInStock,
            "descripcion": descripcion
        }));
        return false;
    }

    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id))
    }

    return <div className="content content-margined">
        <div className="product-header">
            <h3>Productos</h3>
            <button onClick={() => openModal({})}>Subir Producto</button>
        </div>
        {modalVisible &&
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
                            <input type="text" name="nombre" value={nombre} id="nombre" onChange={(e) => setNombre(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="precio">Precio</label>
                            <input type="text" name="precio" value={precio} id="precio" onChange={(e) => setPrecio(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="imagen">Imagen</label>
                            <input type="text" name="imagen" value={imagen} id="imagen" onChange={(e) => setImagen(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="marca">Marca</label>
                            <input type="text" name="marca" value={marca} id="marca" onChange={(e) => setMarca(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="categoria">Categoria</label>
                            <input type="text" name="categoria" value={categoria} id="categoria" onChange={(e) => setCategoria(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="countInStock">Stock</label>
                            <input type="text" name="countInStock" value={countInStock} id="countInStock" onChange={(e) => setCountInStock(e.target.value)}></input>
                        </li>
                        <li>
                            <label htmlFor="descripcion">Description</label>
                            <textarea type="text" name="descripcion" value={descripcion} id="descripcion" onChange={(e) => setDescripcion(e.target.value)}></textarea>
                        </li>
                        <li>
                            <button type="submit" className="button full">{id ? "Actualizar" : "Crear"}</button>
                        </li>
                        <li>
                            <button type="button" onClick={() => setModalVisible(false)} className="button full">Volver</button>
                        </li>
                    </ul>
                </form>
            </div>
        }

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
                    {productos.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.nombre}</td>
                            <td>{product.precio}</td>
                            <td>{product.categoría}</td>
                            <td>{product.marca}</td>
                            <td>
                                <button onClick={() => openModal(product)}>Editar</button>
                                <button onClick={() => deleteHandler(product)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    </div>


}

export default ProductsScreen;