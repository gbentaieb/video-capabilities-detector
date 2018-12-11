import { Component } from 'react';
import PropTypes from 'prop-types';

class MaxBandwidthDetector extends Component {
  static propTypes = {
    drmName: PropTypes.string,
    drmSecurity: PropTypes.string,
    hdcpLevel: PropTypes.string,
    drmCanPersistState: PropTypes.string,
  }

  componentWillReceiveProps(nextProps) {
    const {
      drmName,
      drmSecurity,
      hdcpLevel,
      drmCanPersistState,
    } = this.props;

    if (
      drmName !== nextProps.drmName ||
      drmSecurity !== nextProps.drmSecurity ||
      hdcpLevel !== nextProps.hdcpLevel ||
      drmCanPersistState !== nextProps.drmCanPersistState
    ) {
      const maxBandwidth = this.getMaxBandwidth(nextProps);
      if (maxBandwidth) this.props.setMaxBandwidth(maxBandwidth);
    }
  }

  getMaxBandwidth({ drmName, drmSecurity, hdcpLevel, drmCanPersistState }) {
    if (!drmName || !drmSecurity || !hdcpLevel || !drmCanPersistState) return;

    const maxBandwidth = {
      unprotectedContent: '4k',
      protectedContent: 'none',
    }

    if (drmCanPersistState === 'no') {
      return maxBandwidth;
    }
    
    switch (drmName) {
      case 'fairplay':
        return {
          ...maxBandwidth,
          protectedContent: '1080p',
        }
      case 'playready':
        return {
          ...maxBandwidth,
          protectedContent: this.getPlayreadyProtectedContentMaxBandwidth(
            drmSecurity, hdcpLevel,
          ),
        }
      case 'widevine':
        return {
          ...maxBandwidth,
          protectedContent: drmSecurity === 'hardware' ? '1080p' : '720p',
        }
      default:
        return maxBandwidth;
    }
  }

  getPlayreadyProtectedContentMaxBandwidth(drmSecurity, hdcpLevel) {
    const [hdcpMajorLevel, hdcpMinorLevel] = hdcpLevel.split('.');

    if (
      drmSecurity === 'hardware' &&
      (+hdcpMajorLevel >= 3 || (+hdcpMajorLevel === 2 && +hdcpMinorLevel >= 2))
    ) {
      return '4K';
    }

    return drmSecurity === 'hardware' ? '1080p' : '720p';
  }

  render() {
    return null;
  }
}

export default MaxBandwidthDetector;