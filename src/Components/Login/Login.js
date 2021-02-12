// React
import {useState} from 'react';

// CSS
import './Login.css';

// Material UI
import {Box, TextField, Button, Avatar} from '@material-ui/core';

// Auth
import {auth} from '../../Tools/firebase';

// Components
import ChangePassword from './ChangePassword';
import PopUp from './PopUp.js';

const Login = () =>{

    const [EmailState, setEmailState] = useState("");
    const [PasswordState, setPasswordState] = useState("");
    const [BadLoginState, setBadLoginState] = useState(false);
    const [EmailSentState, setEmailSentState] = useState(false);
    const [RecoverPasswordState, setRecoverPasswordState] = useState(false);

    const handleEmailChange = event =>{
        setEmailState(event.target.value);
    }
    
    const handlePasswordChange = event =>{
        setPasswordState(event.target.value);
    }

    const handleLoginClick = event => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(EmailState, PasswordState)
            .then(response=>{
                if(response.user.emailVerified){
                    window.location.assign('/menu/episodes');
                }else{
                    window.location.assign('/verification');
                }
            })
            .catch(()=>setBadLoginState(true));
    };

    const handleDialogClose = () =>{
        setRecoverPasswordState(false);
    }

    const handleSendClick = () =>{
        // auth.sendPasswordResetEmail(EmailState)
        //     .then(()=>{
                setEmailSentState(true);
                setRecoverPasswordState(false);
            // });
    }

    const onMessageClose = () =>{
        setBadLoginState(false);
        setEmailSentState(false);
    }

    return(
        <Box className="Login" boxShadow={10}>
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/bibleinayearnotes.appspot.com/o/logo512.png?alt=media&token=cc9ec0cd-78aa-417e-b1db-20dbaed734d4"/>
            <h1>Inicio de sesión</h1>
            <form onSubmit={handleLoginClick}>
                <TextField variant="outlined" label="Correo" fullWidth value={EmailState} onChange={handleEmailChange} required/>
                <TextField variant="outlined" label="Contraseña" fullWidth value={PasswordState} onChange={handlePasswordChange} type="password" required/>
                <Button variant="contained" type="submit">Ingresar</Button>
            </form>
            <Box display="flex" flexDirection="column">
                <a style={{marginTop:'15%'}} href="/signup">Regístrate</a>
                <a style={{marginTop:'10%'}} href="#" onClick={()=>setRecoverPasswordState(true)}>Recuperar contraseña</a>
            </Box>

            <ChangePassword open={RecoverPasswordState} onClose={handleDialogClose} email={EmailState} onEmailChange={handleEmailChange} send={handleSendClick}/>
            <PopUp open={BadLoginState || EmailSentState} onClose={onMessageClose} severity={BadLoginState ? 'error' : 'success'}/>
        </Box>
    )
}

export default Login