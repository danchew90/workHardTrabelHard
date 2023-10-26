import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "./color";
import { useState } from "react";

export default function App() {
  const [nowState, setNowState] = useState("W");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setNowState("W");
          }}
        >
          <Text style={{ ...styles.btnText, color: nowState === "W" ? "#fff" : theme.gray }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setNowState("T");
          }}
        >
          <Text style={{ ...styles.btnText, color: nowState === "T" ? "#fff" : theme.gray }}>Travel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
});
