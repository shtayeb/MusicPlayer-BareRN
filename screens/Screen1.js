import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, FONTS, SIZES } from "../constants/theme";
import tw from "tailwind-react-native-classnames";
import { StatusBar } from "expo-status-bar";
import { AppContext } from "../constants/AppContext";
import TrackPlyer from "react-native-track-player";

const Screen1 = () => {
  const navigation = useNavigation();
  const { playListSongs } = React.useContext(AppContext);
  return (
    <ScrollView style={{ backgroundColor: COLORS.black }}>
      <SafeAreaView>
        <StatusBar style="light" />
        {/* <Image
          source={playing.image}
          style={{
            width: SIZES.width,
            // height: SIZES.height,
            resizeMode: "cover",
            position: "absolute",
            flex: 1,
          }}
          blurRadius={12}
        /> */}
        {/* 1 */}
        <View style={tw`flex-row justify-between items-center pl-5 pr-5 pt-5`}>
          <TouchableOpacity onPress={() => navigation.navigate("Screen2")}>
            <Ionicons name="menu" size={25} color={COLORS.white} />
          </TouchableOpacity>
          <Image
            source={require("../assets/images/4.jpg")}
            style={{
              width: SIZES.largeTitle,
              height: SIZES.largeTitle,
              resizeMode: "cover",
              borderRadius: 13,
            }}
          />
        </View>

        {/* 2 */}
        <View style={tw`pl-5 pr-5`}>
          {/* <Text
            style={[
              {
                fontFamily: "Poppins-Bold",
                color: COLORS.white,
                ...FONTS.h1,
              },
              tw`mt-5`,
            ]}
          >
            Hello, Morning
          </Text>
          <Text style={[tw``, { color: COLORS.darkgray }]}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </Text> */}
          <View
            style={[
              tw`flex-row justify-between p-4 mt-5 `,
              {
                backgroundColor: "rgba(255,255,255,0.15)",
                borderRadius: 14,
                borderWidth: 0.2,
                borderColor: COLORS.lightGray4,
              },
            ]}
          >
            <TextInput
              placeholder="Looking for ..."
              placeholderTextColor={COLORS.darkgray}
              style={{
                fontFamily: "Poppins-Medium",
                flex: 1,
                color: COLORS.white,
              }}
            />
            <Ionicons name="search" size={25} color={COLORS.white} />
          </View>
        </View>
        {/* 3 */}
        <View>
          <Text
            style={[
              {
                color: COLORS.white,
                fontFamily: "Poppins-Bold",
                ...FONTS.h2,
              },
              tw`pl-5 mt-5`,
            ]}
          >
            Popular Playlist
          </Text>
        </View>

        {/* the playlists */}
        <FlatList
          data={[{ id: "Test" }, ...playListSongs]}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          contentContainerStyle={[tw`mt-5`]}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            if (!item.title) {
              return <View style={tw`pr-5`}></View>;
            }

            return (
              <View
                style={[
                  tw`mr-5 pb-4`,
                  {
                    width: SIZES.width * 0.75,
                    backgroundColor: "rgba(255,255,255,0.1)",
                    // justifyContent: "center",
                    borderRadius: 13,
                    // alignItems: "center",
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Screen3", { item })}
                >
                  <View>
                    <Image
                      // source={{ uri: item.songs[0].cover }}
                      source={
                        !item.songs[0]
                          ? require("../assets/images/2.jpg")
                          : item.songs[0].cover
                          ? { uri: item.songs[0].cover }
                          : require("../assets/images/2.jpg")
                      }
                      style={{
                        width: SIZES.width * 0.75,
                        height: 180,
                        borderRadius: 13,
                        // position: "absolute",
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={tw`flex-row justify-between items-center pl-5 pr-5 pt-3`}
                >
                  <View>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontWeight: "bold",
                        fontFamily: "Poppins-Bold",
                        fontSize: 18,
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text style={{ color: COLORS.darkgray, fontSize: 13 }}>
                      {item.songs[0] ? item.songs[0].title : "No Sub"}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => TrackPlyer.add(item.songs)}>
                    <View
                      style={[
                        { backgroundColor: COLORS.orange, borderRadius: 50 },
                        tw`p-2 `,
                      ]}
                    >
                      <Ionicons name="play" size={25} color={COLORS.white} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />

        {/* 4 */}
        <View>
          <Text
            style={[
              {
                color: COLORS.white,
                fontFamily: "Poppins-Bold",
                ...FONTS.h2,
              },
              tw`pl-5 mt-5`,
            ]}
          >
            Recently Played
          </Text>
        </View>
        <ScrollView horizontal style={[tw`mt-5`]}>
          {/* a */}
          <View style={tw`pr-5`}></View>
          <View
            style={[
              tw`mr-5 pb-4`,
              {
                width: SIZES.width * 0.3,
                backgroundColor: "rgba(255,255,255,0.1)",
                // justifyContent: "center",
                borderRadius: 13,
                // alignItems: "center",
              },
            ]}
          >
            <View>
              <Image
                source={require("../assets/images/2.jpg")}
                style={{
                  width: SIZES.width * 0.3,
                  height: 120,
                  borderRadius: 13,
                  // position: "absolute",
                }}
              />
            </View>

            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                fontFamily: "Poppins-Bold",
                // fontSize: 18,
                textAlign: "center",
              }}
            >
              Evolve
            </Text>
          </View>
        </ScrollView>
        <View style={{ height: 120 }}></View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Screen1;

const styles = StyleSheet.create({});
