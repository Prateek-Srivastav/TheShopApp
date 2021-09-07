import React, { useState } from "react";
import { View, Animated, Dimensions } from "react-native";
import { BottomTabBar } from "react-navigation-tabs";
import Colors from "../../constants/Colors";

const CustomBottomBar = (props) => {
  //We use the spread operator to pass down all default properties of a bottom bar

  //custom styles for our indicator
  //The width of the indicator should be of equal size with each tab button. We have 3 tab buttons therefore, the width of a single tab button would be the total width Dimension of the screen divided by 3

  const { width } = Dimensions.get("screen");

  //Create an animated value
  const [position] = useState(new Animated.ValueXY());

  //We attach the x,y coordinates of the position to the transform property of the indicator so we can freely animate it to any position of our choice.
  const animStyles = {
    position: "absolute",
    top: 0,
    left: width / 12,
    borderRadius: 20,
    elevation: 35,
    bottom: 50,
    width: width / 6,
    backgroundColor: Colors.text,
    transform: position.getTranslateTransform(),
  };

  const animate = (value, route) => {
    //navigate to the selected route on click
    props.navigation.navigate(route);

    //animate indicator
    Animated.timing(position, {
      toValue: { x: value, y: 0 },
      duration: 220,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View style={animStyles} />
      <BottomTabBar
        {...props}
        onTabPress={({ route }) => {
          switch (route.key) {
            case "Products":
              //animated position should be 0
              animate(0, route.key);
              break;
            case "Orders":
              //animated position is width/3
              animate(width / 3, route.key);
              break;
            case "Cart":
              //animated position is width of screen minus width of single tab button
              animate(width - width / 3, route.key);
              break;
          }
        }}
        style={{
          backgroundColor: "transparent",
          height: 55,
          borderTopColor: "transparent",
        }}
      />
    </View>
  );
};

export default CustomBottomBar;
