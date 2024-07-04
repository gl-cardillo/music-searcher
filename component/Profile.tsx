import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { API_URL, API_TOKEN } from "@env";
import axios from "axios";
import { Icon } from "@rneui/base";
import {
  SpotifyArtistType,
  SpotifyTrackType,
  SpotifyAlbumType,
} from "../types/types";

export const Profile = ({ route, navigation }: any) => {
  const { id } = route.params;

  const [artist, setArtist] = useState<SpotifyArtistType>();
  const [topTrack, setTopTrack] = useState<SpotifyTrackType[]>();
  const [albums, setAlbums] = useState<SpotifyAlbumType[]>();

  const getArtist = async () => {
    try {
      const response = await axios.get(`${API_URL}/artists/${id}`);
      setArtist(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTopTracks = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/artists/${id}/top-tracks?market=eg`
      );
      setTopTrack(response.data.tracks);
    } catch (error) {
      console.error(error);
    }
  };

  const getAlbum = async () => {
    try {
      const response = await axios.get(`${API_URL}/artists/${id}/albums`);
      setAlbums(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getArtist();
    getTopTracks();
    getAlbum();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => navigation.goBack()}
      >
        <Icon type="ant-design" name="left" color="white" size={20} />
      </TouchableOpacity>
      <ScrollView>
        {!!artist && (
          <View>
            <View style={{position: 'relative', marginBottom:10}}>
              <Image
                style={styles.artistImage}
                source={{
                  uri: artist.images[0]?.url,
                }}
              />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{artist.name}</Text>
              </View>
            </View>
            <View style={styles.topTrackContainer}>
              <Text style={styles.topTrackTitle}>Top Tracks</Text>
              {topTrack && (
                <View>
                  {topTrack.slice(0, 5).map((track: any, i: number) => {
                    return (
                      <View key={i} style={styles.trackContainer}>
                        <Text style={styles.rank}>{i + 1}</Text>
                        <Image
                          style={styles.images}
                          source={{
                            uri: track.album.images[0]?.url,
                          }}
                        />
                        <View>
                          <Text numberOfLines={1} style={styles.songName}>
                            {track.name}
                          </Text>
                          <Text style={styles.album}>{track.album.name}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            <View style={styles.topTrackContainer}>
              <Text style={styles.topTrackTitle}>Albums</Text>
              {albums && (
                <View>
                  {albums.slice(0, 5).map((album: any, i: number) => {
                    return (
                      <View key={i} style={styles.trackContainer}>
                        <Text style={styles.rank}>{i + 1}</Text>
                        <Image
                          style={styles.images}
                          source={{
                            uri: album.images[0]?.url,
                          }}
                        />
                        <View>
                          <Text numberOfLines={1} style={styles.songName}>
                            {album.name}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1b1b1b",
  },
  artistImage: {
    width: "100%",
    height: 400,
    objectFit: "fill",
  },
  goBack: {
    position: "absolute",
    top: 55,
    left: 12,
    zIndex: 100,
    backgroundColor: "#00000057",
    borderRadius: 100,
    padding: 5,
    paddingLeft: 4,
    opacity: 0.9,
  },
  nameContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 8,
    left: 20,
    zIndex: 100,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 45,
    maxWidth: 340,
    flex: 1,
    flexShrink: 1,
    flexWrap: "wrap",
  },
  topTrackContainer: {
    paddingTop: 5,
    paddingBottom: 25,
    backgroundColor: "#1b1b1b",
    paddingLeft: 10,
    color: "white",
  },
  rank: { color: "white" },
  trackContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 12,
  },
  topTrackTitle: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    marginBottom: 0,
  },
  images: { width: 55, height: 55 },
  songName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    marginBottom: 5,
    maxWidth: 300,
  },
  album: {
    color: "white",
  },
});
