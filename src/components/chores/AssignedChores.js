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
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                              Redo Button and Comment Code and Approve comment By Monica  Start                  //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // State to store values
  const [commentValue, setCommentValue] = useState('');
  const [statusCheck, setStatusCheck] = useState(0);
  const [visibleTextChoreId, setVisibleTextChoreId] = useState(null);

  //ChoreID and Comment value are passed as a parameter.
  //This process updates the Comment Value and the Status value for a given ChoreID.
  //This is a Redo process and hence the Status is changed to "ASSIGNED".
  const handleRedoComment = async (choreId, commentValue) => {
    console.log("choreId" + choreId);
    try {
      const response = await fetch(`http://localhost:8080/redocomment/${choreId}?commentValue=${commentValue}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        //Calling the existing fetch function of the AssignedChores for displaying the Assigned data.
        fetchAssignedChores();
        console.log('Updated the Redo comment and Assigned to kid successfully.');
      } else {
        console.error('Could not update the comment.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  //ChoreID and Comment value are passed as a parameter.
  //This process updates the Comment Value and the Status value for a given ChoreID.
  //This is a Approve process.
  const handleApproveComment = async (choreId, commentValue) => {
    console.log("choreId" + choreId);
    try {
      const response = await fetch(`http://localhost:8080/approvecomment/${choreId}?commentValue=${commentValue}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        //Calling the existing fetch function of the AssignedChores for displaying the Assigned data.
        fetchAssignedChores();
        console.log('Updated the Approve comment and Assigned to kid successfully.');
      } else {
        console.error('Could not update the Approve comment.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Handler function for setting the Approve Comment Value.
  const handleCommentApproveChange = (e) => {
    setCommentValue(e.target.value);
  };

  // Handler function for Calling the handleRedoComment which
  // Calls the controller file to update the Chores table.
  const handleCommentApproveChangeSubmmit = (choreId) => {
    handleApproveComment(choreId, commentValue);
    //Setting all the status to default.
    setStatusCheck(0);
    setCommentValue('');
    setVisibleTextChoreId(null);

  };

  // Handler function for setting the Redo Comment Value.
  const handleCommentChange = (e) => {
    setCommentValue(e.target.value);
  };

  // Handler function for Calling the handleRedoComment which
  // Calls the controller file to update the Chores table for Redo.
  const handleCommentSubmit = (choreId) => {
    handleRedoComment(choreId, commentValue);
    //Setting all the status to default.
    setStatusCheck(0);
    setCommentValue('');
    setVisibleTextChoreId(null);

  };
  //Handler function after redo for setting the status values.
  const handleRedoClick = (choreId) => {
    // Once the redo button is clicked, the text area should come in.
    //Hence this status helps in that.
    setStatusCheck(1);
    //This sets the current choreId.With this the text area is not visible to all the chore ID.
    setVisibleTextChoreId(choreId);
  };

  //Handler function after Approve for setting the status values.
  const handleApproveCommentClick = (choreId) => {
    // Once the Approve button is clicked, the text area should come in.
    //Hence this status helps in that.
    setStatusCheck(2);
    //This sets the current choreId.With this the text area is not visible to all the chore ID.
    setVisibleTextChoreId(choreId);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                              Redo Button , Comment  and Approve comment Code By Monica  End                  //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                        {/*Approve Button i have just done an dummy and comment is what th ecode does. */}
                        <button className='button' type="button" onClick={() => handleApproveCommentClick(chore.choreId)}>Approve</button>
                        {/* Redo Comment box By Monica Start*/}
                        <button className='button' type="button" onClick={() => handleRedoClick(chore.choreId)}>Redo</button>
                        {/*This statusCheck and visibleTextChoreId will make sure the text area is visbile and also the ChoreID 
                           makes sure the text area is visible to this ChoreID. */}
                        {statusCheck === 1 && visibleTextChoreId === chore.choreId && (
                          <div>
                            <label>Comment:</label>
                            <textarea value={commentValue} onChange={handleCommentChange} />
                            {/* Button for the comment click */}
                            <button className='button' type="button" onClick={() => handleCommentSubmit(chore.choreId)}>Submit</button>
                          </div>)}
                        {/*Redo Commnt End*/}
                        {/*This statusCheck and visibleTextChoreId will make sure the text area is visbile and also the ChoreID 
                           makes sure the text area is visible to this ChoreID. */}
                        {statusCheck === 2 && visibleTextChoreId === chore.choreId && (
                          <div>
                            <label>Comment:</label>
                            <textarea value={commentValue} onChange={handleCommentApproveChange} />
                            {/* Button for the comment click */}
                            <button className='button' type="button" onClick={() => handleCommentApproveChangeSubmmit(chore.choreId)}>Submit</button>
                          </div>)}
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