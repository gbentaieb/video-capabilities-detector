import { SET_DRM_PROPERTIES } from '../constants/actionTypes';

const initialState = {
  drmName: null,
  drmSecurity: null,
  hdcpLevel: null,
  drmCanPersistState: null,
};

export default function drmReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DRM_PROPERTIES:
      return {
        ...state,
        drmName: action.payload.drmName,
        drmSecurity: action.payload.drmSecurity,
        hdcpLevel: action.payload.hdcpLevel,
        drmCanPersistState: action.payload.drmCanPersistState,
      };
    default:
      return state;
  }
}