const router = require("express").Router();
const {
  getUsers,
  getsingleUser,
  createUser,
  updateUserbyId,
  deleteUserbyId,
  addUserFriend,
  deleteUserFriend
} = require("../../controllers/userController");

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getsingleUser).put(updateUserbyId).delete(deleteUserbyId);

router.route('/:userId/friends/:friendId').post(addUserFriend).delete(deleteUserFriend);

module.exports = router;
