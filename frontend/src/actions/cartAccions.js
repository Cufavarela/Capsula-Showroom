import Cookie from 'js-cookie';
const { default: Axios } = require("axios");
const { CART_ADD_ITEM, CART_REMOVE_ITEM } = require("../constants/cartConstants");

const AddToCart = (productId, qty) => async (dispatch, getState) => {

    try {
        const {data} = await Axios.get("/api/productos/" + productId);
        dispatch({type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.nombre,
            image: data.imagen,
            price: data.precio,
            countInStock: data.countInStock,
            qty,
        }
    });
    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

    } catch (error) {

    }
}


const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}


export { AddToCart, removeFromCart };