const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const metricSchema = mongoose.Schema({
  _id: {
    type: Schema.Types.String,
    ref: "Time",
  },
  measure: {
    type: String,
    required: true,
  },
  dimensions: {
    type: Array,
    default: [],
  },
});

metricSchema.plugin(aggregatePaginate);

const Metric = mongoose.model("Metric", metricSchema);
module.exports = { Metric };
