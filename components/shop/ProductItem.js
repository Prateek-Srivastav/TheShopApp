import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
} from "react-native";
import MainButton from "../UI/MainButton";

const ProductItem = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onViewDetail} useForeground>
      <View style={styles.product}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>${props.price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <MainButton title="View Details" onPress={props.onViewDetail} />
          <MainButton title="Add to Cart" onPress={props.onAddToCart} />
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  product: {
    elevation: 3,
    borderColor: "#ccc",
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "product-sans-black",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "product-sans-black",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default ProductItem;
