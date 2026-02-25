import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"
function Reservations() {
  useEffect(() => {
    console.log('Reservations mounted');
  }, [])
  const [reservations, setReservations] = useState([]);
  const fetchReservations = async () => {

    const snapshot = await getDocs(collection(db, 'reservations'));

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setReservations(data);
    console.log('reservations', data)
  }

  useEffect(() => {
    fetchReservations();
  }, []);

  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await getDocs(collection(db, 'services'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(data);
      console.log('service', data)
    };
    fetchServices();
  }, []);

  const getServiceLabel = (menuId) => {
    const service = services.find(s => s.id === menuId);
    return service ? service.name : menuId;
  }

  const [selectedReservation, setSelectedReservation] = useState(null)

  const updateStatus = async(id,currentStatus)=>{
    let nextStatus 
    if(currentStatus === '予約中'){
      nextStatus = '完了'
    }else if(currentStatus === '完了'){
      nextStatus = 'キャンセル'
    }else{
      nextStatus = '予約中'
    }

    try{
      const reservationRef = doc(db, 'reservations', id)
      await updateDoc(reservationRef,{
        status: nextStatus
      })

      setReservations((prev)=>
      prev.map((r)=>r.id === id 
      ? {...r, status:nextStatus}:r))
    }catch(error){
      console.error('更新エラー:',error)
    }
    
  } 

  return (
    <div className="container">
      <h2 className="section-title">予約一覧</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>名前</th>
              <th>犬種</th>
              <th>メニュー</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id} onClick={() => setSelectedReservation(r)}>
                <td>{r.date}</td>
                <td>{r.name}</td>
                <td>{r.dogType}</td>
                <td>{getServiceLabel(r.menu)}</td>
                <td><button className={`status-btn ${r.status === '予約中'
                  ? 'status-green'
                  : r.status === '完了'
                    ? 'status-blue'
                    : r.status === 'キャンセル'
                      ? 'status-red'
                      : ''}`}
                      onClick={(e)=>{e.stopPropagation();updateStatus(r.id,r.status)}}>{r.status}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedReservation && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>予約詳細</h3>
              <p>名前 : {selectedReservation.name}</p>
              <p>日付 : {selectedReservation.date}</p>
              <p>時間 : {selectedReservation.time}</p>
              <p>犬種 : {selectedReservation.dogType}</p>
              <p>メニュー : {getServiceLabel(selectedReservation.menu)}</p>
              <button onClick={() => setSelectedReservation(null)}>閉じる</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Reservations;