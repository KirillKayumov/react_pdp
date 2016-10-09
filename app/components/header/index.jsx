import React from 'react';
import { Navbar } from 'react-bootstrap';
import NavigationLeft from 'components/navigation/left';
import NavigationRight from 'components/navigation/right';

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Social PDP
          </Navbar.Brand>
        </Navbar.Header>
        <NavigationLeft/>
        <NavigationRight/>
      </Navbar>
    );
  }
}
