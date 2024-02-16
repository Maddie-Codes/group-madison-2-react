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



const AssignChoreGroup = ({  handleAssignGroupChore }) => {

  const [selectedKid, setSelectedKid] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [kids, setKids] = useState([]);
  const [kidGroupChores, setkidGroupChores] = useState([]);

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
        // Loop for Kids
        const promises = kidsData.map(kid => {
          // console.log("${kid.kid_id}"+JSON.stringify(kid));
          fetch(`http://localhost:8080/api/groupassign/allchores?kidId=${kid.kidId}`)
            .then(response => response.json())
            .then(choresData => {
              setkidGroupChores(prevState => ({
                ...prevState,
                [kid.kidId]: choresData
              }));
              console.log(choresData);
            })
        }
        );
        Promise.all(promises)
          .catch(error => {
            console.error('Error fetching chores:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching kids:', error);
      });
  }, [username]);
  const handleKidChange = (e) => {
    setSelectedKid(e.target.value);
  };

  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  const handlekidGroupChores = (e) => {
    setkidGroupChores(e.target.value);
  };

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAssignGroupChore( selectedKid, setDueDate, setkidGroupChores);
  }

  return (
    <div>
      <h1> List of all the Chore Group</h1>
      {Object.entries(kidGroupChores).map(([kidId, chores]) => (
        chores && chores.length > 0 && (
        <div key={chores.kidId}>
          <form onSubmit={handleSubmit}>
            <div className='date-kid'>
              <label className="label-value">
                Kid :
                <select value={selectedKid} onChange={handleKidChange}>
                  <option value="">Select Kid</option>
                  {kids.map(kid => (
                    <option key={kid.kidId} value={kid.kidId}>{kid.name}</option>
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
                  {chores.map(chore => (
                    <li>{chore.description}</li>
                  ))}
                </ul>
              </label>
            </div>

            <button type="submit">Assign</button>

          </form >
        </div>
      )))
}
</div>
  )};
export default AssignChoreGroup;