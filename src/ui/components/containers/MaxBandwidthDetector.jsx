import React from 'react';
import { connect } from 'react-redux';
import MaxBandwidthDetector from '../presentationals/MaxBandwidthDetector';
import { setMaxBandwidth } from '../../actions/maxBandwidthActions';

const MaxBandwidthDetectorContainer = props => <MaxBandwidthDetector {...props}/>;

const mapStateToProps = (state) => ({
  drmName: state.drm.drmName,
  drmSecurity: state.drm.drmSecurity,
  hdcpLevel: state.drm.hdcpLevel,
  drmCanPersistState: state.drm.drmCanPersistState,
});

export default connect(
  mapStateToProps,
  { setMaxBandwidth },
)(MaxBandwidthDetectorContainer)
