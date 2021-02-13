// React
import React, {useEffect, useState, useContext} from 'react';

// User Context
import {UserContext} from '../../../Tools/UserContext';

// CSS
import './Profile.css';

// Material UI
import {Box, Avatar, TextField, InputAdornment, Button, Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AccountIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';

// Firebase 
import {db} from '../../../Tools/firebase';

const Profile = () =>{

    const {currentUser} = useContext(UserContext);

    const [UsernameState, setUsernameState] = useState('');
    const [EmailState, setEmailState] = useState('');
    const [PopUpState, setPopUpState] = useState(false);

    useEffect(()=>{
        db.collection('usuarios').doc(currentUser.user.uid).get()
            .then(response=>{
                setUsernameState(response.data().nombre)
                setEmailState(currentUser.user.email)
            })
    }
    ,[])

    const accountAdornment = <InputAdornment position="start"><AccountIcon style={{color: '#00233C'}}/></InputAdornment>;
    const emailAdornment = <InputAdornment position="start"><EmailIcon style={{color: '#00233C'}}/></InputAdornment>;

    const avatarStyle = {
        width: window.innerWidth > window.innerHeight ? '35vh' : '75vw',
        height: window.innerWidth > window.innerHeight ? '35vh' : '75vw',
        marginTop: '5%',
        backgroundColor: "#00233C",
        color:'rgba(245,245,245, .8)'
    }

    const handleUsernameChange = event => {
        setUsernameState(event.target.value)
    }

    const handleSendClick = () =>{
        db.collection('usuarios').doc(currentUser.user.uid).update({
            nombre: UsernameState
        }).then(()=>setPopUpState(true));
    }

    return(
        <Box className="Profile">
            <Avatar style={avatarStyle}/>
            <Box display="flex" justifyContent="space-evenly" flexDirection="column" height="100%" alignItems="center" width="95%">
                <TextField value={UsernameState} onChange={handleUsernameChange} variant="filled" label="Nombre" InputProps={{startAdornment:accountAdornment}} style={{backgroundColor:'rgba(245,245,245,.9)'}} fullWidth/>
                <TextField value={EmailState} disabled variant="filled" label="Correo" InputProps={{startAdornment:emailAdornment}} style={{backgroundColor:'rgba(245,245,245,.9)'}} fullWidth/>
                <Button variant="contained" style={{width:'fit-content', backgroundColor:'#00233C', color:'whitesmoke'}} onClick={handleSendClick}>Enviar</Button>
            </Box>

            <Snackbar open={PopUpState} autoHideDuration={6000} onClose={()=>setPopUpState(false)}>
                <Alert onClose={()=>setPopUpState(false)} severity="success" variant="standard">
                    Información actualizada
                </Alert>
            </Snackbar>
        </Box>  
    )}

export default Profile