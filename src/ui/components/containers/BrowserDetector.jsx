import React from 'react';
import { connect } from 'react-redux';
import BrowserDetector from '../presentationals/BrowserDetector';
import { setBrowserProperties } from '../../actions/browserActions';

const BrowserDetectorContainer = props => <BrowserDetector {...props}/>;

export default connect(
  null,
  { setBrowserProperties },
)(BrowserDetectorContainer)
