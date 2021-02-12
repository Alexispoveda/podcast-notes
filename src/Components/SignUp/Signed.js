// CSS
import './SignUp.css';

// Material UI
import {Box, Button, Avatar } from '@material-ui/core';

// Routing
import {useHistory} from 'react-router-dom';

const Signed = () =>{

    const history = useHistory();

    const handleLoginClick = () => {
        history.replace('/acceder');
    };

    return(
        <Box className="Signed" boxShadow={10}>
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/bibleinayearnotes.appspot.com/o/logo512.png?alt=media&token=cc9ec0cd-78aa-417e-b1db-20dbaed734d4"/>
            <h1>¡Listo!</h1>
            <h4>Te enviamos un correo a tu cuenta de correo electrónico para que puedas validarlo</h4>
            <h4>Cuando hayas verificado tu correo puedes iniciar sesión con el botón de aquí abajo</h4>
            <Button variant="contained" onClick={handleLoginClick}>Ir</Button>
        </Box>
    )
}

export default Signed