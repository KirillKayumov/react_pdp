import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class EmailConfirmedPage extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={ 12 }>
            <h4>Your email address has been successfully confirmed.</h4>
          </Col>
        </Row>
      </Grid>
    );
  }
}
