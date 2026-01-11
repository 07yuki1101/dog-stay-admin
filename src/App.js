import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Services from './components/Services';
import Reservations from './components/Reservations';
import Customers from './components/Customers';
import Setting from './components/Setting';
import { useState } from 'react';

function App() {
  const [reservations, setReservations] = useState([
    { id: 0, customerId: 0, date: '2025-12-20', time: '10:00', serviceId: 0, status: '予約中' },
    { id: 1, customerId: 1, date: '2025-12-20', time: '9:00', serviceId: 1, status: '予約中' },
    { id: 2, customerId: 2, date: '2025-12-20', time: '8:00', serviceId: 2, status: '予約中' },
    { id: 3, customerId: 3, date: '2025-12-19', time: '14:00', serviceId: 1, status: '完了' },
    { id: 4, customerId: 4, date: '2025-12-19', time: '16:00', serviceId: 0, status: 'キャンセル' },
  ]);
  const [customers, setCustomers] = useState([
    { id: 0, name: '鈴木一郎', breed: '柴犬', dog: 'ポチ', phoneNumber: '090-0000-0000', },
    { id: 1, name: '佐藤二郎', breed: 'トイプードル', dog: 'モコ', phoneNumber: '090-0000-0001', },
    { id: 2, name: '北島三郎', breed: 'ダックスフンド', dog: 'はな', phoneNumber: '090-0000-0002', },
    { id: 3, name: '伊藤四郎', breed: 'シュナウザー', dog: 'うる', phoneNumber: '090-0000-0003', },
    { id: 4, name: '稲垣五郎', breed: 'ミックス', dog: 'ラニ', phoneNumber: '090-0000-0004', },
  ])
  const [services, setServices] = useState([
    { id: 0, name: 'ホテル', time: '24時間', price: '8000', status: '公開中' },
    { id: 1, name: 'トリミング', time: '120分', price: '6000', status: '公開中' },
    { id: 2, name: '散歩代行', time: '60分', price: '3000', status: '公開中' },
  ]);
  const [page, setPage] = useState('dashboard')
  return (
    <div style={{
      display: 'flex'
    }}>
      <Sidebar page={page} onChangePage={setPage} />

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
      {page === 'setting' && <Setting />}
    </div>
  );
}

export default App;
