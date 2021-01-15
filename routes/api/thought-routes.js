const router = require("express").Router();

//import Thought controllers
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
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

//set up POST reaction and DELETE reaction at /api/thoughts/:thoughtId/reactions
router
.route("/:thoughtId/reactions")
.post(createReaction)
.delete(deleteReaction);

module.exports = router;