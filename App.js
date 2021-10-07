import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import ShopNavigator from "./navigation/ShopNavigator";

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "product-sans-medium": require("./assets/fonts/ProductSans-Medium.ttf"),
    "product-sans-black": require("./assets/fonts/ProductSans-Black.ttf"),
    "product-sans-bold": require("./assets/fonts/ProductSans-Bold.ttf"),
    "product-sans-light": require("./assets/fonts/ProductSans-Light.ttf"),
    "product-sans-regular": require("./assets/fonts/ProductSans-Regular.ttf"),
    "samsung-sharp-regular": require("./assets/fonts/SamsungSharpSansRegular-Regular.ttf"),
    "samsung-sharp-bold": require("./assets/fonts/samsung_s_sharp_by_629lyric-d8y77l9.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = React.useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
