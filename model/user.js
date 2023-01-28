const mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  teamname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  role: {
    type: String,
    enum : ['Admin','Subscriber'],
    default: 'Subscriber'
  },
  date: {
    type: Date,
    default: Date.now,
  },

});



module.exports = mongoose.model("User", userSchema);
