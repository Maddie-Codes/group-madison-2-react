import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const ParentDashboard = () => {

    
        return (
            <div className='body'>
                <Navbar />
                <div className='jumbotron jumbotron'>
                    <div className='container'>
                        <h1 className='display-4'>Welcome</h1>
                        <p className='lead'>Let's see if we can get this to work!</p>
                    </div>
                </div>                
            </div>
        )
    }
 export default ParentDashboard;