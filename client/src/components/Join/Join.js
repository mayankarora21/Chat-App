import React, {useState} from 'react';


const Join = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const join = () =>{
        if(name && room && name.length && room.length)
        {
            props.history.push(`/chat/${name}/${room}`);
        }
        else{
            window.alert('user name or room can not be empty!');
        }
    }
    return(
        <div className = "joinBackground whiteColor">
            <div className = "centered box">
                <h1 className = "noMargin">Join</h1>
                <br></br>
                <br></br>
                <input value = {name} className = "input" type = "text" onChange = { (e) => { setName(e.target.value) }} placeholder = "Enter Name"></input>
                <br></br>
                <br></br>
                <input value = {room} className = "input" type = "text" onChange = { (e) => { setRoom(e.target.value) }} placeholder = "Enter Room"></input>
                <br></br>
                <br></br>
                <button className = "btn btn-danger" onClick = {join}>Join</button>
            </div>
        </div>
    );
}

export default Join;