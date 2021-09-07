import React from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import MainButton from "../../components/UI/MainButton";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import * as cartActions from "../../store/actions/cart";

const ProductDetailScreen = (props) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
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

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
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
    fontSize: 14,
    textAlign: "center",
  },
  actions: {
    fontFamily: "product-sans-medium",
    marginVertical: 10,
    alignItems: "center",
    marginHorizontal: 20,
  },
});

export default ProductDetailScreen;
