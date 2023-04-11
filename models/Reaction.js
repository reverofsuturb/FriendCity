const { Schema, Types } = require("mongoose");
const moment = require('moment')

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // getter for date format using moment
      get: currentdate => moment(currentdate).format("MMM DD, YYYY hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      
    },
    id: false,
  }
);

module.exports = reactionSchema;
