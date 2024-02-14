import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import AddChores from './components/chores/AddChores';
import UpdateChore from './components/chores/UpdateChore';
import ChoresList from './components/chores/ChoresList';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import ParentLogin from './components/ParentLogin';
import ParentDashboard from './components/ParentDashboard';
import AssignedChores from './components/chores/AssignedChores';
import RewardManagement from './components/rewards/RewardManagement';
import AddReward from './components/rewards/AddReward';
import EditReward from './components/rewards/EditReward';
import ApiCall from './components/api/ApiCall';
import ParentStatistics from './components/ParentStatistics';


function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/api/register' element={<Register />} />
     
      <Route path='/api/parentLogin' element={<ParentLogin />} />
      <Route path='/api/parentDash' element={<ParentDashboard />} />
      <Route path='/api/parent-dashboard/statistics' element={<ParentStatistics />} />
      <Route path="/api/chores/add" element={<AddChores />} />
      <Route path="/api/chores/list" element={<ChoresList />} />
      <Route path="/api/assignments/assigned-chores/:id" element={<AssignedChores />} />
      <Route path="/api/chores/edit/:choreId" element={<UpdateChore />} />
      <Route path="/api/date" element={<ApiCall />} />
      <Route path="/allrewards" element={<RewardManagement />} />
      <Route path="/addRewards" element={<AddReward />} />
      <Route path="/editRewards/:rewardId" element={<EditReward />} />
    </Routes>
  );
}
export default App;