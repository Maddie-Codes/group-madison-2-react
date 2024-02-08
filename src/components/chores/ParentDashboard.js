import React, { useState, useEffect } from 'react';
import '../../styles/ChoreStyles.css';

const ParentDashboard = () => {
    const [dashboardData, setDashboardData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        
            const response = await fetch('http://localhost:8080/api/parent-dashboard');
            const data = await response.json();
            setDashboardData(data);
        } 
    

    return (
        <div>
            <h1>Parent Dashboard</h1>
              <div className='chore-container' >
                {dashboardData.map(kid => (
                    <div key={kid.kidId} className="chore-item">
                        <h2>{kid.kidName}</h2>
                       <p>Total Points: {kid.totalPoints}</p>
                        <p>Total Dollars: {kid.totalDollars}</p>
                        <p>Total Assigned Chores: {kid.totalAssignedChores}</p>
                        <p>Total Approved Chores: {kid.totalApprovedChores}</p>
                       
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParentDashboard;
