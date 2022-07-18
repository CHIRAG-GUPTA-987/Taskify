const Note = require('../models/Notes');
const Users = require('../models/User')
const {validationResult} = require('express-validator');

module.exports.fetchNotes = async(req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }catch(error){
        console.log(error);
        res.send('Internal server error');
    }
}

module.exports.addNotes = async(req, res)=>{
    try{
        //Checking for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty())return res.status(400).json({ errors: errors.array() });

        //Destructuring Notes from request body
        const {title, description, tag} = req.body;

        //Adding a new note
        const note = await new Note({
            title, description, tag, user: req.user.id
        })

        //Saving note
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(error){
        console.log(error);
        res.status(400).send('Internal server error')
    }
}

module.exports.updateNote = async(req, res)=>{
    const {description, tag} = req.body;
    const {id} = req.params.id;
    const note = await Note.findByIdAndUpdate(id, {description, tag}, (err, docs)=>{
        if(err){
            return res.send('Updation Error');
        }else{
            console.log('Update Successful');
        }
    })
    const savedNote = await note.save();
    res.send(savedNote);
}