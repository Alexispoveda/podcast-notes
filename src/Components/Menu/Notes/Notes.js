// React
import {useEffect, useState, useContext} from 'react';

//Context
import {UserContext} from '../../../Tools/UserContext';

// CSS
import './Notes.css'

// Material UI
import {Box, List, ListSubheader, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Fab} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import LockIcon from '@material-ui/icons/Lock';

// Loading
import Loading from '../../Loading/Loading'

// Database 
import {db} from '../../../Tools/firebase'
import NoteEditor from './NoteEditor';

const Notes = props => {

    const [NotesState, setNotesState] = useState([]);
    const [LoadingState, setLoadingState] = useState(true);
    const [EditorState, setEditorState] = useState({new:true,open:false,loading:false});
    const [SelectedComentarioState, setSelectedComentarioState] = useState({comentario:'',publico:true});

    const {currentUser} = useContext(UserContext);

    useEffect(()=>{
        const episodiosCollection = db.collection('episodios').where('dia','==',~~props.match.params.episode);

        episodiosCollection.get()
            .then(episodio=>{
                const userReference = db.collection('usuarios').doc(currentUser.user.uid);
                const notesReference = db.collection('episodios').doc(episodio.docs[0].id).collection('comentarios');

                const publicNotes = notesReference.where('publico','==',true);
                const privateNotes = notesReference.where('publico','==',false).where('autor','==',userReference);

                notesReference.onSnapshot(()=>{
                    let comentarios = []
                    publicNotes.get()
                        .then(noteSnapshot=>{
                            Promise.all(
                                noteSnapshot.docs.map(note=>
                                    note.data().autor.get()
                                        .then(autorSnapshot=>({
                                            autor: autorSnapshot.data().nombre,
                                            autorUID:autorSnapshot.id,
                                            comentario: note.data().comentario,
                                            publico: true,
                                            id: note.id
                                        }))
                                )
                            )
                                .then(comentariosPublicos=>{
                                    comentarios = comentarios.concat(comentariosPublicos);
                                    privateNotes.get()
                                        .then(noteSnapshot=>{
                                            Promise.all(
                                                noteSnapshot.docs.map(note=>
                                                    note.data().autor.get()
                                                        .then(autorSnapshot=>({
                                                            autor: autorSnapshot.data().nombre,
                                                            autorUID: autorSnapshot.id,
                                                            comentario: note.data().comentario,
                                                            publico: false,
                                                            id: note.id
                                                        }))
                                                )
                                            )
                                                .then(comentariosPrivados=>{
                                                    setNotesState(comentarios.concat(comentariosPrivados));
                                                    setLoadingState(false);
                                                })
                                        });
                                })
                        });
                })
            })
    },[])

    const openEditor = (action, comentario) =>{
        if(action==='edit'){
            setSelectedComentarioState(comentario);
            setEditorState({new:false,open:true,loading:false});
        }
        else{
            setSelectedComentarioState({comentario:'',publico:true});
            setEditorState({new:true,open:true,loading:false});
        }
    }

    const handleComentarioChange = event =>{
        setSelectedComentarioState({
            ...SelectedComentarioState,
            comentario: event.target.value
        });
    }

    const handlePublicoChange = event =>{
        setSelectedComentarioState({
            ...SelectedComentarioState,
            publico: event.target.checked
        });
    }

    const sendNote = () =>{

        const episodiosCollection = db.collection('episodios').where('dia','==',~~props.match.params.episode);

        episodiosCollection.get()
            .then(episodio=>{
                const userReference = db.collection('usuarios').doc(currentUser.user.uid);
                const notesReference = db.collection('episodios').doc(episodio.docs[0].id).collection('comentarios');

                if(EditorState.new){
                    setEditorState({new:true,open:true,loading:true});
                    notesReference.add({
                        autor: userReference,
                        comentario: SelectedComentarioState.comentario,
                        publico: SelectedComentarioState.publico
                    }).then(()=>{
                        setSelectedComentarioState({comentario:'',publico:true});
                        setEditorState({new:true,open:false,loading:false});
                    });
                }
                else{
                    setEditorState({new:false,open:true,loading:true});
                    notesReference.doc(SelectedComentarioState.id).update({
                        comentario: SelectedComentarioState.comentario,
                        publico: SelectedComentarioState.publico
                    }).then(()=>{
                        setSelectedComentarioState({comentario:'',publico:true});
                        setEditorState({new:false,open:false,loading:false});
                    });
                }
            })
    }

    if(LoadingState) return <Loading/>

    return(
        <Box className="Notes">
            <List style={{width:'100%',height:'100%',padding:0,backgroundColor:'whitesmoke'}}>
            <ListSubheader style={{backgroundColor:'white'}}>{'Comentarios del día '+props.match.params.episode}</ListSubheader>
                {
                    NotesState.map(comentario=>
                        <ListItem divider key={comentario.id}>
                            <ListItemAvatar><Avatar>{comentario.publico ? comentario.autor.slice(0,2).toUpperCase() : <LockIcon/>}</Avatar></ListItemAvatar>
                            <ListItemText primary={comentario.comentario} secondary={comentario.autor}/>
                            {comentario.autorUID === currentUser.user.uid ? <ListItemSecondaryAction onClick={()=>openEditor('edit',comentario)}><IconButton><EditIcon/></IconButton></ListItemSecondaryAction> : null}
                        </ListItem>
                    )
                }
            </List>

            <Fab onClick={()=>openEditor('add')} style={{margin: 0,top: 'auto',right: 30,bottom: 90,left: 'auto',position: 'fixed',zIndex:2, backgroundColor:'#03989E', color:'whitesmoke'}}>
                <AddIcon />
            </Fab>

            <NoteEditor 
                open={EditorState.open} 
                onClose={()=>setEditorState({new:EditorState.new,open:false,loading:false})} 
                new={EditorState.new} 
                comentario={SelectedComentarioState.comentario}
                onComentarioChange={handleComentarioChange}
                publico={SelectedComentarioState.publico}
                onPublicoChange={handlePublicoChange}
                send={sendNote}
                loading={EditorState.loading}
            />
        </Box>
    )
}

export default Notes
