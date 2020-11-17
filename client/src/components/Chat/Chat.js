import React,{useState, useEffect} from 'react';
import io from 'socket.io-client';
import Message from '../Message/Message';
import Scroll from '../Scroll/Scroll';
import {Link} from 'react-router-dom'; 
import copy from 'copy-to-clipboard';

import './Chat.css';

let socket;

const Chat = (props) => {
    const {name, room} = props.match.params;
    // const ENDPOINT = 'http://localhost:5000';
    const ENDPOINT = 'https://chatapp-59-63.herokuapp.com/';

    // console.log("name is", name, "room is", room);
    // console.log("Endpoint is", ENDPOINT);

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    // list
    const [users, setUsers] = useState([]);
    //

    useEffect(() => {
        socket = io(ENDPOINT)
        // console.log("socket is ", socket)

        // socket.emit('join', {name:name, room: room}, (data) => {
        //     alert(data);
        // })
        socket.emit('join', {name:name, room: room}, (data) => {
            if(data && data.error)
            {
                window.alert(data.error);
                props.history.push('/');
            }
        })
        
        
        return () => {
            socket.disconnect();
            socket.off();
        }
    }, [name, room]);
    
    useEffect(() => {
        socket.on('message', (newMessage) => {
            console.log("new message from server is ", newMessage)
            setMessages((messages) => {
                return [...messages, newMessage]
            });
        })
    }, []);


    useEffect(() => {
        socket.on('userList', ({userList}) => {
            // console.log("new User list received is", userList);
            setUsers(userList);
        })
    }, []);

    // // console.log("users are", users);



    console.log("messages array is", messages);
    

    const sendMessage = (e) =>{
        e.preventDefault();
        if(message)
        {
            socket.emit('sendMessage', message, () => {});
            setMessage('');
        }
    }
    

    return(
        <div className = "joinBackground whiteColor">
            <div className = "centered whiteBorder">
            <div className = "container" style = {{padding: '1%'}}>
                <div className = "row">
                    <div className = "col-12 col-sm-4 mt-1 mb-1">
                        <button type="button" className="btn btn-primary" onClick = {() => { copy(room); window.alert('room name copied to clipboard') }}>
                            {room}
                        </button>
                    </div>
                    <div className = "col-6 col-sm-4 mt-1 mb-1">
                        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                            Users <span className="badge badge-light">{users.length}</span>
                        </button>
                    </div>
                    <div className = "col-6 col-sm-4 mt-1 mb-1">
                    <Link to = "/">
                        <button className = "btn btn-danger">Leave</button>
                    </Link>
                    </div>
                </div>
            </div>
                {/* <h1 className = "noMargin">Chat</h1>
                <br></br>
                <br></br> */}
                <Scroll>
                    <br></br>
                    {messages.map((m, i) => {
                        return <Message key = {i} message = {m} name = {name}></Message>
                    })}
                    <br></br>
                </Scroll>
                <form onSubmit = { (e) => {sendMessage(e)} } className = "form">
                    <input value = {message} onChange = {(e) => { setMessage(e.target.value) }} onKeyPress = {(e) => {
                        if(e.key === 'Enter')
                        {
                            sendMessage(e);
                        }
                    }} className = "input" placeholder = "Type a message..."></input>
                    <button type = "submit" className = "sendButton">
                    <svg width="40%" height="50%" viewBox="0 0 16 16" className="bi bi-arrow-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-11.5.5a.5.5 0 0 1 0-1h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5z"/>
                    </svg>

                    </button>
                </form>
            </div>
            <br></br>

            {/* modal */}
            <div className="modal fade blackColor" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Currenlty Online</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body text-left">
                    <ol>
                    {
                        users.map((u, i) => {
                            if(u.name === name)
                            {
                                return <li key = {i}><b><u>{u.name}</u></b></li>
                            }
                            else return <li key = {i}>{u.name}</li>
                        })
                    }
                </ol>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default Chat;