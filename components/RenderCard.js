import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState, useContext } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { AppContext } from "../constants/AppContext";
import { COLORS, SIZES } from "../constants/theme";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import { useNavigation } from "@react-navigation/core";

const RenderCard = ({ item, play }) => {
  const [visible, setVisible] = useState(false);
  if (!item.fileName) {
    return <View style={{ height: 250, marginBottom: 120 }}></View>;
  }
  // const { addSongToPlaylist } = useContext(AppContext);
  const navigation = useNavigation();

  let Songtitle = "No Title";
  if (item.title) {
    if (item.title.length > 23) {
      Songtitle = item.title.substring(0, 23) + "...";
    } else {
      Songtitle = item.title;
    }
  } else {
    if (item.fileName.length > 23) {
      Songtitle = item.fileName.substring(0, 23) + "...";
    } else {
      Songtitle = item.fileName;
    }
  }

  return (
    <>
      <Menu
        visible={visible}
        anchor={<Text onPress={() => setVisible(true)}>Show menu</Text>}
        onRequestClose={() => setVisible(false)}
        style={{
          marginLeft: SIZES.width - SIZES.width * 0.6,
          width: SIZES.width * 0.5,
          marginTop: 20,
          // marginBottom: 10,
        }}
      >
        <MenuItem onPress={() => setVisible(false)}>
          <Text style={{ fontFamily: "Poppins-Regular" }}>Play</Text>
        </MenuItem>
        <MenuDivider />
        <MenuItem
          onPress={() => {
            setVisible(false);
            // handlePresentModalPress();
            navigation.navigate("AddPlaylists", { item });
          }}
        >
          <Text style={{ fontFamily: "Poppins-Regular" }}>Add to Playlist</Text>
        </MenuItem>
      </Menu>

      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            // backgroundColor: "rgba(1,1,1,0.1)",
            borderRadius: 20,
          },
          tw`pr-5 pl-5`,
          // playing.id == item.id && styles.playing,
        ]}
      >
        {/* icon */}
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => {
            play(item);
          }}
        >
          {item.cover ? (
            <Image
              source={{ uri: item.cover }}
              style={{
                width: 65,
                height: 68,
                borderRadius: 9,
              }}
            />
          ) : (
            <View
              style={{
                width: 65,
                height: 68,
                borderRadius: 9,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="musical-notes-outline"
                size={40}
                color={COLORS.white}
              />
            </View>
          )}

          {/* middle Part */}
          <View style={{ marginLeft: 15 }}>
            <Text style={{ color: COLORS.secondary }}>
              {(item.duration / 1000 / 60).toPrecision(3)} min
            </Text>
            <Text
              style={{
                // fontWeight: "900",
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                color: COLORS.lightGray,
              }}
            >
              {Songtitle}
            </Text>
            <Text style={{ color: COLORS.secondary }}>
              {item.author ? item.author : "No Author"}
            </Text>
          </View>
        </TouchableOpacity>
        {/* the end */}
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
        >
          <Entypo name="dots-three-horizontal" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RenderCard;

const styles = StyleSheet.create({
  playing: {
    backgroundColor: "rgba(163, 23, 51, 0.08)",
    padding: 14,
  },
});
