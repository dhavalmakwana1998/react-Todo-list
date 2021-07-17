import React from "react";

const Loader = () => {
  return (
    <div className="d-flex bg-info justify-content-center align-items-center vh-100">
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
