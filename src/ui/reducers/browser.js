import { SET_BROWSER_PROPERTIES } from '../constants/actionTypes';

const initialState = {
  name: null,
  version: null,
  os: null,
  recommended: null,
  supportedCodecs: null,
};

export default function drmReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_BROWSER_PROPERTIES:
      return {
        ...state,
        name: action.payload.name,
        version: action.payload.version,
        os: action.payload.os,
        recommended: action.payload.recommended,
        supportedCodecs: action.payload.supportedCodecs,
      };
    default:
      return state;
  }
}