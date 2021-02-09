// Material UI
import {Box, BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';
import MenuBookTwoToneIcon from '@material-ui/icons/MenuBookTwoTone';

import './BottomNav.css'

const BottomNav = props =>

    <Box className="BottomNav">
        <BottomNavigation value={props.tab} onChange={props.onChange} >
            <BottomNavigationAction label="Cuenta" value="/menu/profile" icon={<AccountCircleTwoToneIcon />} />
            <BottomNavigationAction label="Episodios" value="/menu/episodes" icon={<MenuBookTwoToneIcon />} />
        </BottomNavigation>
    </Box>

export default BottomNav    