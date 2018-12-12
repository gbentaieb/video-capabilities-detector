import { detect } from 'detect-browser';

const browser = detect();

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

export function getBrowserProperties() {
  const { name, version, os } = browser || {};

  return {
    name,
    version,
    os,
    recommended: getRecommendedBrowser(browser.os),
  }
}