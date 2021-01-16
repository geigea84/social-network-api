const {Thought, User} = require("../models");

const thoughtController = {

    //==================================================
    //  /api/thoughts  
    //==================================================

    //GET to get all thoughts
    //should I sort this descending .sort({_id: -1})
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //GET to get a single thought by its _id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
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
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: params.userId},
                {$push: {thoughts: _id}},
                {new: true, runValidators: true}
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //PUT to update a thought by its _id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //DELETE to remove a thought by its _id
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //==================================================
    //  /api/thoughts/:thoughtId/reactions
    //==================================================

    //POST to create a reaction stored in a single thought's reactions array field
    addReaction({body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: "No thought found with this id"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
};

module.exports = thoughtController;