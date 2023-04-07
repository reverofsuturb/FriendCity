const router = require('express').Router();

const {
  getThoughts,
  getsingleThought,
  createThought,
  updateThoughtbyId,
  deleteThoughtbyId,
} = require("../../controllers/thoughtController");

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getsingleThought).put(updateThoughtbyId).delete(deleteThoughtbyId);


module.exports = router;
