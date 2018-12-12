import { SET_BROWSER_PROPERTIES } from '../constants/actionTypes';

export function setBrowserProperties(properties) {
  return {
    type: SET_BROWSER_PROPERTIES,
    payload: properties,
  };
}