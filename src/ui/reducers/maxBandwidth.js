import { SET_MAX_BANDWIDTH } from '../constants/actionTypes';

const initialState = {
  protectedContent: null,
  unprotectedContent: null
};

export default function maxBandwidthReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_MAX_BANDWIDTH:
      return {
        ...state,
        protectedContent: action.payload.protectedContent,
        unprotectedContent: action.payload.unprotectedContent,
      };
    default:
      return state;
  }
}