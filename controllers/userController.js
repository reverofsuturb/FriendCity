const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },

  async getsingleUser(req, res, next) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends");
      !userData
        ? res.status(404).json({ message: "No user found" })
        : res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      !userData
        ? res.status(404).json({ message: "No user found" })
        : res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUserbyId(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      !userData
        ? res.status(404).json({ message: "No user found" })
        : res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUserbyId(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      !userData
        ? res.status(404).json({ message: "No user found" })
        : Thought.deleteMany({ _id: { $in: userData.thoughts } });
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addUserFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      !userData
        ? res.status(404).json({ message: "No user found" })
        : res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUserFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      !userData
        ? res.status(404).json({ message: "No user found" })
        : res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
