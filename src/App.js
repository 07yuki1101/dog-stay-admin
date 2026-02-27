import './App.css';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import Reservations from './components/Reservations';
import Customers from './components/Customers';
import Setting from './components/Setting';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
function App() {
  const [loaded, setLoaded] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchReservations = async () => {

      const snapshot = await getDocs(collection(db, 'reservations'));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setReservations(data);
    };
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, 'services'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(data);
    };
    fetchReservations();
    fetchServices();
  },[])


  const [customers, setCustomers] = useState([]);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const [page, setPage] = useState('dashboard')

  useEffect(() => {

    const savedReservations = localStorage.getItem('reservations');
    const savedCustomers = localStorage.getItem('customers');
    const savedServices = localStorage.getItem('services');

    if (savedReservations) setReservations(JSON.parse(savedReservations));
    if (savedCustomers) setCustomers(JSON.parse(savedCustomers));
    if (savedServices) setServices(JSON.parse(savedServices));

    setLoaded(true);
  }, [])

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations, loaded]);
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers, loaded]);
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem('services', JSON.stringify(services));
  }, [services, loaded]);


  return (
    <>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (

        <div style={{
          display: 'flex'
        }}>

          <Sidebar page={page} onChangePage={setPage} setIsLoggedIn={setIsLoggedIn} />

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
