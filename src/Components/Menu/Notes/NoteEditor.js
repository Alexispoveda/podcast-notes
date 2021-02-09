// Material UI
import {Dialog, Box, TextField, FormControlLabel, Checkbox, Button} from '@material-ui/core';

const NoteEditor = props =>
    <Dialog open={props.open} onClose={props.onClose}>
        <Box display="flex" justifyContent="space-between" alignItems="center" flexDirection="column" margin="10% 15%">
            <h1 variant="h6" style={{margin:"2% 5% 5%"}}>{props.new ? 'Nuevo comentario' : 'Editar comentario'}</h1>
            <TextField label="Comentario" multiline value={props.comentario} onChange={props.onComentarioChange} style={{marginBottom:"15%"}}/>
            <FormControlLabel control={<Checkbox checked={props.publico} onChange={props.onPublicoChange}/>} label="Publico"/>
            <Button disabled={props.loading} variant="outlined" style={{margin:"5% 0 2%"}} onClick={props.send}>Enviar</Button>
        </Box>
    </Dialog>

export default NoteEditor