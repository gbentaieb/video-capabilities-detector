const PLAYREADY_DRM_MIME_TYPES = [
  'com.microsoft.playready.hardware',
  'com.chromecast.playready.hardware',
  'com.youtube.playready.hardware',
  'com.microsoft.playready.software',
  'com.chromecast.playready.software',
  'com.youtube.playready.software',
  'com.microsoft.playready',
  'com.chromecast.playready',
  'com.youtube.playready',
];

// Robustnesses used by widevine
const WIDEVINE_ROBUSTNESSES = [
  'HW_SECURE_ALL',
  'HW_SECURE_DECODE',
  'HW_SECURE_CRYPTO',
  'SW_SECURE_DECODE',
  'SW_SECURE_CRYPTO',
];

const FALLBACK_DRM_CAPABILITIES = {
  drmName: 'none',
  drmSecurity: 'none',
}

export async function requestMediaKeySystemAccess(drmMimeType, config) {
  try {
    return await navigator.requestMediaKeySystemAccess(drmMimeType, config);
  } catch {
    return null;
  } 
}

export function getDRMRobustnesses(drmName) {
  // NOTE: For drms other than widevine, [undefined] is returned voluntarily
  // for chromecast and playready drms
  return drmName === 'widevine' ? WIDEVINE_ROBUSTNESSES : [undefined];
}

export function getCencKeySystemConfigurations(drmName) {
  const videoCapabilities = [];
  const audioCapabilities = [];

  const robustnesses = getDRMRobustnesses(drmName);

  robustnesses.forEach((robustness) => {
    videoCapabilities.push({
      contentType: 'video/mp4;codecs="avc1.4d401e"', // standard mp4 codec
      robustness,
    });
    audioCapabilities.push({
      contentType: 'audio/mp4;codecs="mp4a.40.2"', // standard mp4 codec
      robustness,
    });
  });

  return [{
    initDataTypes: ['cenc'],
    videoCapabilities,
    audioCapabilities,
  }];
}

export function extractPlayreadyDrmInfoFromCapabilities(capabilities) {
  return {
    drmName: 'playready',
    drmSecurity: capabilities.keySystem.includes('hardware') ? 'hardware' : 'software',
  }
}

export function extractWidevineDrmInfoFromCapabilities(capabilities) {
  const config = capabilities.getConfiguration();
  const isHardware = config.videoCapabilities[0].robustness === 'HW_SECURE_ALL';

  return {
    drmName: 'widevine',
    drmSecurity: isHardware ? 'hardware' : 'software',
  }
}

export async function getWidevineCapabilites() {
  const config = await getCencKeySystemConfigurations('widevine');
  const ksAccess = await requestMediaKeySystemAccess('com.widevine.alpha', config);

  return ksAccess || null;
}

export async function getPlayreadyCapabilities() {
  for (let i = 0; i < PLAYREADY_DRM_MIME_TYPES.length; i += 1) {
    const config = await getCencKeySystemConfigurations('playready');
    const drmMimeType = PLAYREADY_DRM_MIME_TYPES[i];
    const ksAccess = await requestMediaKeySystemAccess(drmMimeType, config);

    if (ksAccess) return ksAccess;
  }

  return null;
}

export async function getFairplayCapabilities() {
  const MK = window.WebKitMediaKeys;
  const drm = 'com.apple.fps.1_0';
  const isFairplaySupported = MK && MK.isTypeSupported && MK.isTypeSupported(drm, 'video/mp4');

  if (!isFairplaySupported) return null;

  return {
    drmName: 'fairplay',
    drmSecurity: 'hardware',
  }
}

export async function getCencCapabilities() {
  const [playreadyCapabilities, widevineCapabilities]
    = await Promise.all([getPlayreadyCapabilities(), getWidevineCapabilites()]);

  if (playreadyCapabilities) {
    return extractPlayreadyDrmInfoFromCapabilities(playreadyCapabilities);
  } else if (widevineCapabilities) {
    return extractWidevineDrmInfoFromCapabilities(widevineCapabilities);
  }

  return null;
}

export async function getDrmCapabilities() {
  const fairplayCapabilities = await getFairplayCapabilities();

  if (fairplayCapabilities) return fairplayCapabilities;

  return await getCencCapabilities() || FALLBACK_DRM_CAPABILITIES;
}