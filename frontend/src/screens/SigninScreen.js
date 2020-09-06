import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();

    useEffect (() => {
        if (userInfo) {
            props.history.push("/");
        }
        return () => {
            //
        };
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="formContainer">
                <li>
                    <h3>Iniciar Sesión</h3>
                </li>
                <li>
                    { loading && <div>Loading...</div> }
                    { error && <div>{error}</div> }
                </li>
                <li>
                    <label htmlFor="email">Email</label>
                    <input type="emil" name="email" id="email" onChange={(e) => setEmail(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} ></input>
                </li>
                <li>
                    <button type="submit" className="button full">Ingresá</button>
                </li>
                <li>
                    No tenés cuenta?
                </li>
                <li>
                    <Link className="button centrado secondary" to="/register">Crea tu cuenta</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default SigninScreen;