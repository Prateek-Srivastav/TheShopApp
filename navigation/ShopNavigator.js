import React, { useState } from "react";
import { Text, View, Animated, Dimensions } from "react-native";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { BottomTabBar, createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import CustomBottomBar from "../components/UI/CustomBottomBar";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import Colors from "../constants/Colors";
import EditProductScreen from "../screens/user/EditProductScreen";

defaultNavOptions = {
  ...TransitionPresets.SlideFromRightIOS,
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "product-sans-regular",
    fontSize: 22,
  },
  headerTintColor: Colors.text,
  headerLeft: () => {
    null;
  },
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const CartNavigator = createStackNavigator(
  {
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const tabScreenConfig = {
  Products: {
    screen: ProductsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="home" size={24} color={tabInfo.tintColor} />;
      },

      tabBarLabel: <Text></Text>,
    },
  },
  Cart: {
    screen: CartNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="md-cart" size={25} color={tabInfo.tintColor} />;
      },

      tabBarLabel: <Text></Text>,
    },
  },
  Orders: {
    screen: OrdersNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="list" size={25} color={tabInfo.tintColor} />;
      },
      tabBarLabel: <Text></Text>,
    },
  },

  Admin: {
    screen: AdminNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="md-create" size={25} color={tabInfo.tintColor} />
        );
      },

      tabBarLabel: <Text></Text>,
    },
  },
};

const ShopNavigator = createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    animationEnabled: true,
    activeTintColor: Colors.text,
    inactiveTintColor: Colors.accent,

    tabStyle: {
      paddingTop: 17,
    },
  },
  tabBarComponent: (props) => <CustomBottomBar {...props} />,
});

export default createAppContainer(ShopNavigator);
