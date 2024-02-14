import React, { useState } from 'react';
import '../styles/login.css';
import { request, setAuthToken } from '../axios_helper';
import { Link, useNavigate } from 'react-router-dom';
import RewardManagement from './rewards/RewardManagement';
import  Kid from './kid/KidChores';
const ChildLogin = () => {
    const navigate = useNavigate();
    const [isloggedIn, setIsLoggedIn] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const onSubmitChildLogin = async (e) => {
        console.log("clicked on submit child login")
        e.preventDefault();

        try {
            const response = await request("POST", "http://localhost:8080/api/kidLogin", formData);
            setAuthToken(response.data.token)
            setIsLoggedIn(true);

        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    if(isloggedIn){
       return( <Kid userName={formData.username}></Kid>)
    }
    else{
    return (
        <div className='body'>
            <header className='header-body'>
                <a href='/'>
                    <img src={require('../images/TC-sm-logo.png')} alt='Small Task Crusher Logo' className='header-logo' />
                </a>
            </header>
            <div className='tab-pane fade show active' id='pills-register'>
                <form className='login-form' onSubmit={onSubmitChildLogin}>
                    <div className=''>
                        <div className='jumbotron jumbotron'>
                            <div className='container'>
                                <h1 className='row justify-content-center display-4 welcome-message'>Welcome Back!</h1>
                            </div>
                        </div>
                    </div>
                    <div className='form-outline mb-4'>
                        <input type="text input-lg" id='username' name='username' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='username'>Usernames</label>
                    </div>

                    <div className='form-outline mb-4'>
                        <input type='password' id='password' name='password' className='form-control' onChange={onChangeHandler} />
                        <label className='form-label' htmlFor='password'>Password</label>
                    </div>
                    <div className='row justify-content-center d-grid gap-2 col-6 mx-auto'>
                            <button class="btn btn-primary register-btn" type="submit" role="submit" >Login In</button>
                    </div>
                </form>
            </div>
        </div>
    )
    }
}

export default ChildLogin;