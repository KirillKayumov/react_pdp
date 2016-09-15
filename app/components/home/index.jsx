import React from 'react';
import { Grid, Jumbotron } from 'react-bootstrap';
import Flash from 'components/flash';

export default class Home extends React.Component {
  render() {
    return (
      <Grid>
        <Flash/>
        <Jumbotron>
          <h1>Social PDP</h1>
          <p>
            Kick-start your new web application based on React and Flux technologies.
            <br/>
            It also includes Webpack, React hot loader, PostCSS,
            JSON-server tools for even more rapid development.
          </p>
        </Jumbotron>
      </Grid>
    );
  }
}
