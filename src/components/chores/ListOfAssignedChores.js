
import React, { useState, useEffect } from 'react';
import '../../styles/AssignedChoresStyles.css';
import { request, getAuthToken,getUserIdFromAuthToken} from '../../axios_helper';
//import getUserIdFromAuthToken from '../../axios_helper';

import Navbar from '../Navbar';
import ApproveComment from './ApproveComment';

const AssignedChoresPage = () => {
  const [assignedChores, setAssignedChores] = useState([]);
  const [activeTab, setActiveTab] = useState('assigned'); // Default tab
  //Added by Monica for Approve Comment Start//
  const [statusCheck, setStatusCheck] = useState(0);
  const [visibleTextChoreId, setVisibleTextChoreId] = useState(null);
 //Added by Monica for Approve Comment end//
  const id = getUserIdFromAuthToken(getAuthToken());

  const fetchAssignedChores = async () => {
    
      const response = await request('get', `api/assignments/assigned-chores/${id}`);

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        setAssignedChores(data);
      } else {
        console.error('Failed to fetch assigned chores');
      }
    
  };

  useEffect(() => {
    fetchAssignedChores();
  }, []);

  const handleDeleteChore = async (choreId) => {
    
      const response = await request('delete', `api/assignments/assigned-chores/${choreId}`);

      if (response.status === 200) {
        fetchAssignedChores();
        console.log('Assigned chore deleted successfully');
      } else {
        console.error('Failed to delete assigned chore');
      }
    };

  // Function to handle approving a chore
  const handleApproveChore = async (choreId) => {
    const id = getUserIdFromAuthToken(getAuthToken());
    const response = await request('post', `api/status/approve/${choreId}/${id}`);
    //Added by Monica Start Approve Comment//
    //Once the Approve button is clicked, the text area should come in.
    //Hence setStatusCheck status helps in that.
    //setVisibleTextChoreId sets the current choreId.With this the text area is not visible to all the chore ID.
    setStatusCheck(2);
    setVisibleTextChoreId(choreId);
    //Added by Monica End for Approve Comment//
    if (response.status === 200) {
      console.log('Chore approved successfully');

      // Update the state with the approved chore status
      setAssignedChores((prevAssignedChores) => {
        const updatedChores = prevAssignedChores.map((item) => ({
          ...item,
          chores: item.chores.map((chore) =>
            chore.choreId === choreId ? { ...chore, status: 'APPROVED' } : chore
          ),
        }));
        return updatedChores;
      });
    } else {
      console.error('Failed to approve chore'); 
    }
        //Added by Monica Start Approve Comment//
        //Setting all the status to default.
        //setStatusCheck(0);
        //setVisibleTextChoreId(null);
        //Added by Monica End for Approve Comment//
  };

  return (
    <div>
      <Navbar />
      
      <div className='btn-chores-container'>
        <button className='btn btn-primary' onClick={() => setActiveTab('assigned')}>Assigned Chores</button>
        <button className='btn btn-primary' onClick={() => setActiveTab('waiting')}>Waiting for Approval</button>
        <button className='btn btn-primary' onClick={() => setActiveTab('approved')}>Approved Chores</button>
      </div>

      {Array.isArray(assignedChores) &&
        assignedChores.map((item) => (
          <div key={item.kid.kidId}>
            <h2>{item.kid.name}'s {activeTab === 'assigned' && 'Assigned Chores'}
              {activeTab === 'waiting' && 'Waiting for Approval Chores'}
              {activeTab === 'approved' && 'Approved Chores'}</h2>
            <div className="flex-container">
              {/* Render content based on the active tab */}
              {activeTab === 'assigned' && (
                <div className="flex-section">
                  {item.chores
                    .filter((chore) => chore.status === 'ASSIGNED')
                    .map((chore) => (
                      <div key={chore.choreId} className="card-item">
                        <div>
                          <h4>{chore.name}</h4>
                          <p>{chore.description}</p>
                          <p>
                            <strong>Due Date:</strong> {chore.dueDate ? chore.dueDate.join('/') : ''}
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
                          <button className='button' onClick={() => handleDeleteChore(chore.choreId)}>Delete</button>
                        </div>
                      </div>

                    ))}
                </div>
              )}

              {activeTab === 'waiting' && (
                <div className="flex-section">
                  {item.chores
                    .filter((chore) => chore.status === 'COMPLETED')
                    .map((chore) => (
                      <div key={chore.choreId} className="card-item">
                        <div>
                          <h4>{chore.name}</h4>
                          <p>{chore.description}</p>
                          <p>
                            <strong>Value Type:</strong> {chore.valueType}
                          </p>
                          <p>
                            <strong>Value:</strong> {chore.value}
                          </p>
                          <p>
                            <strong>Status:</strong> {chore.status}
                          </p>
                          {chore.status === 'COMPLETED' && (
                            <>
                              <button type="submit" onClick={() => handleApproveChore(chore.choreId)}>Approve</button>
                              {statusCheck === 2 && visibleTextChoreId === chore.choreId && <ApproveComment choreId={chore.choreId} />}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {activeTab === 'approved' && (
                <div className="flex-section">
                  {item.chores
                    .filter((chore) => chore.status === 'APPROVED')
                    .map((chore) => (
                      <div key={chore.choreId} className="card-item">
                        <div>
                          <h4>{chore.name}</h4>
                          <p>{chore.description}</p>
                          <p>
                            <strong>Value Type:</strong> {chore.valueType}
                          </p>
                          <p>
                            <strong>Value:</strong> {chore.value}
                          </p>
                          <p>
                            <strong>Status:</strong> {chore.status}
                          </p>
                        </div>

                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
export default AssignedChoresPage;