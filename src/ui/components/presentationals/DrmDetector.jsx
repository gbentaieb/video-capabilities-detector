import { Component } from 'react';
import PropTypes from 'prop-types';
import { getDrmCapabilities } from '../../utils/drm';

class DrmDetector extends Component {
  static propTypes = {
    setDrmProperties: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.detectDrmCapabilities();
  }

  async detectDrmCapabilities() {
    const capabilities = await getDrmCapabilities();
    
    this.props.setDrmProperties(capabilities);
  }

  render() {
    return null;
  }
}

export default DrmDetector;