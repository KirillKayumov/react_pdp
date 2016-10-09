import React from 'react';
import Header from 'components/header';
import Modals from 'components/modals';
import Footer from 'components/footer';
import styles from './styles';
import Flash from 'components/flash';
import { Grid } from 'react-bootstrap';
import config from 'config'

export default class Application extends React.Component {
  componentDidMount() {
    FB.init({
      appId: config.facebookCliendId,
      cookie: true,
      version: 'v2.5'
    });
  }

  render() {
    return (
      <div className={ styles.layout }>
        <Flash/>
        <main className={ styles.wrapper }>
          <Header/>
          { this.props.children }
        </main>
        <Footer/>
        <Modals/>
      </div>
    );
  }
}
