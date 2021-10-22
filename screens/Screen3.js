import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";
import RenderCard from "../components/RenderCard";
import { AppContext } from "../constants/AppContext";
import { COLORS, SIZES } from "../constants/theme";

import TrackPlyer from "react-native-track-player";

const Screen3 = (props) => {
  const navigation = useNavigation();

  const playlist = props.route.params.item;

  // const { likedSongs } = useContext(AppContext);

  // useEffect(() => {

  // }, [likedSongs]);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      {/* back button */}
      <StatusBar
        translucent={true}
        style="light"
        backgroundColor="transparent"
      />
      {/* the list */}
      <FlatList
        data={[...playlist.songs, { url: "asdfasd" }]}
        keyExtractor={(item) => `${item.url}`}
        ListHeaderComponent={({ item }) => {
          return (
            <ImageBackground
              source={
                !playlist.songs[0]
                  ? require("../assets/images/2.jpg")
                  : playlist.songs[0].cover
                  ? { uri: playlist.songs[0].cover }
                  : require("../assets/images/2.jpg")
              }
              style={[
                {
                  marginVertical: 5,
                  alignSelf: "center",
                  width: SIZES.width,
                  height: SIZES.height * 0.4,
                  justifyContent: "space-between",
                },
              ]}
              imageStyle={{ width: SIZES.width, height: SIZES.height * 0.4 }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back"
                  size={30}
                  color={COLORS.white}
                  style={[tw`pl-5 pt-5`]}
                />
              </TouchableOpacity>
              <View style={[tw`pl-5 pb-5 `]}>
                <View>
                  <Text
                    style={[
                      tw`text-lg`,
                      { color: COLORS.white, fontFamily: "Poppins-Medium" },
                    ]}
                  >
                    Hello this is the song
                  </Text>
                  <Text
                    style={[
                      tw`text-white text-sm`,
                      { fontFamily: "Poppins-Regular" },
                    ]}
                  >
                    Name
                  </Text>
                  <View style={tw`flex-row justify-between items-center pr-5`}>
                    <Text
                      style={[
                        tw`text-white text-sm`,
                        {
                          fontFamily: "Poppins-Regular",
                          color: COLORS.darkgray,
                        },
                      ]}
                    >
                      3 hr 36 min 50 Songs
                    </Text>
                    <TouchableOpacity
                      onPress={() => TrackPlyer.add(playlist.songs)}
                      style={[
                        {
                          backgroundColor: COLORS.orange,
                          borderRadius: 50,
                          marginBottom: -50,
                        },
                        tw`p-5 `,
                      ]}
                    >
                      <Ionicons name="play" size={25} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          );
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return <RenderCard item={item} />;
        }}
      />
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Screen3;

const styles = StyleSheet.create({});
