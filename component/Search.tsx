import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, API_TOKEN } from "@env";
import { Icon } from "@rneui/base";

export const Search = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState<string>("");

  const [results, setResults] = useState<any>([]);

  const getData = async (search: string) => {
    const searchFormatted = search.replaceAll(" ", "+");
    setSearchText(search);
    if (search !== "") {
      try {
        const response = await axios.get(
          `${API_URL}/search?q=${searchFormatted}&type=album%2Cartist%2Ctrack`
        );
        setResults(response.data.artists.items);
      } catch (error) {
        console.error(error);
      }
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      getData(searchText);
    }, 200);

    // Cleanup the timeout if searchText changes before 700ms
    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  const handleClear = () => {
    setSearchText("");
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" color="white" />
        <TextInput
          style={styles.searchInput}
          onChangeText={(txt) => setSearchText(txt)}
          value={searchText}
          placeholder="Search.."
        />
        {searchText !== "" && (
          <TouchableOpacity onPress={handleClear}>
            <Icon name="remove" color="white" type="font-awesome" size={15} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.resultsContainer}>
        {results.length > 0 &&
          results.map((result: any, i: number) => (
            <TouchableOpacity
              key={i}
              onPress={() =>
                navigation.navigate("Profile", {
                  id: result.id,
                })
              }
            >
              <View style={styles.resultContainer}>
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
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b1b1b",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 8,
    width: "90%",
  },
  searchInput: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 30, // To make space for the clear icon
    color: "white",
    borderColor: "white",
    height: 35,
  },
  images: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  resultsContainer: {
    width: "100%",
    marginTop: 15,
  },
  resultContainer: {
    marginBottom: 20,
    width: "70%",
    marginLeft: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  type: {
    color: "white",
  },
});
