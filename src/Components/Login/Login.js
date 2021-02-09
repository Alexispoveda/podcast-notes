// React
import {useState} from 'react'

// CSS
import './Login.css'

// Material UI
import {Box, TextField, Button, Avatar, Snackbar} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';

//Auth
import {auth} from '../../Tools/firebase'

const Login = () =>{

    const [EmailState, setEmailState] = useState("");
    const [PasswordState, setPasswordState] = useState("");
    const [BadLoginState, setBadLoginState] = useState(false);

    const handleEmailChange = event =>{
        setEmailState(event.target.value)
    }
    
    const handlePasswordChange = event =>{
        setPasswordState(event.target.value)
    }

    const handleLoginClick = event => {
        event.preventDefault()

        auth.signInWithEmailAndPassword(EmailState, PasswordState)
            .then(()=>window.location.assign('/menu/episodes'))
            .catch(()=>setBadLoginState(true))
    };

    return(
        <Box className="Login" boxShadow={10}>
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/cjpsmpanama.appspot.com/o/logo512.png?alt=media&token=be2824e3-633e-4cb0-94fe-5baac27126f2"/>
            <h1>Inicio de sesión</h1>
            <form onSubmit={handleLoginClick}>
                <TextField variant="outlined" label="Correo" fullWidth value={EmailState} onChange={handleEmailChange}/>
                <TextField variant="outlined" label="Contraseña" fullWidth value={PasswordState} onChange={handlePasswordChange} type="password"/>
                <Button variant="contained" type="submit">Ingresar</Button>
            </form>
            <Box display="flex" flexDirection="column">
                <a style={{marginTop:'15%'}} onClick={()=>alert('Estamos en eso :)')}>Regístrate</a>
                <a style={{marginTop:'10%'}} onClick={()=>alert('Estamos en eso :)')}>Recuperar contraseña</a>
            </Box>

            {/* Bad login alert */}
            <Snackbar open={BadLoginState} autoHideDuration={6000} onClose={()=>setBadLoginState(false)}>
                <Alert onClose={()=>setBadLoginState(false)} severity="error" variant="standard">
                    Correo o contraseña incorrectos, intente de nuevo
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Login