const {User, Thought} = require("../models");

const userController = {

    //==================================================
    //  /api/users & /api/users/:id
    //==================================================
    
    //GET all users
    getAllUsers(req, res) {
        User.find({})
        .collation({locale: "en_US", strength: 1})
        .sort({username: 1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //GET one user by _id and populated thought and friend data (connects to paths in routes/api/index.js)
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: "thoughts",
            select: "-__v"
        })
        .populate({
            path: "users",
            select: "-__v"
        })
        .select("-__v")
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //POST a new user
    /*
    example data
    {
        "username": "lernantino",
        "email": "lernantino@gmail.com"
    }
    */
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    //PUT to update a user by their _id (do we need to accomodate validators here? 18.5.3)
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            {_id: params.id},
             body,
            {new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    //DELETE a user by their _id, remove users associated thoughts (and comments?)
    //use params.id instead?
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            //use deleteMany()?
            return Thought.deleteMany(
                //{_id: body.id},
                {_id: {$in: dbUserData.thoughts}}
            );
            //Thought.find({$pullAll})?
            //Thought.updateMany(
            //    //use id instead of userId?
            //    {$pullAll: {username: body.userId}}
            //);
        })
        .then(() => {
            res.json({message: "User deleted"});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    //==================================================
    //  /api/users/:userId/friends/:friendId
    //==================================================

    //POST to add a new friend to a user's friend list
    //incorporate friendId?  see pizza-hunt/controllers/comment-controller
    //will this be ok because it has a different api endpoint?
    addFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            //$push adds all, $addToSet doesn't add duplicates
            //User model forces unique, do we need built-in redundancy here?
            //$push is faster (doesn't have to check for duplicates)
            {$push: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //DELETE to remove a friend from a user's friend list
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true, runValidators: true}
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
};

module.exports = userController;