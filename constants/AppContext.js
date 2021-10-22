import React, { Component } from "react";
import { Alert, ToastAndroid } from "react-native";

const AppContext = React.createContext();
import TrackPlayer, { Capability, state } from "react-native-track-player";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("db.db");

class AppProvider extends Component {
  state = {
    playlists: [],
    likedSongs: [],
    playListSongs: [],
  };

  componentDidMount() {
    this.initDB();
    this.setupPlayer();
    this.getAllPlaylists();
    // this.getPlaylistSongs("Liked");
  }

  // create the notes table if not exists
  initDB = () => {
    console.log("init");
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists playlists (id integer primary key not null,title text);"
      );
      tx.executeSql(
        "create table if not exists songs (title text,author text,url text primary key not null,cover text,fileName text);"
      );
      tx.executeSql(
        "create table if not exists playlist_song (id integer primary key not null,playlist_id integer,song_id text);"
      );
    });
  };

  // ====================== songs operations ===========================
  addSongToDB = ({ title, author, cover, fileName, url }) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into songs (title,author,url,cover,fileName) values (?,?,?,?,?)",
          [title, author, url, cover, fileName]
        );
      },
      null
      // this.getPlaylistSongs
    );
    console.log("Song added to DB");
  };

  // ================================= Playlist Operation Functions ====================
  getPlaylistSongsDB = () => {
    try {
      // console.log("2222");
      // let allPlaylistSongs = [];
      this.state.playlists.forEach((pl) => {
        // console.log("3333");
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT *
        FROM songs
        WHERE url IN (SELECT song_id FROM playlist_song WHERE playlist_id = ${pl.id})`,
            [],
            (_, { rows: { _array } }) => {
              const data = {
                id: pl.id,
                title: pl.title,
                songs: _array,
              };
              this.setState({
                playListSongs: [...this.state.playListSongs, data],
              });
              // allPlaylistSongs = [...allPlaylistSongs, data];
              // console.log(allPlaylistSongs);
              // console.log(_array);
            }
          );
        });
      });
      // console.log(allPlaylistSongs);
      // Promise.resolve(allPlaylistSongs);
    } catch (error) {
      Promise.reject(error);
    }
  };
  getPlaylistSongs = async () => {
    // console.log("11111");
    await this.getPlaylistSongsDB();
    // console.log(data);
    // this.setState({ playListSongs: allPlaylistSongs });
    // console.log(this.state.playListSongs);
  };

  getAllPlaylists = () => {
    console.log("set");
    db.transaction(
      (tx) => {
        tx.executeSql(
          `select * from playlists;`,
          [],
          (_, { rows: { _array } }) => {
            if (_array.length <= 0) {
              console.log("new");
              db.transaction(
                (tx) => {
                  const playlists = ["Liked", "Recently Played"];
                  playlists.forEach((title) => {
                    tx.executeSql("insert into playlists (title) values (?)", [
                      title,
                    ]);
                  });
                },
                null,
                this.getAllPlaylists
              );
            } else {
              // console.log("old");
              this.setState({ playlists: _array });
              console.log(_array);
            }
          }
        );
      },
      null,
      this.getPlaylistSongs
    );
  };

  createPlaylist = (title) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into playlists (title) values (?)", [title]);
      },
      null,
      this.getAllPlaylists
    );
  };

  addSongToPlaylist = (playlist_id, song_id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into playlist_song (playlist_id,song_id) values (?,?)",
          [playlist_id, song_id]
        );
      },
      null
      // this.getAllPlaylists
    );
    console.log("added Playlist");
  };

  // ==========================     ============================

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
          createPlaylist: this.createPlaylist,
          addSongToPlaylist: this.addSongToPlaylist,
          addSongToDB: this.addSongToDB,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const AppConsumer = AppContext.Consumer;

export { AppProvider, AppConsumer, AppContext };
