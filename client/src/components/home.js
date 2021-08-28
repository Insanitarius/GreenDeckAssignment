import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import PaginationComponent from "./paginate";
import {
  getPaginateMetrics,
  getMetricsById,
} from "../store/actions/site_actions";
import LineGraph from "./lineGraph";

const Home = () => {
  const limit = 6;
  const metrics = useSelector((state) => state.site.metrics);
  const dispatch = useDispatch();
  const [removeAlert, setRemoveAlert] = useState(false);
  const [metricId, setMetricId] = useState("");

  const handleShow = (id = null) => {
    setMetricId(id);
    setRemoveAlert(true);
  };

  const goToPrevPage = (page) => {
    dispatch(getPaginateMetrics(page, limit));
  };

  const goToNextPage = (page) => {
    dispatch(getPaginateMetrics(page, limit));
  };
  const handleClose = () => setRemoveAlert(false);
  useEffect(() => {
    dispatch(getPaginateMetrics());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMetricsById(metricId));
  }, [dispatch, metricId]);

  return (
    <div className="container mt-5">
      <div className="articles_table">
        <PaginationComponent
          metrics={metrics}
          prev={(page) => goToPrevPage(page)}
          next={(page) => goToNextPage(page)}
          handleShow={(id) => handleShow(id)}
        />

        <Modal fullscreen show={removeAlert} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Time Series Graph</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <LineGraph load={true} metricId={`${metricId}`} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Home;
