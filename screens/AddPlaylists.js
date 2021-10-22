import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../constants/AppContext";
import { COLORS } from "../constants/theme";

const AddPlaylists = (props) => {
  const navigation = useNavigation();
  const song = props.route.params.item;
  const { playlists, addSongToPlaylist, addSongToDB } = useContext(AppContext);

  const handleAdd = () => {
    // playlist liked id = 1
    console.log("add");
    // add song to the db table(songs)
    addSongToDB(song);
    addSongToPlaylist(1, song.url);
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.black, flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={25} color={COLORS.white} />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.white,
            fontFamily: "Poppins-Medium",
            marginLeft: 20,
          }}
        >
          Back
        </Text>
      </View>
      <FlatList
        data={playlists}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={handleAdd}
              style={{
                backgroundColor: "rgba(255,255,255,0.5)",
                marginVertical: 5,
                padding: 10,
                marginHorizontal: 25,
                borderRadius: 13,
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontFamily: "Poppins-Medium",
                  marginLeft: 20,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default AddPlaylists;
