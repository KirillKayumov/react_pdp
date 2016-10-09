import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import { Nav } from 'react-bootstrap';
import NavigationItem from 'components/navigation';
import NavigationLeftStore from 'stores/navigationLeft';

@connectToStores
export default class NavigationLeft extends React.Component {
  static propTypes = {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        route: React.PropTypes.string,
        title: React.PropTypes.string
      })
    )
  }

  static getStores(props) {
    return [NavigationLeftStore];
  }

  static getPropsFromStores(props) {
    return NavigationLeftStore.getState();
  }

  renderLinks = () => {
    return this.props.links.map((item, index) => {
      return (
        <NavigationItem key={ index } item={ item }/>
      );
    });
  }

  render() {
    return (
      <Nav>
        { this.renderLinks() }
      </Nav>
    );
  }
}
