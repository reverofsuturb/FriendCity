const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughtData = await Thought.find();
      (thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thoughtData);
    } catch {
      (err) => res.status(500).json(err);
    }
  },

  async getsingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
      (thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thoughtData);
    } catch {
      (err) => res.status(500).json(err);
    }
  },

async createThought(req, res) {
  try {
    const thoughtData = await Thought.create(req.body);
    (thoughtData) =>
    !thoughtData
      ? res.status(404).json({ message: "No thought found" })
      : res.json(thoughtData);
} catch {
  (err) => res.status(500).json(err);
}
},

async updateThoughtbyId(req, res) {
  try {
  const thoughtData = await Thought.findOneAndUpdate(
    {_id: req.params.thoughtId},
    {$set: req.body},
    { runValidators: true, new: true });
    (thoughtData) =>
    !thoughtData
      ? res.status(404).json({ message: "No thought found" })
      : res.json(thoughtData);
} catch {
  (err) => res.status(500).json(err);
}
},

async deleteThoughtbyId(req, res) {
  try {
    const thoughtData = await Thought.findOneAndRemove(
      {_id: req.params.thoughtId},
      { runValidators: true, new: true });
      (thoughtData) =>
      !thoughtData
        ? res.status(404).json({ message: "No thought found" })
        : res.json(thoughtData);
  } catch {
    (err) => res.status(500).json(err);
  }
  },
  
};

