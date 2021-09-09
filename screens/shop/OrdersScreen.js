import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
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

OrdersScreen.navigationOptions = {
  headerTitle: "Your Orders",
};

const styles = StyleSheet.create({});

export default OrdersScreen;
