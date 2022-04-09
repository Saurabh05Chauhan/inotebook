import NoteContext from "./notesContext";
import { useState } from "react";

const NoteState=(props)=>{
  const host="http://localhost:5000";
   const notesInitial=[]

    const [note, setNote] = useState(notesInitial)


    // to get all notes of a user
    const getAllNotes= async () =>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`, 
        {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('auth-token')
          
        },
        //body: JSON.stringify(title,description) // body data type must match "Content-Type" header
      });

      const json= await response.json();
     // console.log(json.notes);
     // eslint-disable-next-line
      setNote(json.notes);
    }


    //add note
    const addnote= async (title,description)=>{
      debugger
      const response = await fetch(`${host}/api/notes/CreateNotes`, 
        {
          
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('auth-token')
          
        },
        body: JSON.stringify({"title":title,"description":description}) // body data type must match "Content-Type" header
      });

      const json= await response.json();
      
      // console.log(title,description)
      // const notetoAdd={
      //   "_id": json.note._id,
      //   "user": "61be1947891b4e2d99f4c622",
      //   "title": title,
      //   "description": description,
      //   "date": "2021-12-18T18:12:48.887Z",
      //   "__v": 0
      // }

      setNote(note.concat(json.note))
    }

    const editNotes= async (note)=>{
      debugger
      const response = await fetch(`${host}/api/notes/updatenote/${note.id}`, 
      {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('auth-token')
        
      },
      body: JSON.stringify({"title":note.title,"description":note.description}) // body data type must match "Content-Type" header
    });

    const json= await response.json();
    // eslint-disable-next-line
   // console.log(json.notes);
    // setNote(json.notes);
    getAllNotes();
    }




    //delete note
    const deleteNote= async (id)=>{
      const response = await fetch(`${host}/api/notes/deleteNote/${id}`, 
        {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'auth-token':localStorage.getItem('auth-token')
          
        },
        //body: JSON.stringify(title,description) // body data type must match "Content-Type" header
      });

      const json= await response.json();
     // console.log(json.notes);

      const notesAfterDelete= note.filter((note)=>{
        return note._id!==id
      });

      setNote(notesAfterDelete);
     // console.log("in delte",id)
     // eslint-disable-next-line
    }
   return (
    <NoteContext.Provider value={{note,addnote,deleteNote,getAllNotes,editNotes}}>
        {props.children}
    </NoteContext.Provider>
)
}



export default NoteState;