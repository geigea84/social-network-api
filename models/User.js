const {Schema, model} = require("mongoose");
const validateEmail   = require("../utils/validateEmail");
const uniqueValidator = require("mongoose-unique-validator");

//https://mongoosejs.com/docs/faq.html

//Mongoose doesn't handle unique on its own: { name: { type: String, unique: true } } 
//is just a shorthand for creating a MongoDB unique index on name.

//However, if you wait for the index to build using the Model.on('index') event, 
//attempts to save duplicates will correctly error.

// Promise based alternative. `init()` returns a promise that resolves
// when the indexes have finished building successfully. The `init()`
// function is idempotent, so don't worry about triggering an index rebuild.
//Model.init().then(function() {
//    Model.create([{ name: 'Val' }, { name: 'Val' }], function(err) {
//      console.log(err);
//    });
//  });

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Please enter a username",
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: "Please enter an email address",
            //see Thought.js dateFormat
            validate: [validateEmail, "Please enter a valid email address"]
        },
        //reference by respective id //require ThoughtSchema at the top?
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            //is getters required on this model?
            getters: true
        },
        //18.2.4
        id: false
    }
);

//https://www.npmjs.com/package/mongoose-unique-validator
//applying unique validation handling
UserSchema.plugin(uniqueValidator);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;