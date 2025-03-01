import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import '../App.css'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const [roomId,setRoomId]=useState('');
  const [username,setusername]=useState('');

  const CreateNewRoom=(e)=>{
    e.preventDefault();
    const id=uuidv4()
    setRoomId(id);
    toast.success("Created a new room");
  }

  const joinroom = ()=>{
    if(!roomId || !username) {
      toast.error("Room ID and username is required");
      return;
    }

    navigate(`/editor/${roomId}`, { state:{
      username,
    } })
  }

  const inputenter=(e)=>{
    if(e.code==='Enter'){
      joinroom();}
  }

  return (
    <div className='home-page-wrapper'>
      <div className='form-wrapper'>
          <img className='home-page-logo' src="/code-sync.png" alt="#" />
          <h4 className='main-label'>Paste the Room ID</h4>
          <div className='input-grp' >
            <input className='inputbox' type="text" placeholder='Room ID' value={roomId} onChange={(e)=>{setRoomId(e.target.value)}} onKeyUp={inputenter}/>
            <input className='inputbox' type="text" placeholder='User Name' value={username} onChange={(e)=>{setusername(e.target.value)}} onKeyUp={inputenter}/>
            <button className='btn join' onClick={joinroom}>Join</button>
            <span className='create-info'>
              If you don't have an invite Create &nbsp;
              <a onClick={CreateNewRoom} href="/" className='create-new-btn'>New Room</a>
            </span>
          </div>
      </div>

      <footer>
        <h4>Built with 🚀 by <a href="https://github.com/kritvikjubli">Kritvik Jubli</a></h4>
      </footer>
    </div>
  )
}
export default Home