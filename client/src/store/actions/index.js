import { PAGINATE_METRICS, METRICS_BY_ID } from "../types";

export const getPaginateMetrics = (metrics) => ({
  type: PAGINATE_METRICS,
  payload: metrics,
});

export const getMetricsById = (metrics) => ({
  type: METRICS_BY_ID,
  payload: metrics,
});
