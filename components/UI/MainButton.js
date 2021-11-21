import React from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native";
import Colors from "../../constants/Colors";

const MainButton = (props) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={{ ...styles.buttonText, ...props.style }}>
            {props.title}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  button: {
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: Colors.buttonColor,
    fontFamily: "product-sans-medium",
    fontSize: 15,
    textAlign: "center",
  },
});

export default MainButton;
