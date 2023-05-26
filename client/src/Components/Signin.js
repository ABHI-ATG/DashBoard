import { useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from './Menu';

const Signin=()=>{
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const loginUser=async (e)=>{
      e.preventDefault();
      const res=await fetch("/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            email,password
          })
      })
      const data=await res.json();
      if(data.status===422 || !data){
        console.log("Invalid Credentials");
      }else{
        localStorage.setItem("auth","yes");
        navigate('/');
        console.log("Success");
      }
    }


    // 
  
    useEffect(()=>{
      if(localStorage.getItem("auth")){
        navigate('/');
      }
    },[]);

    return (
        <>
            <Menu/>
            <div className="flex box flex2">
                <form method="POST">
                  <div className="form-group flex">
                    <label for="email"><i className="zmdi zmdi-email"></i></label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={email} onChange={(e)=>{
                      setEmail(e.target.value);
                    }}/>
                  </div>
                  <div className="form-group flex">
                    <label for="password"><i className="zmdi zmdi-shield-security"></i></label>
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div className="form-group flex">
                    <input type="submit" className="form-submit" id="signup" value="SignIn" onClick={loginUser}/>
                  </div>
                </form>
                <p>Not Register yet</p>
                <NavLink className="form-submit" to="/Signup">SignUp</NavLink>
              </div>
        </>
    )
}

export default Signin;