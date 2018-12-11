import { SET_MAX_BANDWIDTH } from '../constants/actionTypes';

export function setMaxBandwidth(name) {
  return {
    type: SET_MAX_BANDWIDTH,
    payload: name,
  };
}