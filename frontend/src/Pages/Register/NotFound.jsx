import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h3 className="m-3">Page not found!</h3>
      <h4 className="m-3">Click to redirect to last page</h4>
      <Button
        className="m-3"
        onClick={() => {
          navigate(-1);
        }}
      >
        Redirect
      </Button>
    </div>
  );
};

export default NotFound;
