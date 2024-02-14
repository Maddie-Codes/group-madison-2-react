import React,  { useState, useEffect }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../axios_helper';

import 'bootstrap/dist/css/bootstrap.min.css';

const RewardManagement = (props) => {

  const [rewards, setRewards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rewardPoints, setRewardPoints] = useState(props.rewardPoints);

  const navigate = useNavigate();
  const config = {
    headers: { Authorization: getAuthToken() }
};
  useEffect(() => {
    fetchData();
  },[]);

 const fetchData = async () => {
    try {
      await axios.get('http://localhost:8080/api/rewards/list',config)
.then(function (response) {
  setRewards(response.data);
})
.catch(function (error) {
  console.log(error);
})
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const navigateToAddRewards = () => {
    navigate('/addRewards');
  };

  const navigateToEditRewards = (rewardId) => {
    navigate(`/editRewards/${rewardId}`);
  };
  
  const handleDelete = (rewardId) =>{
    console.log("calling hanfle delete : ",rewardId)
    axios.delete("http://localhost:8080/api/rewards/"+rewardId).then((response)=>{
      console.log("delete response : ",response)
      fetchData();
    }).catch((error)=>{
      console.log("Error while deleting reward : ",error)
    });

  }

  const claimReward = (rewardPoints)=>{
  axios.put('http://localhost:8080/api/rewards/claim/'+rewardPoints+'/'+props.kidId,null,config)
.then(function (response) {
  setRewardPoints(response.data.points)
})
.catch(function (error) {
  console.log(error);
})
  }
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
      
    <div className='container'>
      {props.role=="kid"?<h2 className='text-center'>Available Reward Points : {rewardPoints}</h2>:<h2 className='text-center'>List of Rewards</h2>}
      {props.role=="kid"?<></>:<button className='btn btn-primary mb-2' onClick={()=>{navigateToAddRewards()}}>Add Rewards</button>}
      <table className='table table-striped table-bordered'>
        
        {rewards.length > 0 ? (
          <>
          <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
              {rewards.map(reward => (
                <tr>
                <td> {reward.rewardId}</td>
                  <td> {reward.name}</td>
                  <td>{reward.description}</td>
                  <td>{reward.points}</td>
                  {props.role=="kid" 
                    ? <td><button disabled={rewardPoints<reward.points} className='btn btn-warning mr-2'onClick={() => claimReward(reward.points)}>Claim Reward</button></td>
                    :<td><button className='btn btn-warning mr-2'onClick={() => navigateToEditRewards(reward.rewardId)}>Edit</button>
                    <button className='btn btn-danger'onClick= {()=>{handleDelete(reward.rewardId)}}>Delete</button></td>
                  }
                </tr>
              ))}
          </tbody>

              </>
          ) : (
            <p>No data available</p>
          )}
      </table>
    </div>
    )}
    </div>
  );
};

export default RewardManagement;
