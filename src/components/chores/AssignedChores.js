import React, { useState, useEffect } from 'react';
import '../../styles/ChoreStyles.css';

// Function component for the Assigned Chores page
const AssignedChoresPage = () => {
  // State to store assigned chores data
  const [assignedChores, setAssignedChores] = useState([]);

  // Function to fetch assigned chores from the server
  const fetchAssignedChores = async () => {
    try {
      // Fetch assigned chores from the server API
      const response = await fetch('http://localhost:8080/api/assignments/assigned-chores');

      if (response.ok) {
        // If the response is successful, set the fetched data to the state
        const data = await response.json();
        setAssignedChores(data);
      } else {
        // Handle error if fetching fails
        console.error('Failed to fetch assigned chores');
      }
    } catch (error) {
      // Handle errors during the fetch operation
      console.error('Failed to fetch assigned chores', error);
    }
  };

  // Use effect to fetch assigned chores when the component mounts
  useEffect(() => {
    fetchAssignedChores();
  }, []);

  // Function to handle deleting a chore
  const handleDeleteChore = async (choreId) => {
    // Send a request to the server to delete the assigned chore
      const response = await fetch(`http://localhost:8080/api/assignments/assigned-chores/${choreId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // If deletion is successful, update the UI by refetching assigned chores
        fetchAssignedChores();
        console.log('Assigned chore deleted successfully');
      } else {
        // Handle error if deletion fails
        console.error('Failed to delete assigned chore');
      }
    
  };

  
  return (
    <div>
      <h1>Assigned Chores</h1>
      {Array.isArray(assignedChores) &&
        assignedChores.map((item) => (
          <div key={item.kid.kidId}>
            <h2>{item.kid.name}'s Chores</h2>
            <div className="flex-container">
              <div className="flex-section">
                <h3>Assigned Chores</h3>
                {item.chores
                  .filter((chore) => chore.status === 'ASSIGNED')
                  .map((chore) => (
                    <div key={chore.choreId} className="chore-item">
                      <div>
                        <h4>{chore.name}</h4>
                        <p>{chore.description}</p>
                        <p>
                          <strong>Due Date:</strong> {chore.dueDate}
                        </p>
                        <p>
                          <strong>Value Type:</strong> {chore.valueType}
                        </p>
                        <p>
                          <strong>Value:</strong> {chore.value}
                        </p>
                        <p>
                          <strong>Status:</strong> {chore.status}
                        </p>
                        {/* Button to delete the chore */}
                        <button className='button' onClick={() => handleDeleteChore(chore.choreId)}>Delete</button>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex-section">
                <h3>Waiting for Approval</h3>
                {item.chores
                  .filter((chore) => chore.status === 'COMPLETED')
                  .map((chore) => (
                    <div key={chore.choreId} className="chore-item">
                      <div>
                        <h4>{chore.name}</h4>
                        <p>{chore.description}</p>
                        <p>
                          <strong>Due Date:</strong> {chore.dueDate}
                        </p>
                        <p>
                          <strong>Value Type:</strong> {chore.valueType}
                        </p>
                        <p>
                          <strong>Value:</strong> {chore.value}
                        </p>
                        <p>
                          <strong>Status:</strong> {chore.status}
                        </p>
                        {/* Button to approve the chore */}
                        {/* {chore.status === 'COMPLETED' && (
                          <button onClick={() => handleApproveChore(chore.choreId)}>Approve</button>
                        )} */}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AssignedChoresPage;