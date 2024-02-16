import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import '../../styles/AssignGroup.css';

const username = "AbbyBarber";
//const duedate = "2024-02-17";
// Calendar icon component
const CalendarIcon = React.forwardRef(({ onClick }, ref) => (
  <button type="button" onClick={onClick} ref={ref}>
    <FaCalendarAlt />
  </button>
));



const AssignChoreGroup = ({handleAssignGroupChore}) => {

  const [selectedKid, setSelectedKid] = useState('');
  const [selectedKidGroup, setSelectedKidGroup] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [kids, setKids] = useState([]);
  const [kidGroupChores, setKidGroupChores] = useState([]);
  const [groupChore, setGroupChore] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/groupassign/allkids?username=${username}`)
      .then(response => response.json())
      .then(data => {
        setKids(data);
        console.log('Fetched data:', data);
      })
      .catch(error => console.error('Error fetching kids:', error));
  }, []);


  useEffect(() => {
    fetch(`http://localhost:8080/api/groupassign/allkids?username=${username}`)
      .then(response => response.json())
      .then(kidsData => {
        const promises = kidsData.map(kid => {
          return  fetch(`http://localhost:8080/api/groupassign/allchores?kidId=${kid.kidId}`)
            .then(response => response.json())
            .then(choresData => ({
              kidId: kid.kidId,
              chores: choresData
            }));
        });
 
        Promise.all(promises)
          .then(kidsChores => {
            const kidChoresMap = {};
            kidsChores.forEach(kidChore => {
              kidChoresMap[kidChore.kidId] = kidChore.chores;
            });
            setKidGroupChores(kidChoresMap);
          })
          .catch(error => {
            console.error('Error fetching chores:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching kids:', error);
      });
  }, []);

  const handleKidChange = (e) => {
    setSelectedKid(e.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

const handleSubmitGroup = async (e) => {
  e.preventDefault();
  const formattedDueDate = dueDate.toISOString().split('T')[0];
  await handleAssignGroupChore(selectedKid, formattedDueDate, kidGroupChores[selectedKidGroup]);
}

const lengthChoreGroup = {};
Object.entries(kidGroupChores)
  .filter(([_, chores]) => chores && chores.length !== 0)
  .forEach(([kidId, chores]) => {
    lengthChoreGroup[kidId] = chores.length;
  });
 console.log(lengthChoreGroup);
return (
  <div>
    <h1> List of all the Chore Group</h1>
    {Object.entries(lengthChoreGroup).map(([kidId, length]) => (
       <form key={kidId} onSubmit={(e) => handleSubmitGroup(e )}>
    <div key={length}>
    <div className="form-container"></div>
     <div className='date-kid'>
            <label className="label-value">
              Kid :
              <select value={selectedKid} onChange={handleKidChange}>
                <option value="">Select Kid</option>
                {kids.map(kidAlone => (
                  <option key={kidAlone.kidId} value={kidAlone.kidId}>{kidAlone.name}</option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="label-value">
              Select a Date:
              <DatePicker
                id="dueDate"
                selected={dueDate}
                onChange={handleDueDateChange}
                customInput={<CalendarIcon />}
                dateFormat="yyyy-MM-dd"
              />
            </label>
          </div>
          <div>
            <label className="label-value">
            Chore Group
            <ul>
            {kidGroupChores[kidId].map(chore => (
              <li key={chore.id}>{chore.description}</li>
            ))}
          </ul>
            </label>
          </div>

          <button type="submit">Assign</button>         
</div>
</form >
    ))}
</div>

)};
export default AssignChoreGroup;