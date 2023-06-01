import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const navigate=useNavigate();
    const callLogOut=async()=>{
        try{
            const res=await fetch('https://dashboard-backend-9q3h.onrender.com/logout',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                    'Access-Control-Allow-Origin': '*'
                },
                credentials:"include"
            })
            if(res.status===200){
                localStorage.clear();
                navigate('/signin');
            }else{  
                console.log("Error");
                throw new Error("Logout Failed")
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        callLogOut();
    },[]);

    return (
        <>
            This is logout
        </>
    )
}

export default Logout;