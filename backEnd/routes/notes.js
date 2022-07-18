const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const notesControl = require('../controllers/notes');
const {body} = require('express-validator');

//GET: Fetching all notes of a user
router.route('/fetchNotes')
    .get(fetchUser, notesControl.fetchNotes)

//POST: Adding new notes of a user
router.route('/addNotes')
    .post(fetchUser,
        [
            body('title').isLength({min: 3}),
            body('description').isLength({min: 10})
        ],
        notesControl.addNotes)

//PUT: Updating a note
router.route('/updateNote/:id')
    .put(fetchUser, notesControl.updateNote)

module.exports = router;