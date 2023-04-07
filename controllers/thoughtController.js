const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

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

  async createThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);
      !thoughtData
        ? res.status(404).json({ message: "No thought found" })
        : ({ username }) => {
            User.findOneAndUpdate(
              { username: req.body.username },
              { $push: { thoughts: username } },
              { new: true }
            );
          };
      res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

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

  async createReactionbyThoughtId(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      !thoughtData
        ? res
            .status(404)
            .json({ message: "No thought found, you cannot react" })
        : res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReactionbyId(req, res) {
    try {
      const reactionData = await Thought.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );
      !thoughtData
        ? res
            .status(404)
            .json({ message: "No thought found, you cannot react" })
        : res.json(thoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
