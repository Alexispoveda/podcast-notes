// React
import React, {useState} from 'react'

// CSS
import './Menu.css'

// Material UI
import {Box} from '@material-ui/core';

// Routing
import {Switch} from 'react-router-dom'

import PrivateRoute from '../../Tools/PrivateRoute'

// Components
import Episodes from './Episodes/Episodes';
import Notes from './Notes/Notes';
import Profile from './Profile/Profile';
import BottomNav from './BottomNav/BottomNav';

const Menu = props =>{

    const [TabState, setTabState] = useState('/menu/episodes');

    const handleTabChange = (_, tab) =>{
        props.history.push(tab)
        setTabState(tab)
    }

    return(
        <Box className="Menu">
            <Switch>
                <PrivateRoute exact path="/menu/episodes" component={Episodes}/>
                <PrivateRoute exact path="/menu/episodes/:episode" component={Notes}/>
                <PrivateRoute path="/menu/profile" component={Profile}/>
            </Switch>
            <BottomNav tab={TabState} onChange={handleTabChange}/>
        </Box>
    )
}

export default Menu