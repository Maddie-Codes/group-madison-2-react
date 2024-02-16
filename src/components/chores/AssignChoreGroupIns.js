import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AssignGroup.css';
import { useNavigate } from 'react-router-dom';
import AssignChoreGroup from './AssignChoreGroup';

const AssignChoreGroupIns = () => {
  const navigate = useNavigate();
  
  const handleAssignGroupChore = async ( selectedKid, setDueDate, setkidGroupChores) => {
    const formattedDueDate = setDueDate.toISOString().split('T')[0];
    const response = await fetch(`http://localhost:8080/api/groupassign/insert?selectedKid=${selectedKid}&setDueDate=${formattedDueDate}&kidGroupChores=${setkidGroupChores}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Chore assigned successfully');
      navigate('/api/assignments/assigned-chores');
    } else {
      console.error('Failed to assign chore');
    }
  }

  return (
    <div>
        <h1>Assiging</h1>
        <AssignChoreGroup handleAssignGroupChore={handleAssignGroupChore} />
    </div>

  );
};
export default AssignChoreGroupIns;