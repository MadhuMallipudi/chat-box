import React ,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;
const Chat = () => {
    const [ name ,setName ] = useState("");
    const [ room ,setRoom ] = useState("");
    const ENDPOINT = "localhost:5000"
    useEffect (() => {
        const { name,room } = queryString.parse(window.location.search);
        setName(name); // set the name which is coming from url
        setRoom(room); // set the room which is coming from url
        
        socket = io(ENDPOINT);
        
        socket.emit('join',{name,room},({})=>{
            
        }); // emitting  

        return () => {
            socket.emit('disconnet');
            socket.off();
        }
    }, [ ENDPOINT,'location.search' ] );
    return (
        <h1>chat component</h1>
    )
}

export default Chat;

//49:00