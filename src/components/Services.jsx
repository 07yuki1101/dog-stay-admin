import { useState, useEffect, useCallback } from "react";
import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase"
function Services({ services, setServices }) {

  const fetchServices = useCallback(async () => {
    const snapshot = await getDocs(collection(db, 'services'));
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setServices(data);
  },[setServices]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices])

  const handleDeleteService = async(id) => {
    const ok = window.confirm('削除しますか？');
    if (!ok) return;

    await deleteDoc(doc(db,'services',id));
    fetchServices();
  };
  const [changeForm, setChangeForm] = useState(false);
  const [changeService, setChangeService] = useState({
    id: null,
    name: '',
    time: '',
    price: ''
  });
  const handleChangeService = async() => {
    await updateDoc(doc(db,'services',changeService.id),{
      name:changeService.name,
      time:changeService.time,
      price:changeService.price,
    });
    fetchServices();
    setChangeForm(false);
  }

  const [shoForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    time: '',
    price: ''
  });

  const handleAddService = async () => {
    await addDoc(collection(db, 'services'), {
      name: newService.name,
      time: newService.time,
      price: newService.price,
      status: '公開中'
    })

    fetchServices();
    setNewService({ name: '', time: '', price: '' });
    setShowForm(false);
  };

  

  const handleStatusChange = async(id,currentStatus) => {
    const nextStatus =
    currentStatus === '公開中' ?'停止中':'公開中';

    await updateDoc(doc(db,'services',id),{
      status:nextStatus
    });
    fetchServices()
  };
  return (
    <div className="container">
      <h2 className="section-title">サービス一覧</h2>
      <button className="add-items" onClick={() => setShowForm(true)}>＋　サービスの追加</button>

      {/* 新規追加 */}
      {shoForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="add-form">
              <input
                type="text"
                placeholder="サービス名"
                value={newService.name}
                onChange={(e) =>
                  setNewService({ ...newService, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="時間　例）60分"
                value={newService.time}
                onChange={(e) =>
                  setNewService({ ...newService, time: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="料金"
                value={newService.price}
                onChange={(e) =>
                  setNewService({ ...newService, price: Number(e.target.value) })
                }
              />
              <div className="end-btn">
                <button onClick={handleAddService}>追加</button>
                <button onClick={() => setShowForm(false)}>キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="table-wrapper">
        <table className="service-table">
          <thead>
            <tr>
              <th>サービス名</th>
              <th>時間</th>
              <th>料金</th>
              <th>状態</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (

              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.time}</td>
                <td>{s.price}</td>
                <td><button className={`status-btn ${s.status === '公開中'
                  ? 'status-blue'
                  : 'status-red'
                  }`}
                  onClick={() => handleStatusChange(s.id,s.status)}>{s.status}</button></td>
                <td><button className="edit-btn" onClick={() => {
                  setChangeService({
                    id: s.id,
                    name: s.name,
                    time: s.time,
                    price: s.price
                  });
                  setChangeForm(true)
                }}>編集</button><button className="edit-btn" onClick={() => handleDeleteService(s.id)}>削除</button></td>

              </tr>



            ))}
          </tbody>
        </table>
      </div>

      {/* サービス変更 */}
      {changeForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="add-form">
              <input type="text"
                placeholder="サービス名"
                value={changeService.name}
                onChange={(e) =>
                  setChangeService({
                    ...changeService,
                    name: e.target.value
                  })
                }
              />
              <input type="text"
                placeholder="時間　例）60分"
                value={changeService.time}
                onChange={(e) =>
                  setChangeService({
                    ...changeService,
                    time: e.target.value
                  })
                }
              />
              <input type="number"
                placeholder="料金"
                value={changeService.price}
                onChange={(e) =>
                  setChangeService({
                    ...changeService,
                    price: Number(e.target.value)
                  })
                }
              />
              <div className="end-btn">
                <button onClick={handleChangeService}>変更</button>
                <button onClick={() => setChangeForm(false)}>キャンセル</button>
              </div>
            </div>
          </div>
        </div>

      )}

    </div >
  );
};
export default Services;