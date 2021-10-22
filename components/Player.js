import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState,
} from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  // ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
// import { AppContext } from "../constants/AppContext";
import { COLORS, SIZES } from "../constants/theme";

import TrackPlayer, {
  Event,
  State,
  useProgress,
  useTrackPlayerEvents,
  RepeatMode,
} from "react-native-track-player";

import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Slider from "@react-native-community/slider";

import ExpandableView from "@pietile-native-kit/expandable-view";

const Player = () => {
  // const { playing } = React.useContext(AppContext);

  const [playing, setPlaying] = useState({});
  const progress = useProgress();

  let Songtitle = "No Title";

  if (playing.title) {
    if (playing.title.length > 23) {
      Songtitle = playing.title.substring(0, 23) + "...";
    } else {
      Songtitle = playing.title;
    }
  } else {
    if (playing.fileName) {
      if (playing.fileName.length > 23) {
        Songtitle = playing.fileName.substring(0, 23) + "...";
      } else {
        Songtitle = playing.fileName;
      }
    }
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setPlaying(track);
    }
  });
  useTrackPlayerEvents([Event.RemoteNext], async (event) => {
    if (event.type === Event.RemoteNext) {
      await TrackPlayer.skipToNext();
    }
  });
  useTrackPlayerEvents([Event.RemotePrevious], async (event) => {
    if (event.type === Event.RemotePrevious) {
      await TrackPlayer.skipToPrevious();
    }
  });
  useTrackPlayerEvents([Event.RemotePause], async (event) => {
    if (event.type === Event.RemotePause) {
      await TrackPlayer.pause();
    }
  });
  useTrackPlayerEvents([Event.RemotePlay], async (event) => {
    if (event.type === Event.RemotePlay) {
      await TrackPlayer.play();
    }
  });
  useTrackPlayerEvents([Event.RemoteStop], async (event) => {
    if (event.type === Event.RemoteStop) {
      await TrackPlayer.destroy();
    }
  });

  const [iconName, setIconName] = React.useState("play");
  const [isLow, setIsLow] = useState(true);
  const [isMedium, setIsMedium] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const [repeatMode, setRepeatMode] = useState("off");

  const repeatIcon = () => {
    if (repeatMode === "off") {
      return "repeat-off";
    }
    if (repeatMode === "track") {
      return "repeat-once";
    }
    if (repeatMode === "repeat") {
      return "repeat";
    }
  };

  const changeRepeatMode = () => {
    if (repeatMode === "off") {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setRepeatMode("track");
    }
    if (repeatMode === "track") {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);

      setRepeatMode("repeat");
    }
    if (repeatMode === "repeat") {
      TrackPlayer.setRepeatMode(RepeatMode.Off);

      setRepeatMode("off");
    }
  };

  // hooks
  const sheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["17%", "45%", "100%"], []);

  // callbacks
  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
    if (index == 2) {
      setIsFull(true);
      setIsLow(false);
      setIsMedium(false);
    }
    if (index == 1) {
      setIsMedium(true);
      setIsFull(false);
      setIsLow(false);
    }
    if (index == 0) {
      setIsLow(true);
      setIsFull(false);
      setIsMedium(false);
    }
  }, []);
  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const handlePlayButton = async () => {
    const state = await TrackPlayer.getState();

    if (state === State.Playing) {
      TrackPlayer.pause();
      setIconName("play");
    }
    if (state === State.Paused) {
      TrackPlayer.play();
      setIconName("pause");
    }
  };

  const renderPlayControls = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 28,
          paddingVertical: 10,
          // backgroundColor: "rgba(1, 1, 55, 0.3)",
          // borderTopRightRadius: RADIUS_PLAYER,
          // borderTopLeftRadius: RADIUS_PLAYER,
          height: 82,
        }}
      >
        {playing.cover ? (
          <Image
            source={{ uri: playing.cover }}
            style={{ width: 35, height: 35 }}
          />
        ) : (
          <Ionicons
            name="musical-note-outline"
            size={40}
            style={{
              borderWidth: 1,
              borderColor: COLORS.darkgray,
              padding: 3,
            }}
            color={COLORS.darkgray}
          />
        )}

        <TouchableOpacity onPress={() => TrackPlayer.skipToPrevious()}>
          <Ionicons
            name="play-skip-back-outline"
            size={25}
            color={COLORS.white}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            {
              backgroundColor: COLORS.orange,
              borderRadius: 50,
            },
            tw`p-3`,
          ]}
          onPress={handlePlayButton}
        >
          <Ionicons name={iconName} size={40} color={COLORS.white} />
          {/* <Ionicons name="pause" size={40} color={COLORS.black} /> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => TrackPlayer.skipToNext()}>
          <Ionicons
            name="play-skip-forward-outline"
            size={25}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={changeRepeatMode}>
          <MaterialCommunityIcons
            name={`${repeatIcon()}`}
            size={25}
            color={repeatMode !== "off" ? COLORS.orange : COLORS.white}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderProgress = () => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
          // paddingVertical: SIZES.height * 0.06,
          height: SIZES.height * 0.11,
        }}
      >
        <Slider
          style={{ width: SIZES.width - 18, alignSelf: "center" }}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor={COLORS.orange}
          minimumTrackTintColor={COLORS.orange}
          maximumTrackTintColor={COLORS.white}
          tapToSeek={true}
          onValueChange={(value) => TrackPlayer.seekTo(value)}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 8,
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: COLORS.white, fontFamily: "Poppins-Regular" }}>
            {new Date(progress.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={{ color: COLORS.white, fontFamily: "Poppins-Regular" }}>
            {new Date((progress.duration - progress.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>
      </View>
    );
  };

  const renderFullPlayer = () => {
    return (
      <View style={{ marginTop: SIZES.height * 0.05 }}>
        {playing.cover ? (
          <Image
            source={{ uri: playing.cover }}
            style={{
              width: SIZES.width * 0.85,
              height: SIZES.height * 0.4,
              alignSelf: "center",
              borderRadius: 14,
              marginBottom: 25,
            }}
          />
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.darkgray,
              padding: 3,
              width: SIZES.width * 0.85,
              height: SIZES.height * 0.4,
              alignSelf: "center",
              borderRadius: 14,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="musical-note-outline"
              size={50}
              style={{ alignSelf: "center" }}
              color={COLORS.darkgray}
            />
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // paddingVertical: SIZES.height * 0.05,
            paddingHorizontal: 20,
            height: SIZES.height * 0.15,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 18,
                color: COLORS.white,
              }}
            >
              {playing.author ? playing.author : "No Author"}
            </Text>
            <Text
              style={{ fontFamily: "Poppins-Medium", color: COLORS.darkgray }}
            >
              {/* {playing.title ? playing.title : "No Title"} */}
              {Songtitle}
            </Text>
          </View>
          <Ionicons name="heart-outline" size={30} color={COLORS.white} />
        </View>

        {renderProgress()}
        {renderPlayControls()}
      </View>
    );
  };

  const renderMediumPlayer = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {playing.cover ? (
            <Image
              source={{ uri: playing.cover }}
              style={{
                width: SIZES.width * 0.3,
                height: SIZES.height * 0.13,
                // alignSelf: "center",
                borderRadius: 14,
                marginBottom: 25,
              }}
            />
          ) : (
            <View
              style={{
                borderWidth: 1,
                borderColor: COLORS.darkgray,
                padding: 3,
                width: SIZES.width * 0.3,
                height: SIZES.height * 0.13,
                // alignSelf: "center",
                borderRadius: 14,
                // alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 25,
                marginBottom: 5,
              }}
            >
              <Ionicons
                name="musical-note-outline"
                size={50}
                style={{ alignSelf: "center" }}
                color={COLORS.darkgray}
              />
            </View>
          )}
          <View style={{ marginHorizontal: 25 }}>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 18,
                color: COLORS.white,
              }}
            >
              {playing.author ? playing.author : "No Author"}
            </Text>
            <Text
              style={{ fontFamily: "Poppins-Medium", color: COLORS.darkgray }}
            >
              {/* {playing.title ? playing.title : "No Title"} */}
              {Songtitle}
            </Text>
          </View>
        </View>
        <View>{renderProgress()}</View>
        {renderPlayControls()}
      </View>
    );
  };

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      backgroundStyle={{
        // backgroundColor: "rgba(1,1,1,0.97)",
        backgroundColor: COLORS.black,
      }}
      handleIndicatorStyle={{ color: "red", borderColor: "red" }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {/* <ExpandableView show={isLow}>{renderPlayControls()}</ExpandableView> */}
        <ExpandableView show={isFull}>{renderFullPlayer()}</ExpandableView>
        <ExpandableView show={isMedium}>{renderMediumPlayer()}</ExpandableView>
        {isLow && renderPlayControls()}
        {/* {isFull && renderFullPlayer()} */}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default Player;

const styles = StyleSheet.create({});
