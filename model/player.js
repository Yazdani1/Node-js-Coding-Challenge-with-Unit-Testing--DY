const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var playerSchema = mongoose.Schema({
    
  name: {
    type: String,
  },

  jerseyNumber: {
    type: Number,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },

  date: {
    type: Date,
    default: Date.now,
  },

});



module.exports = mongoose.model("Player", playerSchema);
