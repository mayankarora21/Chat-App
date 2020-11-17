import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Scroll = ({children}) => {
    return(
        <ScrollToBottom className = "scroll chatBackground" followButtonClassName = "whiteBackground" style = {{borderTop: '2px solid white', borderBottom: '2px solid white'}}>
            {children}
        </ScrollToBottom>
    );
}

export default Scroll;