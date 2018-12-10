// All drm mimeType associated to the playready drm
// This list is ordered from more secure to less secure
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
// This list is ordered from more secure to less secure
const WIDEVINE_ROBUSTNESSES = [
  'HW_SECURE_ALL',
  'HW_SECURE_DECODE',
  'HW_SECURE_CRYPTO',
  'SW_SECURE_DECODE',
  'SW_SECURE_CRYPTO',
];

// Existing HDCP levels
// This list is ordered from more secure to less secure
const HDCP_LEVELS = [
  'hdcp-2.3',
  'hdcp-2.2',
  'hdcp-2.1',
  'hdcp-2.0',
  'hdcp-1.4',
  'hdcp-1.3',
  'hdcp-1.2',
  'hdcp-1.1',
  'hdcp-1.0',
];

// Drm attributes if drm detection fails
const FALLBACK_DRM_INFOS = {
  drmName: 'none',
  drmSecurity: 'none',
  hdcpLevel: 'Unable to detect',
}
/**
 * RequestMediaKeySystemAccess with try catch logic
 * @export
 * @param {string} drmMimeType
 * @param {array} config
 * @returns {?object} mediaKeySystemAccess
 */
export async function requestMediaKeySystemAccess(drmMimeType, config) {
  try {
    return await navigator.requestMediaKeySystemAccess(drmMimeType, config);
  } catch {
    return null;
  } 
}
/**
 * Returns supported hdcp level if api is available
 * @export
 * @param {object} mediaKeys
 * @returns {?string} hdcpLevel
 */
export async function getHdcpLevelFromMediaKeys(mediaKeys) {
  if (!('getStatusForPolicy' in mediaKeys)) return 'Unable to detect';

  for (let i = 0; i < HDCP_LEVELS.length; i += 1) {
    const hdcpLevel = HDCP_LEVELS[i];

    try {
      const status = await mediaKeys.getStatusForPolicy({ minHdcpVersion: hdcpLevel });

      if (status === 'usable') {
        return hdcpLevel;
      }
    } catch (e) {
      console.warn(`Error while detecting support for hdcp version: ${hdcpLevel}`, e);
    }
  }

  return 'none';
}

/**
 * Returns drm robustness list if appliable
 * @export
 * @param {string} drmName
 * @returns {array} robustnesses
 */
export function getDRMRobustnesses(drmName) {
  // NOTE: For drms other than widevine, [undefined] is returned voluntarily
  // for chromecast and playready drms
  return drmName === 'widevine' ? WIDEVINE_ROBUSTNESSES : [undefined];
}

/**
 * Builds up the drm config object to be passed to requestMediaKeySystemAccess
 * @export
 * @param {string} drmName
 * @returns {array<object>} keySystemConfiguration
 */
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

/**
 * Extract meaningful infos from detected playready drm capabilities
 * @export
 * @param {object} capabilities
 * @returns {object} drmInfo
 */
export function extractPlayreadyDrmInfoFromCapabilities(capabilities) {
  return {
    drmName: 'playready',
    drmSecurity: capabilities.keySystem.includes('hardware') ? 'hardware' : 'software',
    hdcpLevel: capabilities.hdcpLevel,
  }
}

/**
 * Extract meaningful infos from detected widevine drm capabilities
 * @export
 * @param {object} capabilities
 * @returns {object} drmInfo
 */
export function extractWidevineDrmInfoFromCapabilities(capabilities) {
  const isHardware = capabilities.videoCapabilities[0].robustness === 'HW_SECURE_ALL';

  return {
    drmName: 'widevine',
    drmSecurity: isHardware ? 'hardware' : 'software',
    hdcpLevel: capabilities.hdcpLevel,
  }
}

/**
 * Get widevine capabilities
 * @export
 * @returns {object} capabilites
 */
export async function getWidevineCapabilites() {
  const config = await getCencKeySystemConfigurations('widevine');
  const ksAccess = await requestMediaKeySystemAccess('com.widevine.alpha', config);
  
  if (!ksAccess) return null;

  const mediaKeys = await ksAccess.createMediaKeys();
  const hdcpLevel = await getHdcpLevelFromMediaKeys(mediaKeys);

  return { ...ksAccess, ...ksAccess.getConfiguration(), hdcpLevel };
}

/**
 * Get playready capabilities
 * @export
 * @returns {object} capabilites
 */
export async function getPlayreadyCapabilities() {
  for (let i = 0; i < PLAYREADY_DRM_MIME_TYPES.length; i += 1) {
    const config = await getCencKeySystemConfigurations('playready');
    const drmMimeType = PLAYREADY_DRM_MIME_TYPES[i];
    const ksAccess = await requestMediaKeySystemAccess(drmMimeType, config);

    if (ksAccess) {
      const mediaKeys = await ksAccess.createMediaKeys();
      const hdcpLevel = await getHdcpLevelFromMediaKeys(mediaKeys);

      return { ...ksAccess, ...ksAccess.getConfiguration(), hdcpLevel };
    }
  }

  return null;
}

/**
 * Get fairplay info
 * @export
 * @returns {object} drmInfo
 */
export async function getFairplayInfos() {
  const MK = window.WebKitMediaKeys;
  const drm = 'com.apple.fps.1_0';
  const isFairplaySupported = MK && MK.isTypeSupported && MK.isTypeSupported(drm, 'video/mp4');

  if (!isFairplaySupported) return null;

  return {
    drmName: 'fairplay',
    drmSecurity: 'hardware',
    hdcpLevel: 'Unable to detect',
  }
}

/**
 * Get Cenc Info
 * @export
 * @returns {object} drmInfo
 */
export async function getCencInfos() {
  const [playreadyCapabilities, widevineCapabilities]
    = await Promise.all([getPlayreadyCapabilities(), getWidevineCapabilites()]);

  if (playreadyCapabilities) {
    return extractPlayreadyDrmInfoFromCapabilities(playreadyCapabilities);
  } else if (widevineCapabilities) {
    return extractWidevineDrmInfoFromCapabilities(widevineCapabilities);
  }

  return null;
}

/**
 * Get Drm Info
 * @export
 * @returns {object} drm capabilites
 */
export async function getDrmInfos() {
  const fairplayInfos = await getFairplayInfos();

  if (fairplayInfos) return fairplayInfos;

  return await getCencInfos() || FALLBACK_DRM_INFOS;
}