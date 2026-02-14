function Dashboard({reservations,services}) {
  const today = new Date().toISOString().split('T')[0]
  const reserved = reservations.filter(r=>r.date === today && r.status==='予約中').length;
  const sales = reservations.filter(r=>r.date ===today && r.status==='完了').reduce((sum,r)=>{
    const service = services.find(s=>s.id === Number(r.serviceId));
    return sum + Number(service?.price || 0);
  },0);
  const canceled = reservations.filter(r=>r.date === today && r.status==='キャンセル').length;
  
  
  return (
    <div className="container">
      <h2 className="section-title">今日の予約</h2>
      <ul className="dashboard-lists">
          <li>
              <p>予約数</p>
              <h3>{reserved} 件</h3>
          </li>
          <li>
              <p>売上</p>
              <h3>{sales} 円</h3>
          </li>
          <li>
              <p>キャンセル</p>
              <h3>{canceled} 件</h3>
          </li>
      </ul>
    </div>
  );
};
export default Dashboard;