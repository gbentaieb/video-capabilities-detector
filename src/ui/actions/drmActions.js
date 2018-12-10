import { SET_DRM_PROPERTIES } from '../constants/actionTypes';

export function setDrmProperties(name) {
  return {
    type: SET_DRM_PROPERTIES,
    payload: name,
  };
}