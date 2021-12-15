import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import * as ordersActions from "../../store/actions/orders";

const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(ordersActions.fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );

  if (orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyOrder}>
          No orders found. Start ordering some!
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.primary, marginBottom: 50 }}
    >
      <FlatList
        data={orders}
        renderItem={(itemData) => (
          <OrderItem
            key={new Date().toString()}
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
};

export const screenOptions = {
  title: "Your Orders",
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyOrder: {
    fontFamily: "samsung-sharp-bold",
    color: Colors.text,
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
});

export default OrdersScreen;
