import { SET_DRM_NAME } from '../constants/actionTypes';

export function setDrmName(name) {
  return {
    type: SET_DRM_NAME,
    payload: name,
  };
}