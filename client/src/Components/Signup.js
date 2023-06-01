import { useState,useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import Menu from './Menu';

const Signup=()=>{
    const navigate=useNavigate();
    const [user,setUser]=useState({
      name:"",email:"",phone:"",work:"",password:"",cpassword:""
    })

    const setHandle=(e)=>{
      const name=e.target.name;
      const value=e.target.value;
      setUser({...user,[name]:value})
    }

    const postData=async (e)=>{
      e.preventDefault();

      const {name,email,phone,work,password,cpassword}=user;

      const res=await fetch('https://dashboard-backend-9q3h.onrender.com/register',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:name,
          email:email,
          phone:phone,
          work:work,
          password:password,
          cpassword:cpassword,
        })
      })

      const data=await res.json();
      console.log(data);
      console.log(data.status);
      if(data.status===422 || !data.status){
        console.log("Failed");
      }else{
        console.log("User Registered Successfully");
        navigate('/signin');
      }
    }

    return (
        <>
          <Menu/>
         <div className="flex box flex2">
            <form method="POST">
              <div className="form-group flex">
                <label for="name">
                    <i className="zmdi zmdi-account"></i>
                </label>
                <input type="text" className="form-control" id="name" placeholder="Enter Name" value={user.name} name="name" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <label for="email"><i className="zmdi zmdi-email"></i></label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" value={user.email} name="email" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <label for="number"><i className="zmdi zmdi-phone"></i></label>
                <input type="number" className="form-control" id="number"  placeholder="Phone Number" value={user.phone} name="phone" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <label for="work"><i class="zmdi zmdi-account-circle"></i></label>
                <input type="text" className="form-control" id="work"  placeholder="Profession" value={user.work} name="work" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <label for="password"><i className="zmdi zmdi-shield-security"></i></label>
                <input type="password" className="form-control" id="password" placeholder="Password" value={user.password} name="password" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <label for="cpassword"><i className="zmdi zmdi-shield-security"></i></label>
                <input type="password" className="form-control" id="cpassword" placeholder="Confirm Password" value={user.cpassword} name="cpassword" onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <input type="submit" className="form-submit" id="signup" value="SignUp" onClick={postData}/>
              </div>
            </form>
            <p>Already Have An Account</p>
            <NavLink className="form-submit" to="/signin">SignIn</NavLink>    
         </div>

        </>
    )
}

export default Signup;