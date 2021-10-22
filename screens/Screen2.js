import React, {
  // useContext,
  useState,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../constants/theme";
import { useNavigation } from "@react-navigation/core";
import { StatusBar } from "expo-status-bar";
import tw from "tailwind-react-native-classnames";
import RenderCard from "../components/RenderCard";

import MusicFiles from "react-native-get-music-files";
import { AppContext } from "../constants/AppContext";
import TrackPlayer from "react-native-track-player";

// import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";

const Screen2 = () => {
  const navigation = useNavigation();

  // const [selectedOp, setSelectedOp] = useState("All");
  const [Songs, setSongs] = useState([]);

  // const [visible, setVisible] = useState(false);

  React.useEffect(() => {
    MusicFiles.getAll({
      blured: false, // works only when 'cover' is set to true
      artist: true,
      duration: true, //default : true
      cover: true, //default : true,
      genre: true,
      title: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
      fields: ["title", "albumTitle", "genre", "lyrics", "artwork", "duration"], // for iOs Version
    })
      .then((tracks) => {
        // do your stuff...
        console.log(tracks[0]);
        setSongs([...tracks, { duration: "233" }]);
        // console.log("1");
      })
      .catch((error) => {
        // catch the error
        console.log(error);
        console.log("2");
      });
  }, []);

  // const { addTrackToPlayer } = React.useContext(AppContext);

  // const prepareSongs = () => {
  //   try {
  //     let newSongs = [];
  //     Songs.forEach((element) => {
  //       if (element.fileName) {
  //         // newSongs.push({ ...element, url: "file://" + element.path });
  //         newSongs.push({ ...element, url: element.path });
  //       }
  //     });
  //     return Promise.resolve(newSongs);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handlePlay = async (song) => {
    // const data = await prepareSongs();
    // console.log(data);
    // addTrackToPlayer(data);
    // Songs.pop();
    // console.log(data);

    await TrackPlayer.add(Songs);

    await TrackPlayer.play();
  };

  return (
    <SafeAreaView>
      {/* back button */}
      <StatusBar
        style="light"
        translucent={true}
        backgroundColor={COLORS.black}
      />

      {/* The Menues */}
      <View
        style={{
          width: SIZES.width,
          height: SIZES.height * 0.1,
          backgroundColor: COLORS.black,
        }}
      >
        <View style={tw`flex-row justify-between items-center pl-5 pr-5 pt-5`}>
          <TouchableOpacity onPress={() => navigation.navigate("Screen1")}>
            <Text style={[tw`font-bold text-xl`, { color: COLORS.white }]}>
              Home
            </Text>
          </TouchableOpacity>
          <View style={tw`flex-row items-center`}>
            <Ionicons
              style={tw`mr-2`}
              name="search"
              size={25}
              color={COLORS.white}
            />
            <Ionicons style={tw``} name="menu" size={25} color={COLORS.white} />
          </View>
        </View>

        {/* 2 */}
        {/* <View
          style={tw`flex-row justify-around items-center pl-5 pr-5 pt-5 mt-5`}
        >
          <TouchableOpacity
            style={selectedOp == "All" && styles.selectedOp}
            onPress={() => setSelectedOp("All")}
          >
            <Text style={[tw`font-bold text-base`, { color: COLORS.white }]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedOp == "Folders" && styles.selectedOp}
            onPress={() => setSelectedOp("Folders")}
          >
            <Text style={[tw`font-bold text-base`, { color: COLORS.white }]}>
              Folders
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* the list */}
      <View style={tw`pt-1 bg-black`}>
        <FlatList
          data={Songs}
          keyExtractor={(item) => item.duration}
          renderItem={({ item }) => {
            return (
              <RenderCard
                item={item}
                play={handlePlay}
                // menuSwitch={setVisible}
              />
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View style={{ backgroundColor: COLORS.black }}>
                <Text>Loading....</Text>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  selectedOp: {
    borderBottomWidth: 3,
    borderBottomEndRadius: 2,
    borderColor: COLORS.orange,
    paddingHorizontal: 2,
  },
});
