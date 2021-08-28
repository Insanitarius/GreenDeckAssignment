import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Loader from "../utils/loader";

const LineGraph = ({ metricId }) => {
  const metric = useSelector((state) => state.site);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (metric && metric.timeGraph) {
      metric.timeGraph.map((item) => setState(item._id.timeSeries));
      if (metricId === metric.timeGraph[0]._id._id) setLoading(false);
    }
  }, [state, metric, metricId]);

  let orignalValues = [];
  let forecastedValues = [];
  let minBand = [];
  let maxBand = [];
  let anomaly = [];
  let timeStamp = [];

  const splitDate = (date) => {
    const DATE_OPTIONS = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", DATE_OPTIONS);
  };

  state.forEach((item, index) => {
    orignalValues[index] = parseFloat(item.original_value);
    if (item.line_status !== 0) {
      anomaly[index] = item.original_value;
      if (item.line_status === 2) {
        orignalValues[index] = NaN;
      }
    } else {
      anomaly[index] = NaN;
    }
    maxBand[index] = parseFloat(item.max_band);
    minBand[index] = parseFloat(item.min_band);
    timeStamp[index] = splitDate(new Date(`${item.timestamp}`));
    forecastedValues[index] = parseFloat(item.forecasted_value);
  });

  const data = {
    labels: timeStamp,
    datasets: [
      {
        label: "Anomaly",
        data: anomaly,
        fill: false,
        pointStyle: "star",
        hoverRadius: 10,
        spanGaps: false,
        borderColor: "rgb(255,0,0)",
        tension: 0.2,
        borderWidth: 2,
      },
      {
        label: "Original Value",
        data: orignalValues,
        fill: false,
        pointStyle: "star",
        hoverRadius: 10,
        spanGaps: false,
        datasetFill: false,
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        tension: 0.2,
      },
      {
        label: "Max Band",
        data: maxBand,
        fill: "+1",
        pointStyle: "star",
        backgroundColor: "rgb(169,169,169)",
        borderColor: "rgb(169,169,169)",
        borderWidth: 2,
      },

      {
        label: "Min Band",
        data: minBand,
        fill: false,
        pointStyle: "star",
        backgroundColor: "rgb(169,169,169)",
        borderColor: "rgb(169,169,169)",
        borderWidth: 2,
      },
      {
        label: "Forecasted Value",
        data: forecastedValues,
        fill: false,
        pointStyle: "star",
        hoverRadius: 10,
        borderColor: "rgb(54, 162, 235)",
        borderDash: [5, 5],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      intersect: false,
    },
    radius: 0,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Time",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Orignal Value",
        },
      },
    },
  };

  return (
    <div classContainer>
      {loading ? <Loader /> : <Line data={data} options={options} />}
    </div>
  );
};

export default LineGraph;
