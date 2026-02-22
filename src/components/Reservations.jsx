import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"
function Reservations() {
  useEffect(()=>{
    console.log('Reservations mounted');
  },[])
  const [reservations, setReservations] = useState([]);
  const fetchReservations = async () => {
   
    const snapshot = await getDocs(collection(db,'reservations'));

    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setReservations(data);
    console.log('reservations',data)
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
      console.log('service',data)
    };
    fetchServices();
  }, []);

  const getServiceLabel = (menuId) => {
    const service = services.find(s => s.id === menuId);
    return service ? service.name : menuId;
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
            <tr key={r.id}>
              <td>{r.date}</td>
              <td>{r.name}</td>
              <td>{r.dogType}</td>
              <td>{getServiceLabel(r.menu)}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)
}
export default Reservations;