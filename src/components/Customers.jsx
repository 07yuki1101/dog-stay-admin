import { useState } from "react";

function Customers({customers,setCustomers}) {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [search, setSearch] = useState('');
  const filteredCustomers = customers.filter((c=>
    c.name.includes(search)||
    c.dog.includes(search)||
    c.phoneNumber.includes(search)
  ));


  return (
    <div className="container">
      <h2 className="section-title">顧客一覧</h2>
      <div>
        <input type="text" 
        placeholder="名前　ペット名　電話番号　で検索"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="search-input"/>
      </div>
      <table>
        <thead>
          <tr>
            <th>名前</th>
            <th>ペット名</th>
            <th>電話番号</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((s)=>(
          <tr key={s.id} onClick={()=>setSelectedCustomer(s)}>
            <td>{s.name}</td>
            <td>{s.dog}</td>
            <td>{s.phoneNumber}</td>
          </tr>
          ))}
        </tbody>
      </table>
          {selectedCustomer && (()=>{
            
            return(
              <div className="modal-overlay"> 
                <div className="modal">
                  <h3>顧客詳細</h3>
                  <p>名前: {selectedCustomer.name}</p>
                  <p>顧客番号: {selectedCustomer.id}</p>
                  <p>ペット名:{selectedCustomer.dog}</p>
                  <p>種類: {selectedCustomer.breed}</p>
                  <p>電話番号: {selectedCustomer.phoneNumber}</p>
                  <button onClick={()=>setSelectedCustomer(null)}>閉じる</button>
                </div>

              </div>
            )
              })()}
        
    </div>
  );
};
export default Customers;