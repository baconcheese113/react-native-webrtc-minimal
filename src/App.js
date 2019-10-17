/**
 * @format
 * @flow
 */

import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
} from 'react-native-webrtc';

export default function App() {
  const [localStream, setLocalStream] = React.useState();
  const [remoteStream, setRemoteStream] = React.useState();
  const [cachedLocalPC, setCachedLocalPC] = React.useState();
  const [cachedRemotePC, setCachedRemotePC] = React.useState();

  const setLocalStreamsUp = async () => {
    const isFront = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFront ? 'front' : 'back';
    const videoSourceId = devices.find(
      device => device.kind === 'videoinput' && device.facing === facing,
    );
    const facingMode = isFront ? 'user' : 'environment';
    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode,
        optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
      },
    };
    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);

    const configuration = {iceServers: [{url: 'stun:stun.l.google.com:19302'}]};
    const localPC = new RTCPeerConnection(configuration);
    const remotePC = new RTCPeerConnection(configuration);
    localPC.addEventListener('icecandidate', e => {
      try {
        console.log(`localPC icecandidate:`);
        console.log(e.candidate);
        console.log(remotePC);
        if (e.candidate) {
          remotePC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding remotePC iceCandidate: ${err}`);
      }
    });
    remotePC.addEventListener('icecandidate', e => {
      try {
        console.log(`remotePC icecandidate:`);
        console.log(e.candidate);
        console.log(localPC);
        if (e.candidate) {
          localPC.addIceCandidate(e.candidate);
        }
      } catch (err) {
        console.error(`Error adding localPC iceCandidate: ${err}`);
      }
    });
    remotePC.addEventListener('addstream', e => {
      console.log('remotePC tracking with ', e);
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream', e.stream);
        setRemoteStream(e.stream);
      }
    };

    // AddTrack not supported yet
    // newStream.getTracks().forEach(track => localPC.addTrack(track, newStream));
    localPC.addStream(newStream);
    try {
      const offer = await localPC.createOffer();
      console.log('Offer from localPC, setLocalDescription');
      await localPC.setLocalDescription(offer);
      console.log('remotePC, setRemoteDescription');
      await remotePC.setRemoteDescription(localPC.localDescription);
      console.log('RemotePC, createAnswer');
      const answer = await remotePC.createAnswer();
      console.log(`Answer from remotePC: ${answer.sdp}`);
      console.log('remotePC, setLocalDescription');
      await remotePC.setLocalDescription(answer);
      console.log('localPC, setRemoteDescription');
      await localPC.setRemoteDescription(remotePC.localDescription);
    } catch (err) {
      console.error(err);
    }
    setCachedLocalPC(localPC);
    setCachedRemotePC(remotePC);
  };

  const closeStreams = () => {
    if (cachedLocalPC) {
      cachedLocalPC.close();
    }
    if (cachedRemotePC) {
      cachedRemotePC.close();
    }
  };

  return (
    <View>
      <Text style={styles.text}>{`Stream is ${
        localStream ? 'Defined' : 'not defined'
      }`}</Text>
      <Button title="Click to start stream" onPress={setLocalStreamsUp} />
      <View style={styles.rtcview}>
        {localStream && (
          <RTCView style={styles.rtc} streamURL={localStream.toURL()} />
        )}
      </View>
      <View style={styles.rtcview}>
        {remoteStream && (
          <RTCView style={styles.rtc} streamURL={remoteStream.toURL()} />
        )}
      </View>
      <Button title="Click to stop call" onPress={closeStreams} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  rtcview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: '80%',
    margin: 10,
    backgroundColor: 'black',
  },
  rtc: {
    width: '80%',
    height: 150,
  },
});
