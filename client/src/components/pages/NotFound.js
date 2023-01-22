import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const NotFound = () => {
  return (
    <div>
      <Container className="u-marginTopPage u-marginBottomPage">
        <h1>404 Not Found</h1>
        <p>The page you requested couldn't be found.</p>
      </Container>
    </div>
  );
};

export default NotFound;
