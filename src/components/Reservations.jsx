import {useState } from "react";
function Reservations({ reservations, setReservations, customers, setCustomers, services, setServices }) {
  const getCustomerById = (id) => customers.find(c => c.id === Number(id))
  const getServiceById = (id) => services.find(s => s.id === Number(id))

  const [selectedReservation, setSelectedReservation] = useState(null)
  const selectedCustomer = selectedReservation
    ? customers.find(c => c.id === Number(selectedReservation.customerId))
    : null;
  const selectedService = selectedReservation
    ? services.find(s => s.id === Number(selectedReservation.serviceId))
    : null;

  const [shoForm, setShowForm] = useState(false);
  const [newReservation, setNewReservation] = useState({
    customerId: 'null',
    date: '',
    time: '',
    serviceId: 'null',
  });
  const handleAddReservation = () => {
    const nextId =
      reservations.length > 0
        ? Math.max(...reservations.map(r => r.id)) + 1
        : 0
    setReservations(prev => [
      ...prev, {
        id: nextId,
        customerId: newReservation.customerId,
        date: newReservation.date,
        time: newReservation.time,
        serviceId: newReservation.serviceId,
        status: '予約中'
      }
    ]
    )
    setShowForm(false)
  };
  const handleDeleteReservation = (id) => {
    const ok = window.confirm('削除しますか？')
    if(ok){
    setReservations(prev =>
      prev.filter(reservation =>
        reservation.id !== id
      )
    )}return;
  };
  const [changeForm, setChangeForm] = useState(false);
  const [changeReservation, setChangeReservation] = useState({
    id:null,
    date: '',
    time: '',
    customerId:null,
    serviceId: null
  });
  const handleChangeReservation = () => {
    setReservations(prev =>
      prev.map(reservation =>
        reservation.id === changeReservation.id
          ? {...reservation, ...changeReservation}
          : reservation
      )
    )
    setChangeForm(false)
  };

  const getNextStatus = (status) => {
    if (status === '予約中') return '完了';
    if (status === '完了') return 'キャンセル';
    if (status === 'キャンセル') return '予約中';
  };
  const handleChangeStatus = (id) => {
    setReservations(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: getNextStatus(r.status) } : r
      )
    );
  };

  return (
    <div className="container">
      <h2 className="section-title">予約一覧</h2>
      <button className="add-items" onClick={() => setShowForm(true)}>＋　新規追加</button>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>名前</th>
              <th>メニュー</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r) => {
              const customer = getCustomerById(r.customerId);
              const service = getServiceById(r.serviceId);
              return (
                <tr key={r.id} onClick={() => setSelectedReservation(r)}>
                  <td>{r.date}</td>
                  <td>{customer?.dog}</td>
                  <td>{service?.name}</td>
                  <td><button className={`status-btn ${r.status === '予約中' ? 'status-blue' :
                    r.status === '完了' ? 'status-green' :
                      r.status === 'キャンセル' ? 'status-red' : ''
                    }`}
                    onClick={(e) => { handleChangeStatus(r.id); e.stopPropagation() }}>{r.status}</button></td>
                  <td><button className="edit-btn" onClick={(e) => {
                    e.stopPropagation();
                    setChangeForm(true);
                    setChangeReservation({
                      id:r.id,
                      date: r.date,
                      time: r.time,
                      serviceId: r.serviceId,
                      customerId: r.customerId
                    })
                  }}>編集</button><button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleDeleteReservation(r.id) }}>削除</button></td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
      {/* 新規追加 */}
      {shoForm && (
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
              <select
                value={newReservation.serviceId ?? ''}
                onChange={(e) => setNewReservation({ ...newReservation, serviceId: Number(e.target.value) })} >
                <option value="">メニューを選択</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              <div className="end-btn">
                <button onClick={handleAddReservation}>追加</button>
                <button onClick={() => setShowForm(false)}>キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 予約詳細 */}
      {selectedReservation && (
        <div className="modal-overlay" onClick={() => setSelectedReservation(null)}>
          <div className="modal">
            <h3>予約詳細</h3>
            <p>日付: {selectedReservation.date}</p>
            <p>時間: {selectedReservation.time}</p>
            <p>名前: {selectedCustomer?.name}</p>
            <p>ペット名: {selectedCustomer?.dog}</p>
            <p>サービス: {selectedService?.name}</p>
            <p>料金: {selectedService?.price}</p>
          </div>
        </div>
      )
      }

      {/* 予約編集 */}
      {changeForm && (
        <div className="modal-overlay" >
          <div className="modal">
            <div className="add-form">
              <h3>予約編集</h3>
              <input type="number"
                placeholder="顧客番号"
                value={changeReservation.customerId}
                onChange={(e) => setChangeReservation({ ...changeReservation, customerId: e.target.value })} />

              <input type="date"
                value={changeReservation.date}
                onChange={(e) => setChangeReservation({ ...changeReservation, date: e.target.value })} />

              <input type="time"
                value={changeReservation.time}
                onChange={(e) => setChangeReservation({ ...changeReservation, time: e.target.value })} />

                <select
                value={changeReservation.serviceId ?? ''}
                onChange={(e) => setChangeReservation({ ...changeReservation, serviceId: Number(e.target.value) })} >
                <option value="">メニューを選択</option>
                {services.map(service => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>


              <div className="end-btn">
                <button onClick={handleChangeReservation}>変更</button>
                <button onClick={() => setChangeForm(false)}>キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Reservations;