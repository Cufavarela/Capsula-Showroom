const { default: Axios } = require("axios");
const { CART_ADD_ITEM, CART_REMOVE_ITEM } = require("../constants/cartConstants");

const AddToCart = (productId, qty) => async (dispatch) => {

    try {
        const {data} = await Axios.get("/api/productos/" + productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.nombre,
            image: data.imagen,
            price: data.precio,
            countInStock: data.countInStock,
            qty,
        } })

    } catch (error) {

    }
}


const removeFromCart = (productId) => (dispatch) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});
}


export { AddToCart, removeFromCart };