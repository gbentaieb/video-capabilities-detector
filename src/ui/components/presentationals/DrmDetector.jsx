import { Component } from 'react';
import PropTypes from 'prop-types';
import { getDrmCapabilities } from '../../utils/drm';

class DrmDetector extends Component {
  static propTypes = {
    setDrmName: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.detectDrmCapabilities();
  }

  async detectDrmCapabilities() {
    const capabilities = await getDrmCapabilities();
    
    this.props.setDrmName(capabilities.drmName);
  }

  render() {
    return null;
  }
}

export default DrmDetector;