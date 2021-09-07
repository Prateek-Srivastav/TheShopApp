import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Colors from "../../constants/Colors";
import MainButton from "../UI/MainButton";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View>
      <View
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
      </View>
      <View>
        {showDetails && (
          <View style={styles.detailContainer}>
            <View style={styles.detailItems}>
              {props.items.map((cartItem) => (
                <CartItem
                  key={cartItem.productId}
                  quantity={cartItem.quantity}
                  title={cartItem.productTitle}
                  amount={cartItem.sum}
                />
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
    backgroundColor: "white",
    justifyContent: "space-between",
    margin: 20,
    marginBottom: -21,
    borderRadius: 7,
    elevation: 5,
  },
  orderItemClosedDetail: {
    padding: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    margin: 20,
    borderRadius: 7,
    marginBottom: 5,
    elevation: 5,
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
    marginHorizontal: 30,
    marginVertical: 10,
    borderColor: "#888",
    paddingTop: 20,
    paddingBottom: 10,
  },
  detailItems: {
    width: "100%",
    paddingHorizontal: 5,
  },
});

export default OrderItem;
