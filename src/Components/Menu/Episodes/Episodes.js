// React
import React, {useEffect, useState} from 'react';

// CSS
import './Episodes.css';

// Material UI
import {Box, List, ListItem, ListItemIcon, IconButton, ListItemText} from '@material-ui/core'
import PlayIcon from '@material-ui/icons/PlayCircleFilledWhite';

//Loading
import Loading from '../../Loading/Loading'

// Database 
import {db} from '../../../Tools/firebase'

const Episodes = props =>{
    
    const [EpisodesState, setEpisodesState] = useState([]);
    const [LoadingState, setLoadingState] = useState(true);

    useEffect(()=>{

        db.collection('episodios').orderBy('dia','desc').get()
            .then(snapshot=>setEpisodesState(snapshot.docs.map(episodio=>episodio.data())))
            .then(()=>setLoadingState(false));
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
                        </ListItem>
                    )
                }
            </List>
        </Box>
    )}

export default Episodes