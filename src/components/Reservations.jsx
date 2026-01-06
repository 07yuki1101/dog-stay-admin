import { useState } from "react";
function Reservations({ reservations, setReservations, customers, setCustomers }) {
  const today = new Date().toISOString().split('T')[0]
  const [showForm, setShowForm] = useState(false);
  const [newReservation, setNewReservation] = useState({
    customerId: '', date: today, time: '', menu: '', fee: ''
  },
  )
  const handleAddReservation = () => {
    const nextId = reservations.length > 0
      ? Math.max(...reservations.map(c => c.id)) + 1
      : 0
    setReservations(prev => [
      ...prev, {
        id: nextId, customerId: newReservation.customerId, date: newReservation.date, time: newReservation.time, menu: newReservation.menu, fee: newReservation.fee, status: '予約中'
      }
    ])
    setNewReservation({ customerId: '', date: today, time: '', menu: '', fee: '' })
    setShowForm(false)
  }

  const getCustomerById = (id) => customers.find(c => c.id === Number(id))
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
      <button className="add-items" onClick={() => setShowForm(true)}>＋　新規予約</button>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="add-form">
              <input type="number"
                placeholder="顧客番号"
                value={newReservation.customerId}
                onChange={(e) => setNewReservation({ ...newReservation, customerId: e.target.value })} />

              <input type="date"
                value={newReservation.date}
                onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })} />

              <input type="time"
                value={newReservation.time}
                onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })} />
              <input type="text"
                value={newReservation.menu}
                placeholder="メニュー"
                onChange={(e) => setNewReservation({ ...newReservation, menu: e.target.value })} />
              <input type="number"
                value={newReservation.fee}
                placeholder="料金"
                onChange={(e) => setNewReservation({ ...newReservation, fee: e.target.value })} />


              <button onClick={handleAddReservation}>追加</button>
              <button onClick={() => setShowForm(false)}>キャンセル</button>
            </div>
          </div>
        </div>

      )}
      <ul className="reservation-filter">
        <li><button onClick={() => setFilterStatus('All')}>All</button></li>
        <li><button onClick={() => setFilterStatus('予約中')}>予約中</button></li>
        <li><button onClick={() => setFilterStatus('完了')}>完了</button></li>
        <li><button onClick={() => setFilterStatus('キャンセル')}>キャンセル</button></li>
      </ul>
      <div className="table-wrapper">
        <table className="table">
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
              return (
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
      </div>
      {selectedReservation && (() => {
        const customer = getCustomerById(selectedReservation.customerId);
        return (
          <div className="modal-overlay">
            <div className="modal">
              <h3>予約詳細</h3>
              <p>名前: {customer?.name}</p>
              <p>顧客番号: {selectedReservation.customerId}</p>
              <p>犬種: {customer?.breed}</p>
              <p>ペット名: {customer?.dog}</p>
              <p>電話番号: {customer?.phoneNumber}</p>
              <p>日付: {selectedReservation.date}</p>
              <p>時間: {selectedReservation.time}</p>
              <p>サービス: {selectedReservation.menu}</p>
              <p>料金: ¥ {selectedReservation.fee}</p>
              <button onClick={() => setSelectedReservation(null)}>閉じる</button>
            </div>
          </div>
        );
      })()}
    </div>


  );
}

export default Reservations;