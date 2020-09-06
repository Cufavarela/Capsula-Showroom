import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductoScreen from './screens/ProductoScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';



function App() {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;


  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
        <div className="gridContainer">
            <header className="header">
                <div className="brand">
                    <button onClick={openMenu}>
                        &#9776;
                    </button>
                    <Link to="/">
                        <img className="logoHeader" src="/images/Logo.jpg" alt="logo"></img>
                    </Link>
                </div>
                <div className="headerLinks">
                    <a href="carrito.html">Carrito</a>
                    {
                        userInfo ? <Link to="/profile">{userInfo.name}</Link>
                        : <Link to="/signin">Iniciar Sesión</Link>
                    }
                </div>
            </header>
            <aside className="sidebar">
                <h3>Categorías</h3>
                <button className="sidebarCloseBoton" onClick={closeMenu}>x</button>
                <ul>
                    <li>
                        <a href="index.html">Sweaters</a>
                    </li>
                    <li>
                        <a href="index.html">Otras Cosas</a>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className="content">
                    <Route path="/productos" component={ProductsScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/producto/:id" component={ProductoScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/" exact={true} component={HomeScreen} />
                </div>
            </main>
            <footer className="footer">
                <div className="logoFooter">
                    <img src="/images/Logo.jpg" alt="logo"></img>
                </div>
                <div className="redes">
                    <h3>NUESTRAS REDES</h3>
                    <a href="https://www.facebook.com/capsulashowroomok"><img alt="redes" className="logoRedes" src="/images/facebook.png"></img></a>
                    <a href="https://www.instagram.com/capsulashowroom/"><img alt="redes" className="logoRedes" src="/images/instagram.png"></img></a>
                </div>
                <div className="contactoFooter">
                    <h3>CONTACTO</h3>
                    <p><i className="material-icons">mail</i>capsulashowroom.ventas@gmail.com</p>
                    <p><i className="material-icons">call</i>1160393087</p>
                    <p><i className="material-icons">room</i>Vergara 3676, Florida Oeste, Vicente López</p>
                </div>
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;
