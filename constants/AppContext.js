import React, { Component } from "react";
import { Alert, ToastAndroid } from "react-native";

const AppContext = React.createContext();
import TrackPlayer, { Capability, state } from "react-native-track-player";

class AppProvider extends Component {
  state = {
    playing: {
      id: "4",
      name: "Good Music",
      image: require("../assets/images/1.jpg"),
      sub: "Imagine Dragons",
    },
    test: "fadsf",
  };

  componentDidMount() {
    console.log(this.state.test);
    this.setupPlayer();
    // this.getPlaying();
  }

  setupPlayer = async () => {
    await TrackPlayer.setupPlayer({ autoUpdateMetadata: true });
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
      color: "blue",
    });
    TrackPlayer.registerPlaybackService(() => require("./service"));
  };

  // addTrackToPlayer = async (tracks) => {
  //   await TrackPlayer.add(tracks);
  // };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          // addTrackToPlayer: this.addTrackToPlayer,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppProvider, AppConsumer, AppContext };
