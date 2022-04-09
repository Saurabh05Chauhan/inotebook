import React, { useContext } from 'react'
import noteContext from '../Context/notesContext'



export const Notes=(props)=> {

    const context = useContext(noteContext);
    const  {deleteNote}= context;
    const{note,UpdateNote}=props
    return (
        <div className='col-md-3'>
            <div className="card text-dark bg-light mb-4" style={{maxWidth: "18rem"}}>
                <div className="card-header"><h5>{note.title}</h5>
                <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.ShowAlert("success","Note Deleted") }}></i>
                <i className="far fa-edit mx-2" onClick={()=>{UpdateNote(note)}}></i> </div>
                <div className="card-body mb-4"> 
                    <p className="card-text">{note.description} </p>   
                </div>
            </div>
            
        </div>
    )
}
