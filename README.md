# react-native-webrtc-minimal

The most basic local-only implementation of react-native-webrtc possible.

- Start/Stop video call.
- Switch Video source before and during calls
- Mute/Unmute audio
- Uses functional components and React Native 0.63+
- ~~Uses Hermes instead of the full Javascript engine~~

## Usage

- Clone the repository, run `npm install`.
- For Android, [connect your phone](https://facebook.github.io/react-native/docs/running-on-device) run `npm run android` in the directory.
- For iOS, [consult a doctor](https://facebook.github.io/react-native/blog/2019/11/18/react-native-doctor#try-it-now), `cd ios && pod install`, and finally `npm run ios`. **Note that iOS simulator doesn't support camera**
- Profit

## Next Steps

- **This repo is purposefully built for simple local-only calls. Not to demonstrate multiple devices, signalling servers, Janus integrations, etc...** But you can start here to understand the basics of react-native-webrtc. For more advanced things, try searching the posts in [the official discourse group](https://react-native-webrtc.discourse.group/)
