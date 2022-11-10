const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');

// Schema to create Reaction schema
const reactionSchema = new Schema(
    {
      reactionId: ObjectId,
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true
      },
      createdAt: { type: Date, default: Date.now },
    }
  );

// Schema to create Thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
      },
    createdAt: { type: Date, default: Date.now },
    username: {
        type: String,
        required: true
      },
    reactions: [reactionSchema],
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

// Create a virtual property `fullName` that gets and sets the user's full name
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

// Initialize thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
