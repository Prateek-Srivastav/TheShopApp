import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import MainButton from "../../components/UI/MainButton";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import { toggleDarkMode } from "../../store/actions/darkMode";
import Colors from "../../constants/Colors";
import { appTheme } from "../../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);

  // const Color = darkMode(isDark);
  // console.log(Color);
  const dispatch = useDispatch();

  // toggleDarkMode = () => {
  //   if (isDarkMode) setIsDarkMode(false);
  //   else setIsDarkMode(true);

  //   console.log("Reached " + isDarkMode);
  // };

  // const darkModeHandler = useCallback(async () => {
  //   if (isDarkMode) setIsDarkMode(false);
  //   else setIsDarkMode(true);
  //   console.log("reached " + isDarkMode);
  //   await dispatch(toggleDarkMode(isDarkMode));
  // }, [dispatch, isDarkMode]);

  // useEffect(() => {
  //   props.navigation.setParams({
  //     darkModeHandler: darkModeHandler,
  //     isDark: isDarkMode,
  //   });
  // }, [darkModeHandler]);

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [setError, setIsLoading, dispatch]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadProducts);

    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorMessage}>An error occurred!</Text>
        <MainButton title="Try Again" onPress={loadProducts} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  if (!isLoading && products.length === 0)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorMessage}>
          No products found. {"\n"} Maybe start adding some!
        </Text>
      </View>
    );

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.primary, marginBottom: 50 }}
    >
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        renderItem={(itemData) => (
          <View style={{ backgroundColor: Colors.primary }}>
            <ProductItem
              image={itemData.item.imageUrl}
              title={itemData.item.title}
              price={itemData.item.price}
              onSelect={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            >
              <MainButton
                title="View Details"
                onPress={() => {
                  selectItemHandler(itemData.item.id, itemData.item.title);
                }}
              />
              <MainButton
                title="Add to Cart"
                onPress={() => {
                  dispatch(cartActions.addToCart(itemData.item));
                }}
              />
            </ProductItem>
          </View>
        )}
      />
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    title: "All Products",
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    //     <Item
    //       title="Dark Mode"
    //       iconName={
    //         (navData.route.params ? navData.route.params.isDark : null)
    //           ? "moon"
    //           : "moon-outline"
    //       }
    //       iconSize={21}
    //       onPress={() => {
    //         appTheme(navData.route.params ? navData.route.params.isDark : null);
    //         navData.route.params
    //           ? navData.route.params.darkModeHandler()
    //           : null;
    //       }}
    //     />
    //   </HeaderButtons>
    // ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  errorMessage: {
    fontFamily: "samsung-sharp-bold",
    color: Colors.cardBg,
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});

export default ProductsOverviewScreen;
