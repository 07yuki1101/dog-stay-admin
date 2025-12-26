function Sidebar({ page, onChangePage }) {
  const menuList = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'services', label: 'Services' },
    { id: 'customers', label: 'Customers' },
    { id: 'setting', label: 'Setting' },
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
    </div>

  );

}
export default Sidebar;