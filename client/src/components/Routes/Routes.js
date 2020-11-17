import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Chat from '../Chat/Chat';
import Join from '../Join/Join';

const Routes = () => {
    return(
        <Switch>
            <Route path = "/chat/:name/:room" exact component = {Chat}></Route>
            <Route path = "/" exact component = {Join}></Route>
        </Switch>
    );
}

export default Routes;