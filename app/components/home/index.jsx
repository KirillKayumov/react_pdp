import React, { Component } from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Jumbotron>
          <h1>Social PDP</h1>
          <p>
            Awesome application to try Oauth authentication based on React and Flux technologies.
            <br/>
            It also includes Webpack, React hot loader, PostCSS,
            JSON-server tools for even more rapid development.
          </p>
        </Jumbotron>
      </Grid>
    );
  }
}
