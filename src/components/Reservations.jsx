import { useState } from "react";
function Reservations({ reservations, setReservations, customers, setCustomers }) {

  const getCustomerById = (id) => customers.find(c => c.id === id)
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredReservations =
    filterStatus === 'All'
      ? reservations
      : reservations.filter(r => r.status === filterStatus)

  const [selectedReservation, setSelectedReservation] = useState(null);

  const getNextStatus = (status) => {
    if (status === '予約中') return '完了';
    if (status === '完了') return 'キャンセル';
    if (status === 'キャンセル') return '予約中'
  };
  const handleStatusChange = (id) => {
    setReservations(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, status: getNextStatus(r.status) }
          : r
      )
    );
  };

  return (

    <div className="container">
      <h2 className="section-title">予約一覧</h2>
      <ul className="reservation-filter">
        <li><button onClick={() => setFilterStatus('All')}>All</button></li>
        <li><button onClick={() => setFilterStatus('予約中')}>予約中</button></li>
        <li><button onClick={() => setFilterStatus('完了')}>完了</button></li>
        <li><button onClick={() => setFilterStatus('キャンセル')}>キャンセル</button></li>
      </ul>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>日付</th>
            <th>名前</th>
            <th>サービス</th>
            <th>状態</th>
          </tr>
        </thead>

        <tbody>
          {filteredReservations.map(r => {
              const customer = getCustomerById(r.customerId);
          return(
          <tr key={r.id} onClick={() => setSelectedReservation(r)}>

            <td>{r.date}</td>
            <td>{customer?.dog}</td>
            <td>{r.menu}</td>
            <td><button
              className={`status-btn ${r.status === '予約中' ? 'status-blue'
                : r.status === '完了' ? 'status-green' : 'status-red'
                }`}
              onClick={(e) => { e.stopPropagation(); handleStatusChange(r.id); }}>{r.status}</button></td>
          </tr>
          );
        })}
        </tbody>
      </table>
          {selectedReservation && (()=>{
            const customer = getCustomerById(selectedReservation.customerId);
            return(
            <div className="modal-overlay">
              <div className="modal">
                <h3>予約詳細</h3>
                <p>名前: {customer?.name}</p>
                <p>犬種: {customer?.breed}</p>
                <p>ペット名: {customer?.dog}</p>
                <p>電話番号: {customer?.phoneNumber}</p>
                <p>日付: {selectedReservation.date}</p>
                <p>時間: {selectedReservation.time}</p>
                <p>サービス: {selectedReservation.menu}</p>
                <button onClick={() => setSelectedReservation(null)}>閉じる</button>
              </div>
            </div>
          );
          })()}
    </div>


  );
}

export default Reservations;