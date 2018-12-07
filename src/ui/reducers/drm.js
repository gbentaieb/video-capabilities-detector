import { SET_DRM_NAME } from '../constants/actionTypes';

const initialState = {
  drmName: null,
};

export default function drmReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DRM_NAME:
      return {
        ...state,
        drmName: action.payload,
      };
    default:
      return state;
  }
}