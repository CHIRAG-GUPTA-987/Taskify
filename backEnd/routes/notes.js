const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const notesControl = require("../controllers/notes");
const { body } = require("express-validator");

//GET: Fetching all notes of a user. Login Required
router.route("/fetchTasks").get(fetchUser, notesControl.fetchNotes);

//POST: Adding new notes of a user. Login Required
router
  .route("/addTask")
  .post(
    fetchUser,
    [
      body("title").isLength({ min: 3 }),
      body("description").isLength({ min: 10 }),
    ],
    notesControl.addNotes
  );

//PUT: Updating a note. Login Required
router
  .route("/updateTask/:id")
  .put(
    fetchUser,
    body("description").isLength({ min: 10 }),
    notesControl.updateNote
  );

//DELETE: Deleting a note. Login Required
router.route("/taskComplete/:id").delete(fetchUser, notesControl.deleteNote);

module.exports = router;
