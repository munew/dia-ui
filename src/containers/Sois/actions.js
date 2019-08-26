/*
 *
 * Sois actions
 *
 */

import { REFRESH_SOIS, REFRESH_SOIS_SUCCESS, REFRESH_SOIS_FAIL } from './constants';

export function refreshSOIs() {
  return {
    type: REFRESH_SOIS,
  };
}

export function refreshSOIsSuccess(sois) {
  return {
    type: REFRESH_SOIS_SUCCESS,
    sois
  };
}

export function refreshSOIsFail(error) {
  return {
    type: REFRESH_SOIS_FAIL,
    error
  };
}