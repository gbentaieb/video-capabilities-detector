import { Component } from 'react';
import PropTypes from 'prop-types';
import { getDrmInfos } from '../../utils/drm';

class DrmDetector extends Component {
  static propTypes = {
    setDrmProperties: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.detectDrmProperties();
  }

  async detectDrmProperties() {
    const capabilities = await getDrmInfos();
    
    this.props.setDrmProperties(capabilities);
  }

  render() {
    return null;
  }
}

export default DrmDetector;