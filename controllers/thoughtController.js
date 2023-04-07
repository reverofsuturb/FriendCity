const { User, Thought, Reaction } = require("../models");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// get singly thought by id
  async getsingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      !thoughtData
        ? res.status(404).json({ message: "No thought found" })
        : res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// creates thought, updates into user
  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      !thoughtData
        ? res.status(404).json({ message: "No thought found" })
        : await User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: thoughtData._id } },
              { new: true }
            );
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// update a thought by thought id
  async updateThoughtbyId(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      !thoughtData
        ? res.status(404).json({ message: "No thought found" })
        : res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// delete a thought by id
  async deleteThoughtbyId(req, res) {
    try {
      const thoughtData = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { runValidators: true, new: true }
      );
      !thoughtData
        ? res.status(404).json({ message: "No thought found" })
        : User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
      res.json({ message: "Thought deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
// create a new reaction by thought id
  async createReactionbyThoughtId(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      !reactionData
        ? res
            .status(404)
            .json({ message: "No thought found, you cannot react" })
        : res.json(reactionData);
    } catch (err) {
      res.status(500).json(err)
      console.log(err);
    }
  },
// delete reaction by reaction id
  async deleteReactionbyId(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      !reactionData
        ? res
            .status(404)
            .json({ message: "No thought found, you cannot react" })
        : res.json( { message: "Reaction Deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
