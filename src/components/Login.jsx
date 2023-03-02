import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [loginData , setLoginData] =useState({
    username:"",
    password:""
  });

  const handlChange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setLoginData((prev)=>(
      {...prev , [name]:value}
    ))
  }

  function handelSbmite(){

    axios.post("http://localhost/project_atlass/Login_admin.php",loginData).then((res)=>{
      // console.log(typeof res.data.idControler)
      if(res.data.whoLogged === "admin"){
        navigate("/admin")
      }else if(res.data.whoLogged === "controler"){
        navigate(`/worker/#${res.data.idControler}`)
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className=" flex  justify-center items-center h-screen text-white p-4">
      <div className=" space-y-8 ">
        <div>
          <h1 className=" text-center font-extrabold font-mono text-3xl">
            Login
          </h1>
        </div>
        <div  className="space-y-4">
          <div>
            <label htmlFor="username" className=" text-lg font-mono ">
              Username :
            </label>
            <input
              onChange={(e)=>handlChange(e)}
              type="text"
              id="username"
              name="username"
              className="bg-[#4B484C] w-full h-10 rounded-md pl-2 focus:outline-none"
              autoComplete="off"
            />
          </div>
          <div>
            <label htmlFor="password" className=" text-lg font-mono ">
              Password :
            </label>
            <input
              onChange={(e)=>handlChange(e)}
              type="password"
              id="password"
              name="password"
              className="bg-[#4B484C] w-full h-10 rounded-md pl-2 focus:outline-none"
            />
          </div>
          <div className="float-right">
            <button onClick={handelSbmite} 
              className="bg-[#93FBA4] hover:bg-[#62ef7a] text-black py-2 px-8 rounded-md text-base font-medium transition duration-300">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
