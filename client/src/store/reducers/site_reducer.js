import { PAGINATE_METRICS, METRICS_BY_ID } from "../types";

export default function siteReducer(state = {}, action) {
  switch (action.type) {
    case PAGINATE_METRICS:
      return { ...state, metrics: action.payload };
    case METRICS_BY_ID:
      return { ...state, timeGraph: action.payload };
    default:
      return state;
  }
}
