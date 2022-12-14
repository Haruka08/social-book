const { Schema, model } = require('mongoose');

const validateEmail = function(email) {
  const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailFormat.test(email)
};

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        validate: validateEmail
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ]
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// function to delete on cascade when user is removed
// userSchema.pre('remove', function(next) {
//   Thought.remove({User_id: this._id}).exec();
//   next();
// });

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return `${this.friends.length}`;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
