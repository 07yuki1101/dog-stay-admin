function Setting({isLoggedIn,setIsLoggedIn}) {
  return (
    <div className="container">
      
        <h2 className="section-title">設定</h2>

        <button onClick={()=>setIsLoggedIn(false)}>Logout</button>
      </div>

    
  );
};
export default Setting;