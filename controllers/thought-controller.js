const {Thought} = require("../models");

const thoughtController = {

    //==================================================
    //  /api/thoughts  
    //==================================================

    //GET to get all thoughts
    getAllThoughts(req, res) {
        
    },

    //GET to get a single thought by its _id
    getThoughtById({params}, res) {

    },

    //POST to create a new thought
    //(don't forget to push the created thought's _id to the associated user's thoughts array field)
    /*
    example data
    {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
    }
    */
    createThought({body}, res) {

    },

    //PUT to update a thought by its _id
    updateThought({params, body}, res) {

    },

    //DELETE to remove a thought by its _id
    deleteThought({params}, res) {

    },

    //==================================================
    //  /api/thoughts/:thoughtId/reactions
    //==================================================

    //POST to create a reaction stored in a single thought's reactions array field
    createReaction({body}, res) {

    },

    //DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({params}, res) {
        
    }
}

module.exports = thoughtController;