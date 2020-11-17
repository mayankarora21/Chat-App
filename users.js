users = [];

const addUser = ({id, name, room}) =>{
    name = name.trim();
    room = room.trim();

    const index = users.findIndex((user) => {
        return user.room === room && user.name === name
    })

    if(index !== -1)
    {
        return {error: "Username already exists in this room! Please try another username to join this room"};
    }

    const user = {
        id: id,
        name: name,
        room: room
    }

    users.push(user);

    // console.log("users list is ", users);
    return user;
}

const removeUser = (id) =>{
    const index = users.findIndex((user) => {
        return user.id === id;
    })
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id;
    })
}

const getUsersInRoom = (room) => {
    return users.filter((user) => {
        return user.room === room;
    })
}



module.exports = {addUser, removeUser, getUser, getUsersInRoom};