import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ChoreStyles.css';
import { useNavigate } from 'react-router-dom';
import AssignChore from './AssignChore';

// ChoresList component
const ChoresList = () => {
  // Initialize the useNavigate hook for navigation
  const navigate = useNavigate();

  // State to store the list of chores
  const [chores, setChores] = useState([]);

  // Function to handle chore assignment
  const handleAssignChore = async (choreId, selectedKid, dueDate, selectedValueType, selectedValue) => {
    // Format the due date to a string
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    // Send a POST request to assign the chore
    const response = await fetch(`http://localhost:8080/api/assignments/${choreId}/${selectedKid}?dueDate=${formattedDueDate}&valueType=${selectedValueType}&value=${selectedValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful and navigate accordingly
    if (response.ok) {
      console.log('Chore assigned successfully');
      navigate('/api/assignments/assigned-chores');
    } else {
      console.error('Failed to assign chore');
    }
  };

  // Effect hook to fetch chores when the component mounts
  useEffect(() => {
    const fetchChores = async () => {
      // Fetch the list of chores from the API
      const response = await fetch('http://localhost:8080/api/chores/list');
      const data = await response.json();
      // Update the state with the fetched data
      setChores(data);
    };

    // Call the fetchChores function
    fetchChores();
  }, []);

  // Function to handle chore deletion
  const handleDelete = async (choreId) => {
    // Send a DELETE request to delete the chore
    const response = await fetch(`http://localhost:8080/api/chores/${choreId}`, {
      method: 'DELETE',
    });

    // Check if the request was successful and reload the page
    if (response.ok) {
      console.log('Chore deleted successfully');
      window.location.reload();
    } else {
      console.error('Failed to delete chore');
    }
  };


  return (
    <div>
      <div>
        <h1>List of Chores</h1>

        {/* Display the list of chores */}
        <ul className="chore-container">
          {chores && chores.map && chores.map((chore) => (
            <div className="chore-item" key={chore.choreId}>
              <div className="chore-details">
                <strong>Name:</strong> {chore.name}<br />
                <strong>Description:</strong> {chore.description}<br />

                {/* Display chore image if available */}
                <div>
                  {chore.image && (
                    <div>
                      <img src={`${chore.image}`} alt={chore.name} /> <br />
                    </div>
                  )}
                </div>
              </div>

              {/* Container for buttons: Edit, Delete, Assign */}
              <div className="button-container">
                {/* Link to edit chore */}
                <Link to={`/api/chores/edit/${chore.choreId}`} className="button">
                  Edit
                </Link>

                {/* Button to delete chore */}
                <button className="button" onClick={() => handleDelete(chore.choreId)}>
                  Delete
                </button>

                {/* Component for assigning chore */}
                <AssignChore choreId={chore.choreId} handleAssignChore={handleAssignChore} />
              </div>
            </div>
          ))}
        </ul>
      </div>

      {/* Link to add a new chore */}
      <p>
        <Link to="/api/chores/add" className="button">
          Create
        </Link>
      </p>
    </div>
  );
};

// Export the ChoresList component
export default ChoresList;