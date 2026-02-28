import { useState } from "react";
import {updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"
function Customers({ customers, setCustomers }) {
  const [changeForm, setChangeForm] = useState(false);
  const [changeCustomer, setChangeCustomer] = useState({
    name: '',
    breed: '',
    dog: '',
    phoneNumber: ''
  });
  const handleChangeCustomer = () => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === changeCustomer.id
          ? {
            ...customer,
            name: changeCustomer.name,
            breed: changeCustomer.breed,
            dog: changeCustomer.dog,
            phoneNumber: changeCustomer.phoneNumber
          }
          : customer
      )
    )
    setChangeForm(false)
  };
  const handleDeleteCustomer = (id) => {
    const ok = window.confirm('削除しますか？')
    if(ok){
    setCustomers(prev =>
      prev.filter(customer =>
        customer.id !== id
      )
    )}return;
  }
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState('');
  const filteredCustomers = customers.filter((c =>
    c.name.includes(search) ||
    c.dog.includes(search) ||
    c.phoneNumber.includes(search)
  ));
  const [showForm, setShowForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    breed: '',
    dog: '',
    phoneNumber: ''
  })
  const handleAddCustomer = () => {
    const nextId =
      customers.length > 0
        ? Math.max(...customers.map(c => c.id)) + 1
        : 0
    setCustomers(prev => [
      ...prev,
      {
        id: nextId,
        name: newCustomer.name,
        breed: newCustomer.breed,
        dog: newCustomer.dog,
        phoneNumber: newCustomer.phoneNumber
      }
    ])
    setNewCustomer({ name: '', breed: '', dog: '', phoneNumber: '' })
    setShowForm(false)
  };
  return (
    <div className="container">
      <h2 className="section-title">顧客一覧</h2>
      <div>
        <input type="text"
          placeholder="🔍 名前　ペット名　電話番号　で検索 🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input" />
      </div>
      <div><button className="add-items" onClick={() => setShowForm(true)}>＋　新規追加</button></div>
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="add-form">
              <input type="text"
                placeholder="名前"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} />

              <input type="text"
                placeholder="犬種"
                value={newCustomer.breed}
                onChange={(e) => setNewCustomer({ ...newCustomer, breed: e.target.value })} />

              <input type="text"
                placeholder="ペット名"
                value={newCustomer.dog}
                onChange={(e) => setNewCustomer({ ...newCustomer, dog: e.target.value })} />

              <input type="text"
                placeholder="電話番号 例）000-0000-0000"
                value={newCustomer.phoneNumber}
                onChange={(e) => setNewCustomer({ ...newCustomer, phoneNumber: e.target.value })} />
              <div className="end-btn">
                <button onClick={handleAddCustomer}>追加</button>
                <button onClick={() => setShowForm(false)}>キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>名前</th>
              <th>犬種</th>
              <th>電話番号</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((s) => (
              <tr key={s.id} onClick={() => setSelectedCustomer(s)}>
                <td>{s.name}</td>
                <td>{s.dogType}</td>
                <td>{s.phone}</td>
                <td><button className="edit-btn" onClick={(e) => {
                  e.stopPropagation(); setChangeForm(true); setChangeCustomer({
                    id: s.id,
                    name: s.name,
                    dog: s.dog,
                    breed: s.breed,
                    phoneNumber: s.phoneNumber
                  })
                }}>編集</button><button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleDeleteCustomer(s.id) }}>削除</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {changeForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="add-form">
              <input type="text"
                value={changeCustomer.name}
                placeholder="名前"
                onChange={(e) =>
                  setChangeCustomer({
                    ...changeCustomer, name: e.target.value
                  })
                } />
              <input
                type="text"
                value={changeCustomer.id ?? ""}
                placeholder="顧客ID"
                onChange={(e) =>
                  setChangeCustomer({
                    ...changeCustomer, id: Number(e.target.value)
                  })
                } />

              <input type="text"
                placeholder="ペット名"
                value={changeCustomer.dog}
                onChange={(e) =>
                  setChangeCustomer({
                    ...changeCustomer, dog: e.target.value
                  })
                }
              />
              <input type="text"
                placeholder="犬種"
                value={changeCustomer.breed}
                onChange={(e) =>
                  setChangeCustomer({
                    ...changeCustomer, breed: e.target.value
                  })
                }
              />
              <input type="text"
                placeholder="電話番号"
                value={changeCustomer.phoneNumber}
                onChange={(e) =>
                  setChangeCustomer({
                    ...changeCustomer, phoneNumber: e.target.value
                  })
                }
              />
              <div className="end-btn">
                <button onClick={handleChangeCustomer}>変更</button>
                <button onClick={(e) => { e.stopPropagation(); setChangeForm(false) }}>キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedCustomer && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>顧客詳細</h3>
            <p>名前: {selectedCustomer.name}</p>
            <p>顧客ID: {selectedCustomer.id}</p>
            <p>犬種: {selectedCustomer.dogType}</p>
            <p>電話番号: {selectedCustomer.phone}</p>
            <button onClick={() => setSelectedCustomer(null)}>閉じる</button>
          </div>
        </div>
      )}

    </div>
  );
};
export default Customers;
