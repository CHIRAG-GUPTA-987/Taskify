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
        if (!errors.isEmpty())return res.status(500).json({ errors: errors.array() });

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
        res.status(500).send('Internal server error')
    }
}

module.exports.updateNote = async(req, res)=>{
    try{
        const {description, tag} = req.body;
        let note = await Note.findById(req.params.id);
        if(!note)return res.send('No note was found');
        if(note.user.toString() !== req.user.id)return res.status(401).send('Unauthorized access');
        note = await Note.findByIdAndUpdate(req.params.id, {$set: {description: description, tag: tag}})
        res.send(note);
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}

module.exports.deleteNote = async(req, res)=>{
    try{
        let note = await Note.findById(req.params.id);
        if(!note)return res.send('No note was found');
        if(note.user.toString() !== req.user.id)return res.status(401).send('Unauthorized access');
        note = await Note.findByIdAndDelete(req.params.id);
        res.send('Note deletion successfull');
    }catch(error){
        console.log(error);
        res.status(500).send('Internal server error');
    }
}