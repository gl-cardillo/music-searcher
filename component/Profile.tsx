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
  const getTopTracks = () => {
    
  }
  useEffect(() => {
    getArtist();
  }, []);
  console.log(result);
  return (
    <View>
      {!!result && (
        <View>
          <Image
            style={styles.images}
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
          <View>
            <Text>Top Tracks</Text>

          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D30",
    alignItems: "center",
    paddingTop: 10,
  },

  images: {
    width: "100%",
    height: 340,
    objectFit: 'fill'
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
});
