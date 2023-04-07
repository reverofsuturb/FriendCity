const { User, Thought, Reaction } = require("../models");

module.exports = {
// get all users
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
// get an individual user by id
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
// create new user
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
// update user by id
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
// deletes user by id and associated thoughts delete as well (per bonus)
  async deleteUserbyId(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      const deleteresponse = !userData
        ? res.status(404).json({ message: "No user found" })
        : await Thought.deleteMany({ _id: { $in: userData.thoughts } });
        console.log(deleteresponse);
      res.json( { message: "User Deleted" } );
    } catch (err) {
      res.status(500).json(err);
    }
  },
// add friend with user id and friend (other user) id
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
// delete friend with user id and friend (other user) id
  async deleteUserFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      !userData
        ? res.status(404).json({ message: "No user found" })
        : res.json( { message: "Friend removed" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
