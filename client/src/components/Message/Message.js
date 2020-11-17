import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({message, name}) => {
    // return ( 
    //     <div className = {`${direction}Message`}>
    //         User: {message.user}
    //         <br></br>
    //         Message: {message.message}
    //         <br></br>
    //     </div>
    // );

    let isSentByCurrentUser = false;

  const trimmedName = name.trim();

  if(message.user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10 noMargin">{trimmedName}</p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite noMargin text-left">{ReactEmoji.emojify(message.message)}</p>
          </div>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark noMargin text-left">{ReactEmoji.emojify(message.message)}</p>
            </div>
            <p className="sentText pl-10 noMargin">{message.user}</p>
          </div>
        )
  );
}

export default Message;