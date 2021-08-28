const express = require("express");
let router = express.Router();
require("dotenv").config();

//model
const { Metric } = require("../../models/metricModel");
const { Time } = require("../../models/timeSeriesModel");

router.post("/paginatemetrics", async (req, res) => {
  try {
    let aggQuery = Metric.aggregate();

    const limit = req.body.limit ? req.body.limit : 6;
    const options = {
      page: req.body.page,
      limit,
      sort: { _id: "desc" },
    };
    const metric = await Metric.aggregatePaginate(aggQuery, options);

    res.status(200).json(metric);
  } catch (error) {
    res.status(400).json({ message: "Error fetching metrics", error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const metric = await Metric.find({
      _id: req.params.id,
    }).populate("_id");

    if (!metric) {
      return res.status(400).json({ message: "Metric not found" });
    }

    res.status(200).json(metric);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching the time series", error: error });
  }
});

module.exports = router;
