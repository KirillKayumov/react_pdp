import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import {
  Grid,
  Row,
  Col,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import ProfileStore from 'stores/profile'
import ProfileActions from 'actions/profile'

@connectToStores
export default class Profile extends React.Component {
  static getStores(props) {
    return [ProfileStore];
  }

  static getPropsFromStores(props) {
    return {
      ...ProfileStore.getState()
    };
  }

  submit = (event) => {
    event.preventDefault();

    ProfileActions.update(this.props.user);
  }

  setValue(event) {
    ProfileActions.setValue(event.target.name, event.target.value);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col md={ 6 } mdOffset={ 3 }>
            <h2>Profile</h2>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col md={ 6 } mdOffset={ 3 }>
            <form onSubmit={ this.submit }>
              <ControlLabel>First name</ControlLabel>
              <FormControl type="text" name="first_name" value={ this.props.user.first_name } onChange={ this.setValue }/>
              <ControlLabel>Last name</ControlLabel>
              <FormControl type="text" name="last_name" value={ this.props.user.last_name } onChange={ this.setValue }/>
              <ControlLabel>Bio</ControlLabel>
              <FormControl type="text" name="bio" value={ this.props.user.bio } onChange={ this.setValue }/>
              <ControlLabel>Email</ControlLabel>
              <FormControl type="email" name="email" value={ this.props.user.email } onChange={ this.setValue }/>
              <ControlLabel>Current password</ControlLabel>
              <FormControl type="password" name="current_password" onChange={ this.setValue }/>
              <Button bsStyle="primary" type="submit">
                Save
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}
