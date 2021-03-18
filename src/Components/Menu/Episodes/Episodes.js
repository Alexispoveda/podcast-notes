// React
import React, {useEffect, useState} from 'react';

// CSS
import './Episodes.css';

// Material UI
import {Box, List, ListItem, ListItemIcon, IconButton, ListItemText, ListItemSecondaryAction, Avatar} from '@material-ui/core'
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhite';

//Loading
import Loading from '../../Loading/Loading'

// Database 
import {db} from '../../../Tools/firebase'

const Episodes = props =>{
    
    const [EpisodesState, setEpisodesState] = useState([]);
    const [LoadingState, setLoadingState] = useState(true);
    const [TotalNotesState, setTotalNotesStates] = useState([])

    useEffect(()=>{
        const totalNotes = []

        db.collection('episodios').orderBy('dia','desc').get()
            .then(snapshot=>setEpisodesState(snapshot.docs.map(episodio=>episodio.data())))
            .then(()=>{
                setLoadingState(false)
                db.collection('episodios').orderBy('dia').get()
                    .then(episodesSnapshot=>
                        Promise.all(episodesSnapshot.docs.map(episode=>episode.ref.collection('comentarios').where('publico','==',true).get()))
                            .then(comentariosSnapshot=>{
                                Promise.all(comentariosSnapshot.map(comentarioSnapshot=>
                                    Promise.all(comentarioSnapshot.docs.map(comentario=>comentario.data().autor.get()))
                                        .then(autorSnapshotList=>
                                            [...new Set(autorSnapshotList.map(autorSnapshot=>autorSnapshot.data().nombre))]
                                        )
                                )).then(autors=>setTotalNotesStates(autors))
                            })
                    )
            })
    },[])

    const playOnSpotify = link => {
        window.open(link, '_blank');
    }

    const openNotes = day =>{
        props.history.push('/menu/episodes/'+day);
    }

    if(LoadingState) return <Loading/>

    return(
        <Box className="Episodes">
            <List style={{width:'100%',height:'100%',padding:0}}>
                {
                    EpisodesState.map(episodio=>
                        <ListItem divider style={{backgroundColor:'rgba(245,245,245,.9)'}} key={episodio.dia} onClick={()=>openNotes(episodio.dia)}>
                            <ListItemIcon><IconButton onClick={()=>playOnSpotify(episodio.spotify)}><PlayIcon style={{color:'#00233C'}}/></IconButton></ListItemIcon>
                            <ListItemText primary={'Día '+episodio.dia} secondary={episodio.titulo} style={{color:'#00233C'}}/>
                            <ListItemSecondaryAction>
                                <AvatarGroup max={3} spacing={'small'}>
                                    {TotalNotesState[episodio.dia-1]?.map(autor=><Avatar alt="??" key={autor}>{autor.slice(0,2).toUpperCase()}</Avatar>)}
                                </AvatarGroup>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                }
            </List>
        </Box>
    )}

export default Episodes