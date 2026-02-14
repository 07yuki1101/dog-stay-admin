import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import Reservations from './components/Reservations';
import Customers from './components/Customers';
import Setting from './components/Setting';
import { useEffect, useState } from 'react';

function App() {
  const [loaded, setLoaded]=useState(false);
  const [reservations, setReservations] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [services, setServices] = useState([
    { id: 0, name: 'ホテル', time: '24時間', price: '8000', status: '公開中' },
    { id: 1, name: 'トリミング', time: '120分', price: '6000', status: '公開中' },
    { id: 2, name: '散歩代行', time: '60分', price: '3000', status: '公開中' },
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    if(localStorage.getItem('login')==='true'){
      setIsLoggedIn(true);
    }
  },[]);
    
  const [page, setPage] = useState('dashboard')

  useEffect(()=>{
    
    const savedReservations = localStorage.getItem('reservations');
    const savedCustomers = localStorage.getItem('customers');
    const savedServices = localStorage.getItem('services');

    if(savedReservations)setReservations(JSON.parse(savedReservations));
    if(savedCustomers)setCustomers(JSON.parse(savedCustomers));
    if(savedServices)setServices(JSON.parse(savedServices));
   
    setLoaded(true);
  },[])

  useEffect(()=>{
    if(!loaded)return;
    localStorage.setItem('reservations',JSON.stringify(reservations));
  },[reservations,loaded]);
  useEffect(()=>{
    if(!loaded)return;
    localStorage.setItem('customers',JSON.stringify(customers));
  },[customers,loaded]);
  useEffect(()=>{
    if(!loaded)return;
    localStorage.setItem('services',JSON.stringify(services));
  },[services,loaded]);
  
 
  return (
    <>
    {! isLoggedIn ?(
      <Login setIsLoggedIn ={setIsLoggedIn}/>
    ):(

    <div style={{
      display: 'flex'
    }}>
   
      <Sidebar page={page} onChangePage={setPage} setIsLoggedIn={setIsLoggedIn}/>

      {page === 'reservations' &&
        <Reservations
          reservations={reservations}
          setReservations={setReservations}
          customers={customers}
          services={services}
          setServices={setServices}
        />}
      {page === 'dashboard' && <Dashboard
        reservations={reservations}
        services={services}
      />}
      {page === 'services' && <Services
        services={services}
        setServices={setServices} />}
      {page === 'customers' && <Customers
        customers={customers}
        setCustomers={setCustomers}
        reservations={reservations}
        setReservations={setReservations}
      />}
      {page === 'setting' && <Setting 
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}      
      />}
    </div>
)}
    </>
  );
}

export default App;
