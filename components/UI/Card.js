import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
});

export default Card;