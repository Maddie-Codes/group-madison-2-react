import React,  { useState, useEffect }  from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import RewardManagement from '../rewards/RewardManagement';
import { getAuthToken } from '../../axios_helper';
const Kid = (props) => {

  const [kidId, setKidId] = useState([]);
  const [chores, setChores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRewards, setShowRewards] = useState(false);
  const [rewardPoints, setRewardPoints] = useState();
  useEffect(() => {
    fetchData();
  },[]);
  const config = {
    headers: { Authorization: getAuthToken() }
};

const fetchData = async () => {
    try {
      await axios.get('http://localhost:8080/api/chores/kids-assigned-chores-by-username/'+props.userName, config)
.then(function (response) {
  setKidId(response.data.kid.kidId);
  setRewardPoints(response.data.kid.points);
  setChores(response.data.chores);
})
.catch(function (error) {
})
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const completeTask = (choreId) => {
    axios.put("http://localhost:8080/api/chores/kid-complete/"+kidId+"/"+choreId, null, config).then((response)=>{
      fetchData();
    }).catch((error)=>{
    });
  };
  
  const claimRewards = () => {
    setShowRewards(true);
  }
  
  if(loading){
    return(<p>Loading...</p>)
  }
  else if(showRewards){
    return(<RewardManagement role="kid" rewardPoints={rewardPoints} kidId={kidId}></RewardManagement>)
  }

  return (
    <div>
      
    <div className='container'>
      <h2 className='text-center'>List of Tasks</h2>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>ValuePoints</th>
            <th>TypeOfValue</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        { chores.length > 0 ? (
            <>
              {chores.map(chore => (
                <tr>
                <td>{chore.choreId}</td>
                  <td>{chore.name}</td>
                  <td>{chore.description}</td>
                  <td>{chore.dueDate}</td>
                  <td>{chore.value}</td>
                  <td>{chore.valueType}</td>
                  <td>{chore.status}</td>
                  <td>{chore.status=="COMPLETED" || chore.status=="APPROVED" ? <>No Action needed</> : <button className='btn btn-warning mr-2'onClick={() => completeTask(chore.choreId)}>Complete Task</button>}</td>
                 
                </tr>
              ))}
              </>
          ) : (
            <p>No data available</p>
          )}
        </tbody>
      </table>
      <button className='btn btn-warning mr-2' onClick={()=> claimRewards()}>Claim Rewards</button>
    </div>
    
    </div>
  );
};

export default Kid;
