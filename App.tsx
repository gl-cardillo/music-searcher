import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Image, ScrollView } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, API_TOKEN } from "@env";

export default function App() {
  const [search, setSearch] = useState<string>("");

  const [results, setResults] = useState<any>([]);
  const getData = async (search: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/search?q=${search}&type=album%2Cartist%2Ctrack`,
        { headers: { Authorization: `Bearer ${API_TOKEN}` } }
      );
      const { artists } = response.data;
      setResults(artists.items);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(results[0]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        onChangeText={(txt) => getData(txt)}
      />
      
      {results.length > 0 &&
        results.map((result: any, i: number) => (
          <View style={styles.resultContainer} key={i}>
            <Image
              style={styles.images}
              source={{
                uri: result.images[0]?.url,
              }}
            />
            <View>
              <Text style={styles.name}>{result.name}</Text>
              <Text style={styles.type}>{result.type}</Text>
            </View>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D30",
    alignItems: "center",
    paddingTop: 100,
  },
  searchInput: {
    borderWidth: 0.5,
    width: 200,
    height: 30,
    padding: 10,
    marginBottom: 20,
    color: "white",
    borderColor: 'white',
    borderRadius: 5
  },
  images: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  resultContainer: {
    marginTop: 15,
    width: 250,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  infoContainer: {},
  name: {
    fontWeight: "bold",
    color: "white",
  },
  type: {
    color: "white",
  },
});
