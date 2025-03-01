import React, { useEffect, useRef, useState } from 'react'
import Client from './../components/Client';
import Editor from './../components/Editor';
import { initSocket } from './../socket';
import Actions from '../Actions';

const EditorPage = () => {

  const socketref=useRef(null);
  useEffect(()=>{
    const init=async()=>{
      socketref.current=await initSocket();
      socketref.current.emit(Actions.JOIN,{
        roomId,
        usermane:
      });
    }
    init();
  },[]);

  const [client,setclient]=useState([
    {socketId:1, username:"kittu"},
    {socketId:2, username:"ram"}
  ])

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