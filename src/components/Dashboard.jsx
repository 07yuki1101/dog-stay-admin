function Dashboard({reservations}) {
  const total = reservations.length;
  const reserved = reservations.filter(r=>r.date === '2025-12-20' && r.status==='予約中').length;
  const canceled = reservations.filter(r=>r.date === '2025-12-20' && r.status==='キャンセル').length;
  const dashboardMenus = [
    { label: '予約数', value: '3 件' },
    { label: '売上', value: '¥12000' },
    { label: 'キャンセル', value: '1件' }
  ];
  
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
              <h3></h3>
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