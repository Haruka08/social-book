const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts  - WORKING
  getThoughts(req, res) {
    Thought.find()
    .then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
},
    //  get a thought by userID - WORKING
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
  // create a new thought - WORKING
  createThought(req, res) {
    Thought.create(req.body)
    .then((thought) => {
      return User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { thoughts: thought._id } },
        { new: true }
      );
    })
    .then((user) =>
    !user
      ? res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      : res.json('Created the thought 🎉')
  )
    .catch((err) => res.status(500).json(err));
},
  // update a thought - WORKING
  updateThought (req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    // delete a thought - WORKING
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : Thought.findOneAndUpdate(
            { thought: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          )
    )
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: 'Thought not found with this user id!' })
        : res.json({ message: 'Thought successfully deleted!' })
    )
    .catch((err) => res.status(500).json(err));
},
    // Add a new friend to friends array
  createReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body.reactions } },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // delete a friend from friends array
  deleteReaction(req, res) {
    console.log(req.body)
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$pull: {reactions: { _id: req.body.reactionId }}},
        {new: true})
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
};