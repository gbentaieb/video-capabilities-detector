export function getMaxBandwidthDisplayedValue(maxBandwidth) {
  switch (maxBandwidth) {
    case null:
      return null;
    case 'none':
      return 'Not supported';
    default:
      return `Up to ${maxBandwidth}`;
  }
}