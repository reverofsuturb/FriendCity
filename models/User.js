const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
    },
    // reference to thought model
    thoughts: [ {
      type: Schema.Types.ObjectId,
      ref: 'thoughts',
    } ],
    // self reference to user model
    friends: [ {
      type: Schema.Types.ObjectId,
      ref: 'users',
    } ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//  using this so each user reference itself
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('users', userSchema);
module.exports = User;