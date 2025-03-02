import React, { useEffect, useRef, useState } from 'react'
import Client from './../components/Client';
import Editor from './../components/Editor';
import { initSocket } from './../socket';
import Actions from '../Actions';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditorPage = () => {

  const [client,setclient]=useState([])

  const socketref=useRef(null);
  const location=useLocation();
  const {roomId}=useParams();
  const reactNavigator=useNavigate();
  useEffect(()=>{
    const init=async()=>{
      socketref.current=await initSocket();

      function handleErrors(err) {
        console.log(err);
        toast.error("Error connecting try again later");
        reactNavigator('/');
      }

      socketref.current.on('connect_err',(err)=>handleErrors(err));
      socketref.current.on('connect_failed',(err)=>handleErrors(err));

      socketref.current.emit(Actions.JOIN,{
        roomId,
        username:location.state?.username,
      });

      //listings for joined events

      socketref.current.on(Actions.JOINED,({clients,username,socketId})=>{
        if(username!==location.state?.username){
          toast.success(`${username} joined the Editor`);
          console.log(`${username} joined`);
        }
        setclient(clients);
      })

    }
    init();
  },[]);

  if(!location.state){
    <Navigate to="/"/>
  }

  return (
   <div className='main-wrap'>
    <div className="aside">
      <div className="aside-inner">
        <div className="logo">
          <img className='logo-img' src="/" alt="#" />
        </div>
        <h3>Connected</h3>
        <div className="clients-list">
          {
            client.map((client)=>{
              return(
              <Client key={client.socketId} username={client.username}/>
            )})
          }
        </div>
      </div>
    <button className='btn copy-btn'>Copy Room ID</button>
    <button className='btn leave-btn'>Leave</button>
    </div>

    <div className="editor-wrap">
      <Editor/>
    </div>
   </div> 
  )
}

export default EditorPage