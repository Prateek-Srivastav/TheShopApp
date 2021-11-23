import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MainButton from "../../components/UI/MainButton";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductDetailScreen = (props) => {
  const productId = props.route.params.productId;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView style={{ backgroundColor: Colors.primary, marginBottom: 50 }}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: selectedProduct.imageUrl }}
        />
      </View>
      <View style={styles.actions}>
        <MainButton
          title="Add to Cart"
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  const productTitle = navData.route.params
    ? navData.route.params.productTitle
    : null;
  return {
    title: productTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  imageContainer: {
    margin: 5,
    overflow: "hidden",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  price: {
    fontFamily: "product-sans-black",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.text,
    fontFamily: "product-sans-regular",
  },
  actions: {
    fontFamily: "product-sans-medium",
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
