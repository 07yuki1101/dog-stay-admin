function Sidebar({ page, onChangePage ,setIsLoggedIn}) {
  const menuList = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'services', label: 'Services' },
    { id: 'customers', label: 'Customers' },
    // { id: 'setting', label: 'Setting' },
  ];
  return (
    <div className="sidebar">
      <h2 className="title">DOG STAY Admin</h2>
      {menuList.map(menu => (
        <button
          key={menu.id}
          className={page === menu.id ? 'active' : ''}
          onClick={() => onChangePage(menu.id)}
        >
          {menu.label}
        </button>
      ))}
      
        <button onClick={()=>{setIsLoggedIn(false);
          localStorage.removeItem('login');
          setIsLoggedIn(false)
        }}>ログアウト</button>
     
    </div>

  );

}
export default Sidebar;