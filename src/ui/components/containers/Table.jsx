
import React from 'react'
import { connect } from 'react-redux'

const Table = props => (
  <div>
    <p>{props.drmName}</p>
  </div>
)

function mapStateToProps(state) {
  return {
    drmName: state.drm.drmName,
  };
} 

export default connect(
  mapStateToProps,
)(Table)
