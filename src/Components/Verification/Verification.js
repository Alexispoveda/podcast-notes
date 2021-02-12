// Routing
import {useHistory} from 'react-router-dom';

// CSS
import './Verification.css';

// Material UI
import {Box, Button, Avatar, } from '@material-ui/core';

//Auth
import {auth} from '../../Tools/firebase';

const Verification = () =>{

    const history = useHistory();

    const handleVerificationClick = () => {
        auth.currentUser.sendEmailVerification()
            .then(()=>history.replace('/acceder'));
    };

    return(
        <Box className="Verification" boxShadow={10}>
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/bibleinayearnotes.appspot.com/o/logo512.png?alt=media&token=cc9ec0cd-78aa-417e-b1db-20dbaed734d4"/>
            <h1>Verificación</h1>
            <h4>Parece que no verificaste tu cuenta 🤭</h4>
            <h4>Si no ves el correo en la bandeja de entrada de tu correo, podemos enviarte uno si presionas el botón de aquí abajo 📨</h4>
            <Button variant="contained" onClick={handleVerificationClick}>Enviar</Button>
            <h4>Si crees que esto se trata de un error no dudes en contactarnos 😄</h4>
            <Button variant="contained" onClick={()=>history.replace('/acceder')}>Regresar</Button>
        </Box>
    )
}

export default Verification