import { detect } from 'detect-browser';

const BROWSER = detect();
const CODECS = {
  avc: 'video/mp4; codecs="avc1"',
  hevc: 'video/mp4; codecs="hvc1"',
  vp8: 'video/mp4; codecs="vp08"',
  vp9: 'video/mp4; codecs="vp09.00.50.08"',
  av1: 'video/mp4; codecs="av01.0.08M.08"',
}

export function getRecommendedBrowser(os) {
  const mainOsName = os ? os.split(' ')[0] : null;

  switch (mainOsName) {
    case 'iOS':
    case 'Mac':
      return 'Safari';
    case 'Windows':
      return 'Edge';
    case 'Linux':
      return 'Firefox';
    default:
      return 'Chrome';
  }
}

export function getBrowserSupportedCodecs() {
  const videoElement = document.createElement('video');
  if (!videoElement.canPlayType) return 'none';

  const supportedCodecs = Object.keys(CODECS).reduce((codecs, codecName) =>
    videoElement.canPlayType(CODECS[codecName])
      ? codecs.concat([codecName])
      : codecs
  , []);

  return supportedCodecs.join(', ');
}

export function getSupportedCodecsDisplayedValue(codecs) {
  if (codecs === 'none') return 'Unable to detect'

  return codecs;
}

export function getBrowserProperties() {
  const { name, version, os } = BROWSER || {};

  return {
    name,
    version,
    os,
    recommended: getRecommendedBrowser(BROWSER.os),
    supportedCodecs: getBrowserSupportedCodecs(),
  }
}