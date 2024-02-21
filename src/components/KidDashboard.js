import  Kid from './kid/KidChores';
import { useSearchParams } from 'react-router-dom';
const KidDashboard = ()=>{
    const[searchParams] = useSearchParams();


    return( <Kid userName={searchParams.get('userName')}></Kid>)
}

export default KidDashboard;
