import React, { useState } from "react";
import { Text, View, Animated, Dimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { useSelector } from "react-redux";

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen, {
  screenOptions as productDetailScreenOptions,
} from "../screens/shop/ProductDetailScreen";
import CartScreen, {
  screenOptions as cartScreenOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from "../screens/shop/OrdersScreen";
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from "../screens/user/UserProductsScreen";
import AuthScreen, {
  screenOptions as authScreenOptions,
} from "../screens/user/AuthScreen";
import EditProductScreen, {
  screenOptions as editProductScreenOptions,
} from "../screens/user/EditProductScreen";
import StartupScreen from "../screens/StartupScreen";
import Colors from "../constants/Colors";

let defaultNavOptions = {
  // AnimationEnabled: true,
  // ...TransitionPresets.SlideFromRightIOS,
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontFamily: "product-sans-regular",
    fontSize: 22,
  },
  headerTintColor: Colors.text,
  headerBackVisible: false,
  gestureEnabled: true,
  ...TransitionPresets.ModalPresentationIOS,
  // headerLeft: null,
};

const ProductsStackNavigator = createNativeStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        title="All Products"
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

// export const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetail: ProductDetailScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const OrdersStackNavigator = createNativeStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
      <OrdersStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

// const OrdersNavigator = createStackNavigator(
//   {
//     Orders: OrdersScreen,
//     ProductDetail: ProductDetailScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const AdminStackNavigator = createNativeStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={editProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

// const AdminNavigator = createStackNavigator(
//   {
//     UserProducts: UserProductsScreen,
//     EditProduct: EditProductScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const CartStackNavigator = createNativeStackNavigator();

export const CartNavigator = () => {
  return (
    <CartStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <CartStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </CartStackNavigator.Navigator>
  );
};

// const CartNavigator = createStackNavigator(
//   {
//     Cart: CartScreen,
//   },
//   {
//     defaultNavigationOptions: defaultNavOptions,
//   }
// );

const AuthStackNavigator = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </AuthStackNavigator.Navigator>
  );
};

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//   },
//   {
//     headerMode: "none",
//     navigationOptions: {
//       headerVisible: false,
//     },
//   }
// );

// const tabScreenConfig = {
//   Products: {
//     screen: ProductsNavigator,
//     navigationOptions: {
//       tabBarIcon: (tabInfo) => {
//         return <Ionicons name="home" size={24} color={tabInfo.tintColor} />;
//       },

//       tabBarLabel: <Text></Text>,
//     },
//   },
//   Cart: {
//     screen: CartNavigator,
//     navigationOptions: {
//       tabBarIcon: (tabInfo) => {
//         return <Ionicons name="md-cart" size={25} color={tabInfo.tintColor} />;
//       },

//       tabBarLabel: <Text></Text>,
//     },
//   },
//   Orders: {
//     screen: OrdersNavigator,
//     navigationOptions: {
//       tabBarIcon: (tabInfo) => {
//         return <Ionicons name="list" size={25} color={tabInfo.tintColor} />;
//       },
//       tabBarLabel: <Text></Text>,
//     },
//   },

//   Admin: {
//     screen: AdminNavigator,
//     navigationOptions: {
//       tabBarIcon: (tabInfo) => {
//         return (
//           <Ionicons name="md-create" size={25} color={tabInfo.tintColor} />
//         );
//       },

//       tabBarLabel: <Text></Text>,
//     },
//   },
// };

const Tab = createBottomTabNavigator();

export const ShopNavigator = () => {
  const { width } = Dimensions.get("screen");
  const [position] = useState(new Animated.ValueXY());

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const animStyles = {
    position: "absolute",
    // top: 0,
    left: width / 20,
    borderRadius: 20,
    elevation: 35,
    bottom: 45,
    height: 5,
    width: width / 7,
    backgroundColor: Colors.tabSlider,
    transform: position.getTranslateTransform(),
  };

  const animate = (value) => {
    Animated.timing(position, {
      toValue: { x: value, y: 0 },
      duration: 160,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      {<Animated.View style={animStyles} />}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            color = focused ? Colors.text : "black";
            size = focused ? 26 : 24;

            if (route.name === "Products")
              iconName = focused ? "home" : "home-outline";
            else if (route.name === "Cart")
              iconName = focused ? "md-cart" : "cart-outline";
            else if (route.name === "Orders")
              iconName = focused ? "list" : "list-outline";
            else if (route.name === "Admin") {
              iconName = focused ? "person" : "person-outline";
              size = focused ? 23 : 21;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: Colors.primary,
            borderTopColor: Colors.primary,
            height: 50,
          },
          tabBarActiveTintColor: Colors.text,
          tabBarInactiveTintColor: Colors.primary,
          tabBarShowLabel: false,

          lazy: false,
        })}
      >
        {/* <Animated.View style={animStyles} /> */}

        <Tab.Screen
          name="Products"
          component={ProductsNavigator}
          listeners={{
            tabPress: (e) => {
              // e.preventDefault();
              animate(0);
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartNavigator}
          options={{
            tabBarBadge: cartItems.length,
            tabBarBadgeStyle: {
              backgroundColor: "#de3c3c",
              color: "white",
              fontFamily: "product-sans-medium",
              marginTop: 2,
            },
          }}
          listeners={{
            tabPress: (e) => {
              // e.preventDefault();
              animate(width / 4);
            },
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersNavigator}
          listeners={{
            tabPress: (e) => {
              // e.preventDefault();
              animate(width / 2);
            },
          }}
        />
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          listeners={{
            tabPress: (e) => {
              // e.preventDefault();
              animate(width - width / 4);
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

// const ShopNavigator = createBottomTabNavigator(tabScreenConfig, {
//   tabBarOptions: {
//     animationEnabled: true,
//     activeTintColor: Colors.text,
//     // inactiveTintColor: Colors.accent,
//     keyboardHidesTabBar: true,
//     tabStyle: {
//       paddingTop: 17,
//     },
//   },
//   tabBarComponent: (props) => <CustomBottomBar {...props} />,
// });

// const MainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   Shop: ShopNavigator,
// });

// export default createAppContainer(MainNavigator);
