import * as React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router';
import { request, setAuthToken } from '../axios_helper';
export default function Navbar() {

    const navigate = useNavigate();

    const onSubmitLogout = (token) => {
        window.localStorage.setItem("auth_token", "")
        navigate('/')
    }

    return (
        <header className='header-body'>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <img src={require('../images/TC-sm-logo.png')} alt='Small Task Crusher Logo' className='header-logo' />
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/api/kidRegister">Add Child</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Create Chore</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="true">
                                    Select Child
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Child 1</a></li>
                                    <li><a class="dropdown-item" href="#">Child 2</a></li>
                                    <li><a class="dropdown-item" href="#">Child 3</a></li>
                                </ul>
                            </li>
                            <li class="nav-item" onSubmit={onSubmitLogout}>
                                <a class="nav-link active" aria-current="page" onClick={onSubmitLogout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

