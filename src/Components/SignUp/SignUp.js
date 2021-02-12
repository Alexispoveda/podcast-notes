// React
import {useState} from 'react';

// React router
import { useHistory } from 'react-router-dom';

// CSS
import './SignUp.css';

// Material UI
import {Box, TextField, Button, Avatar, Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

// Firebase
import {auth, db} from '../../Tools/firebase';

const SignUp = () =>{

    const history = useHistory();

    const [EmailState, setEmailState] = useState("");
    const [PasswordState, setPasswordState] = useState("");
    const [ConfirmPasswordState, setConfirmPasswordState] = useState("");
    const [NameState, setNameState] = useState("");
    const [BadSignUpState, setBadSignUpState] = useState(false);
    const [PasswordErrorState, setPasswordErrorState] = useState(false);
    const [LoadingState, setLoadingState] = useState(false);

    const handleEmailChange = event =>{
        setEmailState(event.target.value);
    }

    const handleNameChange = event =>{
        setNameState(event.target.value);
    }
    
    const handlePasswordChange = event =>{
        setPasswordState(event.target.value);
    }

    const handleConfirmPasswordChange = event =>{
        if(PasswordErrorState){
            setPasswordErrorState(false);
        }
        setConfirmPasswordState(event.target.value);
    }

    const handleSignUpClick = event => {

        event.preventDefault();
        setLoadingState(true);

        if(PasswordState !== ConfirmPasswordState){
            setPasswordErrorState(true);
            setLoadingState(false);
        }
        else{ 
            auth.createUserWithEmailAndPassword(EmailState, PasswordState)
                .then(response=>{
                    db.collection('usuarios').doc(response.user.uid).set({
                        nombre: NameState
                    })
                        .then(()=>{
                            auth.currentUser.sendEmailVerification()
                                .then(()=>{
                                    history.replace('/signed');
                                });
                        });
                })
                    .catch(error=>{
                        switch (error.code) {
                            case 'auth/invalid-email':
                                setBadSignUpState({
                                    error: true,
                                    message: 'Introduzca un correo electrónico válido'
                                });
                                break;
                            case 'auth/weak-password':
                                setBadSignUpState({
                                    error: true,
                                    message: 'La contraseña debe tener mínimo 6 caracteres'
                                });
                                break;
                            case 'auth/email-already-in-use':
                                setBadSignUpState({
                                    error: true,
                                    message: 'Este correo ya esta registrado con otra cuenta'
                                });
                                break;
                        
                            default:
                                break;
                        }

                        setLoadingState(false);
                    })
        }
    };

    const onAlertClose = () =>{
        if(BadSignUpState.message === "Este correo ya esta registrado con otra cuenta"){
            history.replace('/acceder');
        }
        setBadSignUpState(false);
    }

    return(
        <Box className="SignUp" boxShadow={10}>
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/bibleinayearnotes.appspot.com/o/logo512.png?alt=media&token=cc9ec0cd-78aa-417e-b1db-20dbaed734d4"/>
            <h1>Registro</h1>
            <form onSubmit={handleSignUpClick}>
                <TextField variant="outlined" label="Nombre" fullWidth value={NameState} onChange={handleNameChange} required/>
                <TextField variant="outlined" label="Correo" fullWidth value={EmailState} onChange={handleEmailChange} required/>
                <TextField variant="outlined" label="Contraseña" fullWidth value={PasswordState} onChange={handlePasswordChange} type="password" required/>
                <TextField variant="outlined" label="Repite la contraseña" fullWidth value={ConfirmPasswordState} onChange={handleConfirmPasswordChange} type="password" helperText={!PasswordErrorState ? null :"Las contraseñas no coinciden"} error={PasswordErrorState} required/>
                <Button disabled={LoadingState} variant="contained" type="submit">Registrar</Button>
            </form>

            {/* Bad signup alert */}
            <Snackbar open={BadSignUpState.error} autoHideDuration={10000} onClose={()=>onAlertClose()}>
                <Alert onClose={()=>onAlertClose()} severity="error" variant="standard">
                    {BadSignUpState.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default SignUp
