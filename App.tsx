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
import { Icon } from "@rneui/base";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Search } from "./component/Search";
import { Profile } from "./component/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${API_TOKEN}`;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Search"
          component={Search}
          options={{
            header: ({ navigation }) => (
              <View style={{ height: 70, backgroundColor: "#2D2D30" }}></View>
            ),
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            header: ({ navigation }) => (
              <View
                style={{
                  backgroundColor: "#2D2D30",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              ></View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
