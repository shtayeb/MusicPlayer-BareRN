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
import { COLORS, SIZES } from "../constants/theme";

const Songs = [
  {
    id: "1",
    name: "Good Music",
    image: require("../assets/images/4.jpg"),
    sub: "Imagine Dragons",
  },
  {
    id: "2",
    name: "New Music",
    image: require("../assets/images/2.jpg"),
    sub: "Imagine Dragons",
  },
  {
    id: "3",
    name: "Good Music",
    image: require("../assets/images/6.jpg"),
    sub: "Imagine Dragons",
  },
  {
    id: "4",
    name: "Good Music",
    image: require("../assets/images/1.jpg"),
    sub: "Imagine Dragons",
  },

  { id: "222" },
];

const Screen3 = (props) => {
  const navigation = useNavigation();

  const playlist = props.route.params.item;

  return (
    <SafeAreaView>
      {/* back button */}
      <StatusBar
        translucent={true}
        style="dark"
        backgroundColor="transparent"
      />
      {/* the list */}
      <FlatList
        data={Songs}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => {
          return (
            <ImageBackground
              source={playlist.image}
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
                  color="white"
                  style={[tw`pl-5 pt-5`]}
                />
              </TouchableOpacity>
              <View style={[tw`pl-5 pb-5 `]}>
                <View>
                  <Text
                    style={[
                      tw`text-white text-lg`,
                      { fontFamily: "Poppins-Medium" },
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
