import React, { useState, useEffect } from "react";
import {  View,  Text,  TextInput,  Pressable,  ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TaskItem } from "./components/Tasks";

export type Task = {
  id: number;
  text: string;
  done: boolean;
};

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await AsyncStorage.getItem("tasks");
    if (data) setTasks(JSON.parse(data));
  };

  const saveTasks = async (newTasks: Task[]) => {
    await AsyncStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (!taskText.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      done: false,
    };
    const newList = [...tasks, newTask];
    setTasks(newList);
    saveTasks(newList);
    setTaskText("");
  };

  const toggleTask = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(updated);
    saveTasks(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo list</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Enter task"
          style={styles.input}
        />
        <Pressable onPress={addTask}>
          <Text style={styles.save}>Save</Text>
        </Pressable>
      </View>

      <ScrollView>
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            text={t.text}
            done={t.done}
            onToggle={() => toggleTask(t.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff", 
  },
  header: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderBottomWidth: 1,
    paddingBottom: 4,
    marginRight: 12,
  },
  save: {
    fontSize: 18,
    color: "blue",
  },
});
