const {Schema, model } = require('mongoose');
const Reaction = require('./Reaction')
const moment = require('moment')

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
            // getter for date format using moment
      get: currentdate => moment(currentdate).format("MMM DD, YYYY hh:mm a"),


    },
    username: {
    type: String,
    required: true,
  },
  reactions: [Reaction]
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}
);
// using this so that each thought references itself
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;

