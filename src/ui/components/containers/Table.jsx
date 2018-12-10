
import React from 'react'
import { connect } from 'react-redux'
import Table from '../presentationals/Table';

const TableContainer = props => <Table {...props}/>;

function mapStateToProps(state) {
  return {
    drmName: state.drm.drmName,
    drmSecurity: state.drm.drmSecurity,
  };
} 

export default connect(
  mapStateToProps,
)(TableContainer)
