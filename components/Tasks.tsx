import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export type TaskItemProps = {
  text: string;
  done: boolean;
  onToggle: () => void;
};

export const TaskItem = ({ text, done, onToggle }: TaskItemProps) => {
  return (
    <Pressable onPress={onToggle} style={styles.row}>
      <Text style={[styles.text, done && styles.done]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
  },
  done: {
    textDecorationLine: "line-through",
    color: "black",
  },
});
