# Video Capabilities Detector

Eager to know about your device video capabilities ? Just checkout [this page](https://gbentaieb.github.io/video-capabilities-detector/) !!

## Introduction
It can be difficult to know what are the video capabilities of your device. Some of the questions you might have are:
  - Is my device able to play protected content ?
  - Does my device have a robust drm implementation ?
  - Does my device support hdcp ?
  - What codecs are supported by my device ?
  - What video quality can I expect to get with my device
  - What is the best navigator to use with my device to get the best video quality
  - ...

This very simple app aims to answer all of those questions and more !

## How do we determine the capabilities of your device
To determine the capabilities of your device, we use the appropriate native js APIs provided by the browsers. This includes (but is not restricted to):

- navigator.requestMediaKeySystemAccess : for drm support in Chrome, Edge/IE, Firefox (W3C standard api)

- window.WebKitMediaKeys : for drm support in Safari (webkit api)

- mediaKeys.getStatusForPolicy : for hdcp detection (W3C standard api)

- MSMediaKeys.isTypeSupportedWithFeature: for hdcp detection in Edge/IE (Microsoft api)

- HTMLMediaElement.canPlayType() : for codec support (W3C standard api)

## DEMO
This demo is hosted [this page](https://gbentaieb.github.io/video-capabilities-detector/)