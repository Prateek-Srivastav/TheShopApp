import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";

import Card from "../UI/Card";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  return (
    <Card style={styles.product}>
      {/* <View style={styles.touchable}> */}
      <TouchableNativeFeedback onPress={props.onSelect} useForeground>
        <View>
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{props.children}</View>
        </View>
      </TouchableNativeFeedback>
      {/* </View> */}
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 292,
    margin: 20,
    overflow: "hidden",
  },
  // touchable: {
  //   // borderRadius: 10,
  //   overflow: "hidden",
  //   // margin: 20,
  // },
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
