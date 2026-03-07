import { useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"
function Customers({ customers, setCustomers }) {
  const [changeForm, setChangeForm] = useState(false);
  const [changeCustomer, setChangeCustomer] = useState({
    name: '',
    dogType: '',
    phone: ''
  });
  const handleChangeCustomer = async () => {
    try{
    const ref = doc(db, 'customers', changeCustomer.id);

    await updateDoc(ref, {
      name: changeCustomer.name,
      dogType: changeCustomer.dogType,
      phone: changeCustomer.phone
    });

    setCustomers(prev =>
      prev.map(c =>
        c.id === changeCustomer.id
          ? {
            ...c,
            ...changeCustomer
          }
          : c
      )
    )
    setChangeForm(false)
  }catch(error){
    console.error(error);
    alert('更新に失敗しました')
  }
  };
  const handleDeleteCustomer = async(id) => {
    try{
    const ok = window.confirm('削除しますか？')
    if (ok) {
      await deleteDoc(doc(db,'customers',id));

      setCustomers(prev =>
        prev.filter(customer =>
          customer.id !== id
        ));
    }
  }catch(error){
    console.error(error);
    alert('削除に失敗しました')
  } 
  };
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState('');
  const filteredCustomers = customers.filter((c =>
    c.name.includes(search) ||
    c.dogType.includes(search) ||
    c.phone.includes(search)
  ));
  const [showForm, setShowForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    dogType: '',
    phone: ''
  })
  const handleAddCustomer = async () => {
    const docRef = await addDoc(collection(db, 'customers'), {
      name: newCustomer.name,
      dogType: newCustomer.dogType,
      phone: newCustomer.phone,
      createdAt: serverTimestamp()
    });
    setCustomers(prev => [
      ...prev,
      {
        id: docRef.id,
        ...newCustomer
      }
    ]);
    setNewCustomer({ name: '', dogType: '', phone: '' })
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
                value={newCustomer.dogType}
                onChange={(e) => setNewCustomer({ ...newCustomer, dogType: e.target.value })} />

              <input type="tel"
                placeholder="電話番号 (ハイフンはつけない)"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} />
              <div className="end-btn">
                <button onClick={handleAddCustomer}>追加</button>
                <button onClick={() => {setShowForm(false);setNewCustomer({ name: '', dogType: '', phone: '' })}}>キャンセル</button>
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
            {filteredCustomers.map((c) => (
              <tr key={c.id} onClick={() => setSelectedCustomer(c)}>
                <td>{c.name}</td>
                <td>{c.dogType}</td>
                <td>{c.phone}</td>
                <td><button className="edit-btn" onClick={(e) => {
                  e.stopPropagation(); setChangeForm(true);setChangeCustomer({
                    id:c.id,
                    name:c.name,
                    dogType:c.dogType,
                    phone:c.phone
                  })
                }}>編集</button><button className="edit-btn" onClick={(e) => { e.stopPropagation(); handleDeleteCustomer(c.id) }}>削除</button></td>
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


              <input type="text"
                placeholder="犬種"
                value={changeCustomer.dogType}
                onChange={(e) =>
                  setChangeCustomer({
                    ...changeCustomer, dogType: e.target.value
                  })
                }
              />

              <input type="text"
                placeholder="電話番号"
                value={changeCustomer.phone}
                onChange={(e) =>
                  setChangeCustomer({
                    ...changeCustomer, phone: e.target.value
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
