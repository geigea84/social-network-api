const router = require("express").Router();

//import Thought controllers
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require("../../controllers/thought-controller");

//set up GET all and POST at /api/thoughts
router
.route("/")
.get(getAllThoughts)
.post(createThought);

//set up GET one, PUT, and DELETE at /api/thoughts/:id
router
.route("/:id")
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought);

//set up POST reaction at /api/thoughts/:thoughtId/reactions
router
.route("/:thoughtId/reactions")
.post(addReaction);

//set up DELETE reaction at /api/thoughts/:thoughtId/reactions/:reactionId
router
.route("/:thoughtId/reactions/:reactionId")
.delete(deleteReaction);

module.exports = router;