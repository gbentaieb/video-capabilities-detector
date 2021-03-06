
import React from 'react'
import { connect } from 'react-redux'
import Table from '../presentationals/Table';

const TableContainer = props => <Table {...props}/>;

function mapStateToProps(state) {
  return {
    drmName: state.drm.drmName,
    drmSecurity: state.drm.drmSecurity,
    drmCanPersistState: state.drm.drmCanPersistState,
    hdcpLevel: state.drm.hdcpLevel,
    protectedContentMaxBandwidth: state.maxBandwidth.protectedContent,
    unprotectedContentMaxBandwidth: state.maxBandwidth.unprotectedContent,
    recommendedBrowser: state.browser.recommended,
    supportedCodecs: state.browser.supportedCodecs,
  };
} 

export default connect(
  mapStateToProps,
)(TableContainer)
