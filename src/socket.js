import {io} from 'socket.io-cliento';

export const initSocket = async()=>{
    const options={
        'force new connection': true,
        reconnectionAttemptes:'Intinity',
        timeout:10000,
        transports: ['websocket'],
    }
    return io(process.env.ReacT_APP_BACKEND_URL,options);
}