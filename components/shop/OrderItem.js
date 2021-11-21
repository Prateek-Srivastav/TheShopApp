import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

import Card from "../UI/Card";
import MainButton from "../UI/MainButton";
import CartItem from "./CartItem";
import Colors from "../../constants/Colors";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View>
      <Card
        style={
          showDetails
            ? styles.orderItemOpenDetail
            : styles.orderItemClosedDetail
        }
      >
        <View style={styles.summary}>
          <Text style={styles.totalAmount}>$ {props.amount.toFixed(2)}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        <MainButton
          title={showDetails ? "Hide Details" : "Show Details"}
          onPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
        />
      </Card>
      <View>
        {showDetails && (
          <View style={styles.detailContainer}>
            <View style={styles.detail}>
              {props.items.map((cartItem) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    props.navigation.navigate("ProductDetail", {
                      productId: cartItem.productId,
                      productTitle: cartItem.productTitle,
                    })
                  }
                >
                  <CartItem
                    key={cartItem.productId}
                    quantity={cartItem.quantity}
                    title={cartItem.productTitle}
                    amount={cartItem.sum}
                    style={{
                      borderWidth: 0,
                      marginHorizontal: 0,
                    }}
                    itemDataStyle={{ width: "80%" }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderItemOpenDetail: {
    padding: 10,
    justifyContent: "space-between",
    margin: 20,
    marginBottom: -21,
  },
  orderItemClosedDetail: {
    padding: 10,
    justifyContent: "space-between",
    margin: 20,
    marginBottom: 5,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "product-sans-black",
    color: Colors.text,
    fontSize: 16,
  },
  date: {
    fontFamily: "product-sans-medium",
    fontSize: 16,
    color: "#888",
  },
  detailContainer: {
    borderTopWidth: 0,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 35,
    marginVertical: 10,
    borderColor: Colors.text,
    paddingTop: 10,
    paddingBottom: 0,
    elevation: 0,
  },
  detail: {
    width: "100%",
    marginHorizontal: 0,
  },
});

export default OrderItem;
