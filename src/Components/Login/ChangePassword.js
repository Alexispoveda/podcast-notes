//React
import React from 'react';

//Material UI
import {Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';

const ChangePassword = props => {

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Restablecer Contraseña</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Para restablecer tu contraseña, por favor ingresa tu correo en este campo y presiona enviar. En breve te enviaremos un correo para restablecer tu contraseña.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Correo Electrónico"
                    type="email"
                    fullWidth
                    value={props.email}
                    onChange={props.onEmailChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={props.send} color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ChangePassword