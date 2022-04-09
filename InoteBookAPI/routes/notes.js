const express= require("express");
const router= express.Router();
const Note = require("../models/Note")
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');



// router 1 to create a note => url=/api/notes/CreateNotes ---login required
router.post('/CreateNotes',[
    body('title', 'Enter Title ').exists()
   
], fetchuser,async (req,res)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        note= await Note.create({
            title: req.body.title,
            description: req.body.description,
            user:req.user.id
        });
        res.json({note});
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Some Error Occured" })
    }

   
})

//router 2 for fetching notes-> url=/api/notes/fetchallnotes ---login required

router.get('/fetchallnotes', fetchuser, async (req,res)=>{

    try {
        const notes= await Note.find({user:req.user.id});
        res.json({notes})
    } catch (error) {
        res.status(500).json({ error: "Some Error Occured" })
    }

})


//router 3 for update  url=/api/notes/updateNotes:id ---login required

router.put('/updatenote/:id',fetchuser, async (req,res)=>{
try {
    const {title,description}= req.body;
    newNote={};
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    let note=  await Note.findById(req.params.id)
    if(!note){
         return res.status(401).json({ errors});
    }

    if(note.user.toString()!= req.user.id){
          return res.status(401).json({ errors });
    }

    note= await Note.findByIdAndUpdate(req.params.id,{$set:newNote}, {new:true})
  
    res.json({note})

} catch (error) {
    res.status(500).json({ error: "Some Error Occured" })
}
})

//route4 to delete note url=/api/notes/updateNotes:id ---login required

router.delete('/deleteNote/:id', fetchuser, async (req,res)=>{
    
    try {
        let note=  await Note.findById(req.params.id)
        if(!note){
             return res.status(401).json({ errors});
        }
    
        if(note.user.toString()!= req.user.id){
              return res.status(401).json({ errors });
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
    
        res.json({sucess:"Success"})
        
    } catch (error) {
        res.status(500).json({ error: "Some Error Occured" })
    }
})

module.exports= router