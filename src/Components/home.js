import { Notes } from './notes'

import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../Context/notesContext'
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
    const ref = useRef(null);
    const context = useContext(noteContext);
    //eslint-disable-next-line
    const { note, getAllNotes,editNotes } = context;
    let navigate =useNavigate();

    useEffect(() => {
       
        if(localStorage.getItem('auth-token')){
            
            getAllNotes();
        }
        else{
            navigate('/Login')
        }
        //eslint-disable-next-line
    }, [])

    const [currentNote, setcurrentNote] = useState({ id:"",title: "", description: "" })
    const UpdateNote = (cnote) => {
        ref.current.click();
        setcurrentNote({id:cnote._id, title: cnote.title, description: cnote.description })
    }

    const OnChange=(e)=>{
        
        setcurrentNote({...currentNote,[e.target.name]:e.target.value})
       
    }

    const {ShowAlert}= props;

    const OnEditNoteSave=(enote)=>{
        editNotes(enote);
        ref.current.click();
        props.ShowAlert("success","Note Updated Successfully");
    }

    return (
        <div className='container my-3'>
            {/* <!-- Button trigger modal --> */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name='title' value={currentNote.title} onChange={OnChange} placeholder="Title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Your Note</label>
                                <input className="form-control" type="text" id="description" name='description' value={currentNote.description} onChange={OnChange} placeholder="Description"  />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={currentNote.title.length<3 || currentNote.description.length<3} className="btn btn-primary"  onClick={()=>{OnEditNoteSave(currentNote)}} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote ShowAlert={ShowAlert} />
            <div className='row'>
                <h3>Your Notes</h3>
                {note.map((note) => {
                    return <Notes item key={note._id} note={note} UpdateNote={UpdateNote} ShowAlert={ShowAlert} />
                })}
            </div>
        </div>

    )
}

export default Home;