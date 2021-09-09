import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const CartItem = (props) => {
  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
  };

  return (
    <View style={{ ...styles.cartItem, ...props.style }} onLayout={onLayout}>
      <View style={{ ...styles.itemData, ...props.itemDataStyle }}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText} numberOfLines={1}>
          {" "}
          {props.title}
        </Text>
      </View>

      <Text style={props.deletable ? styles.mainText : styles.fixedText}>
        ${props.amount.toFixed(2)}
      </Text>
      {props.deletable && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={props.onRemove}
            style={styles.deleteButton}
          >
            <Ionicons name="md-trash" size={23} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 16,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 7,
    // width: "100%",
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 23,
    width: "70%",
  },
  // actions: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   borderWidth: 2,
  // },
  quantity: {
    fontFamily: "product-sans-medium",
    color: Colors.text,
    fontSize: 16,
  },
  mainText: {
    fontFamily: "product-sans-bold",
    color: Colors.text,
    fontSize: 16,
    paddingEnd: 25,
  },
  fixedText: {
    fontFamily: "product-sans-bold",
    color: Colors.text,
    fontSize: 16,
    // paddingEnd: 25,
    position: "absolute",
    end: 15,
    top: 16,
  },
  buttonContainer: {
    marginHorizontal: 5,
    // borderWidth: 2,
    position: "absolute",
    end: 5,
    top: 12,
  },
  // deleteButton: {
  //   marginHorizontal: 10,
  // },
});

export default CartItem;
