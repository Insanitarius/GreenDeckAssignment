import React from "react";
import { Table, Pagination } from "react-bootstrap";
import Loader from "../utils/loader";
import VisibilityIcon from "@material-ui/icons/Visibility";

const PaginationComponent = ({ metrics, prev, next, handleShow }) => {
  const goToPrevPage = (page) => {
    prev(page);
  };

  const goToNextPage = (page) => {
    next(page);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="mb-5">The Visualisation</h1>
      {metrics && metrics.docs ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Country</th>
                <th>Product Family</th>
                <th>Device Type</th>
                <th>OS</th>
                <th>Graph</th>
              </tr>
            </thead>
            <tbody>
              {metrics.docs.map((item) => (
                <tr key={item._id}>
                  <td>{item.dimensions[0].value}</td>
                  <td>{item.dimensions[1].value}</td>
                  <td>{item.dimensions[2].value}</td>
                  <td>{item.dimensions[3].value}</td>
                  <td
                    className="action_btn edit_btn"
                    onClick={() => handleShow(item._id)}
                  >
                    <VisibilityIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination style={{ justifyContent: "center" }}>
            {metrics.hasPrevPage ? (
              <>
                <Pagination.Prev
                  onClick={() => goToPrevPage(metrics.prevPage)}
                />
                <Pagination.Item onClick={() => goToPrevPage(metrics.prevPage)}>
                  {metrics.prevPage}
                </Pagination.Item>
              </>
            ) : null}

            <Pagination.Item active>{metrics.page}</Pagination.Item>
            {metrics.hasNextPage ? (
              <>
                <Pagination.Item onClick={() => goToNextPage(metrics.nextPage)}>
                  {metrics.nextPage}
                </Pagination.Item>
                <Pagination.Next
                  onClick={() => goToNextPage(metrics.nextPage)}
                />
              </>
            ) : null}
          </Pagination>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PaginationComponent;
