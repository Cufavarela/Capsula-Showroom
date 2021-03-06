import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

function RegisterScreen (props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
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
        dispatch(register(name, email, password));
    }

    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="formContainer">
                <li>
                    <h3>Registro</h3>
                </li>
                <li>
                    { loading && <div>Loading...</div> }
                    { error && <div>{error}</div> }
                </li>
                <li>
                    <label htmlFor="name">Nombre</label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}></input>
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
                    <label htmlFor="rePassword">Contraseña</label>
                    <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)} ></input>
                </li>
                <li>
                    <button type="submit" className="button full">Registrate</button>
                </li>
                <li>
                    Ya tenés una cuenta? <Link to="/signin">Iniciá Sesión</Link>
                </li>
            </ul>
        </form>
    </div>
}

export default RegisterScreen;