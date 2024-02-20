import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Contact from './Contact';

const ParentDashboard = () => {

    
        return (
            <div className='body'>
                <Navbar />
                <div className='jumbotron jumbotron'>
                    <div className='container'>
                        <h1 className='display-4'>Welcome</h1>
                        <p className='lead'>Let the fun begin!</p>
                    </div>
                </div> 
                <footer>
                <Contact />
            </footer>               
            </div>
        
        )
    }
 export default ParentDashboard;