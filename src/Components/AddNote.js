
import React, { useContext, useState} from 'react'
import noteContext from '../Context/notesContext'

export const AddNote = (props) => {
    const context = useContext(noteContext);
    const  {addnote}= context;

    const [addNote, setAddNote] = useState({description:"",title:""})

    const OnChange=(e)=>{
        
        setAddNote({...addNote,[e.target.name]:e.target.value})
       
    }

    const onClickSave=(e)=>{
      
       
        addnote(addNote.title,addNote.description)
        setAddNote({description:"",title:""})
        props.ShowAlert("success","Note Saved");
    }
    return (
        <div>
            <div className='container my-3'>
            <h1>Create a Note</h1>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name='title' value={addNote.title} onChange={OnChange} placeholder="Title" required />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Your Note</label>
                <textarea className="form-control" type="text" id="description" name='description' value={addNote.description}   placeholder="Description" onChange={OnChange} rows="3" style={{resize:"none"}} required/>
            </div>
            <div className='mb-3'>
            <button type="button" disabled={addNote.title.length<3 || addNote.description.length<3} className="btn btn-primary" onClick={onClickSave}>Save</button>
            
            </div>
            </div>
        </div>
    )
}
