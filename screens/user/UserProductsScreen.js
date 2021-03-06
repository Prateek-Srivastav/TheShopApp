import React from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import MainButton from "../../components/UI/MainButton";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productsActions from "../../store/actions/products";
import * as authActions from "../../store/actions/auth";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

let leftHeaderAction;

const UserProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  leftHeaderAction = () => {
    // const dispatch = useDispatch();
    dispatch(authActions.logout());
    // props.navigation.navigate("Auth");
  };

  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", {
      productId: id,
      title: "Edit Product",
    });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyUserProducts}>
          No products found. Start adding some!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={userProducts}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}
          >
            <MainButton
              title="Edit"
              onPress={() => {
                editProductHandler(itemData.item.id);
              }}
            />
            <MainButton
              title="Delete"
              onPress={() => deleteHandler(itemData.item.id)}
            />
          </ProductItem>
        )}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    title: "Your Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName="md-create"
          iconSize={24}
          onPress={() => {
            navData.navigation.navigate("EditProduct", {
              title: "Add Product",
            });
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName="log-in-outline"
          onPress={leftHeaderAction}
          iconSize={27}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primary,
    marginBottom: 50,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  emptyUserProducts: {
    fontFamily: "samsung-sharp-bold",
    color: Colors.text,
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});

export default UserProductsScreen;
