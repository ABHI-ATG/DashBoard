import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Menu from './Menu';


const Contact=()=>{

    const navigate=useNavigate();
    const [data,setData]=useState({});
  
    const callContact=async ()=>{
        try{
            const res=await fetch('/contact',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            const data=await res.json();
            setData(data);
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
        }catch(err){
          navigate('/signin');
        }
    }
  
    useEffect(()=>{
        callContact();
        setMessage("");
    },[]);


    const [message,setMessage]=useState("");
    const [result,setResult]=useState("");
    const setHandle=(e)=>{
      const value=e.target.value;
      setMessage(value)
    }

    const ContactForm=async (e)=>{
      e.preventDefault();
      setMessage("");
      const res=await fetch('/contactsubmit',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message
        })
      })
      const data=await res.json();
      if(!data){
        console.log("messege not send");
      }else{
        console.log("messege send");
        setMessage("");
        setResult("Message Send Successfully");
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
                <input type="text" className="form-control" id="name" placeholder="Enter Name" name="name" value={data.name}/>
              </div>
              <div className="form-group flex">
                <label for="email"><i className="zmdi zmdi-email"></i></label>
                <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={data.email}/>
              </div>
              <div className="form-group flex">
                <label for="messege"><i className="zmdi zmdi-collection-text"></i></label>
                <input type="textarea" className="form-control" id="messege" placeholder="Enter your messege" name="messege" value={message} onChange={setHandle}/>
              </div>
              <div className="form-group flex">
                <input type="submit" className="form-submit" id="signup" value="send" onClick={ContactForm}/>
              </div>
            </form>
            <h6>{result}</h6>
          </div>
         </>
    )
}

export default Contact;