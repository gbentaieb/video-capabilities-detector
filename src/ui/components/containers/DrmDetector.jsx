import React from 'react'
import { connect } from 'react-redux'
import DrmDetector from '../presentationals/DrmDetector';
import { setDrmProperties } from '../../actions/drmActions';

const DrmDetectorContainer = props => <DrmDetector {...props}/>;

export default connect(
  null,
  { setDrmProperties },
)(DrmDetectorContainer)
