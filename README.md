# react-native-webrtc-minimal

The most basic local-only implementation of react-native-webrtc possible.

- Start/Stop video call.
- Switch Video source before and during calls
- Mute/Unmute audio
- Uses functional components and React Native 0.61+ (for .62 see [#8](https://github.com/baconcheese113/react-native-webrtc-minimal/pull/8))
- Uses Hermes instead of the full Javascript engine

## Usage

- Clone the repository, run `npm install`.
- For Android, [connect your phone](https://facebook.github.io/react-native/docs/running-on-device) run `npm run android` in the directory.
- For iOS, [consult a doctor](https://facebook.github.io/react-native/blog/2019/11/18/react-native-doctor#try-it-now), `cd ios && pod install`, and finally `npm run ios`. **Note that iOS simulator doesn't support camera**
- Profit

## Next Steps

- **This repo is purposefully built for simple local-only calls. Not to demonstrate multiple devices, signalling servers, Janus integrations, etc...** But you can start here to understand the basics of react-native-webrtc. For more advanced things, try searching the posts in [the official discourse group](https://react-native-webrtc.discourse.group/)


## Trouble Shooting

I am adding this in June 2020, I am on Windows so this might be behaving differently for other OS's 

- try using LTS, as of 06/20 it works with Node 12 (specifically v12.18.1)
- if actually on Node v12.18.1 make sure you fixed [this bug they had](https://stackoverflow.com/questions/58120990/how-to-resolve-the-error-on-react-native-start)
- change the gradle to 6.3 if running into problems that might help, I couldn't build without that. see [here](https://stackoverflow.com/questions/35000729/android-studio-could-not-initialize-class-org-codehaus-groovy-runtime-invokerhel) for refference 
