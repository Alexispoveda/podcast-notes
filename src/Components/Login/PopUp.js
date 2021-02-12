// Material UI
import {Snackbar} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const PopUp = props =>
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}>
        <Alert onClose={props.onClose} severity={props.severity} variant="standard">
            {props.severity ==="error" ? 
                'Correo o contraseña incorrectos, intente de nuevo'
                : 'Mensaje para restablecer contraseña enviado'
            }
        </Alert>
    </Snackbar>

export default PopUp