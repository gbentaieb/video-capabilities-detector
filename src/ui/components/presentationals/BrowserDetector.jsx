import { Component } from 'react';
import PropTypes from 'prop-types';
import { getBrowserProperties } from '../../utils/browser';

class BrowserDetector extends Component {
  static propTypes = {
    setBrowserProperties: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.detectBrowserProperties();
  }

  async detectBrowserProperties() {
    const properties = await getBrowserProperties();
    
    this.props.setBrowserProperties(properties);
  }

  render() {
    return null;
  }
}

export default BrowserDetector;