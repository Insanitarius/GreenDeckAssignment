const mongoose = require("mongoose");

const metricTimeSchema = mongoose.Schema({
  _id: {
    type: String,
  },
  timeSeries: {
    type: Array,
    default: [],
  },
});

const Time = mongoose.model("Time", metricTimeSchema);
module.exports = { Time };
