import { useState } from "react";

function Services() {
  const [services, setServices] = useState([
    { id: '0', name: 'ホテル', time: '24時間', price: '8000', status: '公開中' },
    { id: '1', name: 'トリミング', time: '120分', price: '6000', status: '公開中' },
    { id: '2', name: '散歩代行', time: '60分', price: '3000', status: '公開中' },
  ]);
  const handleDeleteService = (id) => {
    setServices(prev =>
      prev.filter(service =>
        service.id !== id
      )
    );
  };
  const [changeForm, setChangeForm] = useState(false);
  const [changeService, setChangeService] = useState({
    id: null,
    name: '',
    time: '',
    price: ''
  });
  const handleChangeService = () => {
    setServices(prev =>
      prev.map(service =>
        service.id === changeService.id
          ? {
            ...service,
            name: changeService.name,
            time: changeService.time,
            price: changeService.price
          }
          : service
      )
    );
    setChangeForm(false);
  }

  const [shoForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({
    name: '',
    time: '',
    price: ''
  });

  const handleAddService = () => {
    setServices([
      ...services,
      {
        id: Date.now(),
        name: newService.name,
        time: newService.time,
        price: newService.price,
        status: '公開中'
      },
    ]);
    setNewService({ name: '', time: '', price: '' });
    setShowForm(false);
  };

  const getNextStatus = (status) => {
    if (status === '公開中') return '停止中'
    if (status === '停止中') return '公開中'
  };

  const handleStatusChange = (id) => {
    setServices(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, status: getNextStatus(s.status) }
          : s
      )
    )
  };
  return (
    <div className="container">
      <h2 className="section-title">サービス一覧</h2>
      <button className="add-service" onClick={() => setShowForm(true)}>＋　サービスの追加</button>
      {shoForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="service-form">
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
                  setNewService({ ...newService, price: e.target.value })
                }
              />
              <button onClick={handleAddService}>追加</button>
              <button onClick={() => setShowForm(false)}>キャンセル</button>
            </div>
          </div>
        </div>
      )}
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
        {services.map((s) => (
          <tbody>
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.time}</td>
              <td>{s.price}</td>
              <td><button className={`status-btn ${s.status === '公開中'
                ? 'status-blue'
                : 'status-red'
                }`}
                onClick={() => handleStatusChange(s.id)}>{s.status}</button></td>
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
          </tbody>
        ))}

      </table>
      {changeForm && (
        <div>
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
                price: e.target.value
              })
            }
          />
          <button onClick={handleChangeService}>変更</button>
          <button onClick={() => setChangeForm(false)}>キャンセル</button>
        </div>
      )}

    </div >
  );
};
export default Services;