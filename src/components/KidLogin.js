import React, { useState } from 'react';
import '../styles/login.css';
import { request, setAuthToken } from '../axios_helper';
import { Link, useNavigate } from 'react-router-dom';

const KidLogin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const onSubmitKidLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await request("POST", "/api/kidLogin", formData);
            setAuthToken(response.data.token);
            navigate('api/kid-dashboard')
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className='body'>
            <header className='header-body'>
                <a href='/'>
                    <img src={require('../images/TC-sm-logo.png')} alt='Small Task Crusher Logo' className='header-logo' />
                </a>
            </header>
            <div className='tab-pane fade show active' id='pills-register'>
                <form className='login-form' onSubmit={onSubmitKidLogin}>
                    <div className=''>
                        <div className='jumbotron jumbotron'>
                            <div className='container'>
                                <h1 className='row justify-content-center display-4 welcome-message'>Welcome Back!</h1>
                            </div>
                        </div>
                    </div>
                    <div className='form-outline mb-4'>
                        <input type="text input-lg" id='username' name='username' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='username'>Username</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='password' id='password' name='password' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='password'>Password</label>
                    </div>
                    <div className='row justify-content-center d-grid gap-2 col-6 mx-auto'>
                        <Link to='/api/kid-dashboard'>
                            <button className='btn btn-primary register-btn' type='submit'>Sign In</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default KidLogin;