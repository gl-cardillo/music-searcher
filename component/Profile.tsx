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

export const Profile = ({ route, navigation }: any) => {
  const { id } = route.params;

  const [result, setResult] = useState<any>();

  const [topTrack, setTopTrack] = useState<any>();

  const getArtist = async () => {
    try {
      const response = await axios.get(`${API_URL}/artists/${id}`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getTopTracks = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/artists/${id}/top-tracks?market=eg`,
        {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        }
      );
      setTopTrack(response.data.tracks);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getArtist();
    getTopTracks();
  }, []);
  console.log(topTrack);
  return (
    <ScrollView>
      {!!result && (
        <View>
          <Image
            style={styles.artistImage}
            source={{
              uri: result.images[0]?.url,
            }}
          />
          <Text style={styles.name}>{result.name}</Text>
          <TouchableOpacity
            style={styles.goBack}
            onPress={() => navigation.goBack()}
          >
            <Icon type="ant-design" name="left" color="white" size={30} />
          </TouchableOpacity>
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
                        <Text style={styles.songName}>{track.name}</Text>
                        <Text style={styles.album}>{track.album.name}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D30",
    alignItems: "center",
    paddingTop: 10,
  },
  artistImage: {
    width: "100%",
    height: 340,
    objectFit: "fill",
  },
  goBack: {
    position: "absolute",
    top: 50,
    left: 10,
  },
  name: {
    position: "absolute",
    top: 270,
    left: 20,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 60,
  },
  topTrackContainer: {
    paddingTop: 10,
    backgroundColor: "#2D2D30",
    paddingLeft: 10,
    color: 'white'
  },
  rank: {color: 'white'},
  trackContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },
  topTrackTitle: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  images: { width: 60, height: 60 },
  songName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  album: {
    color: "white",
  },
});
