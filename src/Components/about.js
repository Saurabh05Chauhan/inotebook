import React, { useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/notesContext'

const About=()=> {
     // eslint-disable-next-line 
     let navigate=useNavigate();
    const context = useContext(noteContext);
    useEffect(() => {
        if(!localStorage.getItem('auth-token')){
            navigate('/Login')
        }
    }, [])
    
    return (
        <div>
            this is about {context.name}
        </div>
    )
}

export default About;