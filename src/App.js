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
    { id: 0, customerId: 0, date: '2025-12-20', time: '10:00', menu: 'ホテル', fee:8000, status: '予約中' },
    { id: 1, customerId: 1, date: '2025-12-20', time: '9:00', menu: '散歩代行', fee:3000, status: '予約中' },
    { id: 2, customerId: 2, date: '2025-12-20', time: '8:00', menu: 'ホテル', fee:8000, status: '予約中' },
    { id: 3, customerId: 3, date: '2025-12-19', time: '14:00', menu: 'トリミング', fee:6000, status: '完了' },
    { id: 4, customerId: 4, date: '2025-12-19', time: '16:00', menu: 'トリミング', fee:6000, status: 'キャンセル' },
  ]);
  const [customers, setCustomers] = useState([
    { id: 0, name: '鈴木一郎', breed: '柴犬', dog: 'ポチ', phoneNumber: '090-0000-0000', },
    { id: 1, name: '佐藤二郎', breed: 'トイプードル', dog: 'モコ', phoneNumber: '090-0000-0001', },
    { id: 2, name: '北島三郎', breed: 'ダックスフンド', dog: 'はな', phoneNumber: '090-0000-0002', },
    { id: 3, name: '伊藤四郎', breed: 'シュナウザー', dog: 'うる', phoneNumber: '090-0000-0003', },
    { id: 4, name: '稲垣五郎', breed: 'ミックス', dog: 'ラニ', phoneNumber: '090-0000-0004', },
  ])
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
        />}
      {page === 'dashboard' && <Dashboard
        reservations={reservations}
      />}
      {page === 'services' && <Services />}
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
