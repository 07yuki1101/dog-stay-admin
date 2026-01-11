import {useState} from "react";

function Login({setIsLoggedIn}){
  const [password, setPassword]= useState('');

  const handleLogin = ()=>{
    if(password === '0000'){
      localStorage.setItem('login','true');
      setIsLoggedIn(true);
    }else{
      alert('パスワードが違います');
    }
    
  };

  return(
    <div className="login">
      <h2>ログイン</h2>
      <input type="password" 
      placeholder="パスワード"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  )
}
export default Login;