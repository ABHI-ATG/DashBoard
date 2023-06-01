import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Menu from './Menu';


const About=()=>{
    const navigate=useNavigate();
    const [data,setData]=useState({});

    const callAbout=async ()=>{
        try{
            const res=await fetch('https://dashboard-backend-9q3h.onrender.com/about',{
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
        callAbout();
    },[]);

    return (
        <>
            <Menu/>
            <div className="flex box">
                <div className="user_photo flex contain">
                    <img src="user.png" alt="User"></img>
                </div>
                <div className="flex flex2 contain">
                    <div className="flex change">
                        <i className="zmdi zmdi-edit"></i>
                    </div>
                    <div>
                        <div className="flex line">
                            <h6>User Id</h6>
                            <p>{data._id}</p>
                        </div>
                        <div className="flex line">
                            <h6>Name</h6>
                            <p>{data.name}</p>
                        </div>
                        <div className="flex line">
                            <h6>Email</h6>
                            <p>{data.email}</p>
                        </div>
                        <div className="flex line">
                            <h6>Phone Number</h6>
                            <p>{data.phone}</p>
                        </div>
                        <div className="flex line">
                            <h6>Work</h6>
                            <p>{data.work}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default About;