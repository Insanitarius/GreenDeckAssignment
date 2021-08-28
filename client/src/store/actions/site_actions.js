import * as site from "./index";
import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const getPaginateMetrics = (page = 1, limit = 6) => {
  return async (dispatch) => {
    try {
      const request = await axios.post(`/api/metrics/paginatemetrics`, {
        page,
        limit,
      });
      dispatch(site.getPaginateMetrics(request.data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};

export const getMetricsById = (id) => {
  return async (dispatch) => {
    try {
      const request = await axios.get(`/api/metrics/${id}`);
      dispatch(site.getMetricsById(request.data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
};
