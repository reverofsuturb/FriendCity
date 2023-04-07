const router = require('express').Router();
// importing all route functions from controllers
const {
  getThoughts,
  getsingleThought,
  createThought,
  updateThoughtbyId,
  deleteThoughtbyId,
  createReactionbyThoughtId,
  deleteReactionbyId,
} = require("../../controllers/thoughtController");

router.route('/',).get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getsingleThought).put(updateThoughtbyId).delete(deleteThoughtbyId);

router.route('/:thoughtId/reactions').put(createReactionbyThoughtId)

router.route('/:thoughtId/reactions/:reactionId/').delete(deleteReactionbyId);

module.exports = router;
