import React from 'react'
import { connect } from 'react-redux'
import DrmDetector from '../presentationals/DrmDetector';
import { setDrmName } from '../../actions/drmActions';

const DrmDetectorContainer = props => <DrmDetector {...props}/>;

export default connect(
  null,
  { setDrmName },
)(DrmDetectorContainer)
