const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      (userData) =>
        !userData
          ? res.status(404).json({ message: "No user found" })
          : res.json(userData);
    } catch {
      (err) => res.status(500).json(err);
    }
  },

  async getsingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId });
      (userData) =>
        !userData
          ? res.status(404).json({ message: "No user found" })
          : res.json(userData);
    } catch {
      (err) => res.status(500).json(err);
    }
  },

async createUser(req, res) {
  try {
    const userData = await User.create(req.body);
    (userData) =>
    !userData
      ? res.status(404).json({ message: "No user found" })
      : res.json(userData);
} catch {
  (err) => res.status(500).json(err);
}
},

async updateUserbyId(req, res) {
  try {
  const userData = await User.findOneAndUpdate(
    {_id: req.params.userId},
    {$set: req.body},
    { runValidators: true, new: true });
    (userData) =>
    !userData
      ? res.status(404).json({ message: "No user found" })
      : res.json(userData);
} catch {
  (err) => res.status(500).json(err);
}
},

async deleteUserbyId(req, res) {
  try {
    const userData = await User.findOneAndRemove(
      {_id: req.params.userId},
      { $pull: { thoughts: { username: this.username} } },
      { runValidators: true, new: true });
      (userData) =>
      !userData
        ? res.status(404).json({ message: "No user found" })
        : res.json(userData);
  } catch {
    (err) => res.status(500).json(err);
  }
  },
  
};

