import React, { useCallback, useEffect, useRef, useReducer } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
  }
};

const EditProductScreen = (props) => {
  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const imageUrl_input = useRef();
  const price_input = useRef();
  const description_input = useRef();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    fromIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!isValidTitle) {
      Alert.alert("Wrong Input", "Please check the errors in the form", [
        { title: "Okay" },
      ]);
      return;
    }

    if (editedProduct)
      dispatch(
        productActions.updateProduct(prodId, title, description, imageUrl)
      );
    else
      dispatch(
        productActions.createProduct(title, description, imageUrl, +price)
      );

    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl, price, isValidTitle]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const textChangeHandler = (text) => {
    let isValid = false;

    if (text.trim().length > 0) isValid = true;

    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid: isValid,
      input: "title",
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <TextInput
              mode="outlined"
              label="Title"
              underlineColor="black"
              selectionColor="grey"
              style={styles.input}
              value={title}
              onChangeText={(text) => textChangeHandler(text)}
              autoCapitalize="sentences"
              autoCorrect
              returnKeyType="next"
              onSubmitEditing={() => imageUrl_input.current.focus()}
            />
            {!isValidTitle && <Text>Please enter a valid title!</Text>}
          </View>
          <View style={styles.formControl}>
            <TextInput
              mode="outlined"
              label="ImageUrl"
              style={styles.input}
              value={imageUrl}
              onChangeText={(text) => setImageUrl(text)}
              returnKeyType="next"
              onSubmitEditing={() => price_input.current.focus()}
              ref={imageUrl_input}
            />
          </View>
          {editedProduct ? null : (
            <View style={styles.formControl}>
              <TextInput
                mode="outlined"
                label="Price"
                style={styles.input}
                value={price}
                onChangeText={(text) => setPrice(text)}
                keyboardType="decimal-pad"
                returnKeyType="next"
                onSubmitEditing={() => description_input.current.focus()}
                ref={price_input}
              />
            </View>
          )}
          <View style={styles.formControl}>
            <TextInput
              mode="outlined"
              label="Description"
              style={styles.input}
              value={description}
              onChangeText={(text) => setDescription(text)}
              ref={description_input}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("title"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="md-checkmark"
          onPress={() => navData.navigation.getParam("submit")()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  formControl: {
    width: "100%",
    marginTop: 10,
  },
  label: {
    fontFamily: "product-sans-bold",
    marginVertical: 8,
    fontSize: 15,
  },
  input: {
    // marginHorizontal: 2,
    // paddingVertical: 5,
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    // overflow: "hidden",
  },
});

export default EditProductScreen;
