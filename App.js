import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "./color";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDoObj";

export default function App() {
  const [nowState, setNowState] = useState("W");
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const onChangeTxt = (e) => {
    setText(e);
  };
  const saveTodo = async (newTodo) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodo));
  };
  const loadToDos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setToDos(JSON.parse(s));
    console.log(JSON.parse(s));
  };
  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newTodo = { ...toDos, [Date.now()]: { text, work: nowState === "W" ? true : false } };
    setToDos(newTodo);
    await saveTodo(newTodo);
    setText("");
  };
  useEffect(() => {
    loadToDos();
  }, []);

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
      <ScrollView>
        {Object.keys(toDos).map((key, idx) => {
          if (nowState === "W" && toDos[key].work) {
            return (
              <View style={styles.toDo} key={idx}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
            );
          } else if (nowState === "T" && !toDos[key].work) {
            return (
              <View style={styles.toDo} key={idx}>
                <Text style={styles.toDoText}>{toDos[key].text}</Text>
              </View>
            );
          }
        })}
      </ScrollView>
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
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
  },
  toDoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 500,
  },
});
