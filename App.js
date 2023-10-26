import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "./color";
import { useEffect, useState } from "react";

export default function App() {
  const [nowState, setNowState] = useState("W");
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeTxt = (e) => {
    setText(e);
  };
  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newToDos = Object.assign({}, toDos, { [Date.now()]: { text, work: nowState === "W" ? true : false } });
    setToDos(newToDos);
    setText("");
  };
  useEffect(() => {
    console.log(toDos);
  }, [toDos]);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
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
      <View>
        <TextInput
          defaultValue={text}
          onSubmitEditing={addToDo}
          autoComplete={"off"}
          onChangeText={onChangeTxt}
          style={styles.input}
          autoCorrect={false}
          placeholder={nowState === "W" ? "Add a To Do!" : "Where Do you want to go?"}
        />
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
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
  },
});
