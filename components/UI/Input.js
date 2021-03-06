import React, { useReducer, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Colors from "../../constants/Colors";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = React.forwardRef((props, ref) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : "",
    isValid: props.initiallyValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    dispatch({ type: INPUT_BLUR });
  };

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>

      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        // onBlur={lostFocusHandler}
        ref={ref}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
    marginTop: 10,
    flexDirection: "column",
    paddingHorizontal: 5,
    marginVertical: 13,
  },
  label: {
    fontFamily: "product-sans-bold",
    marginVertical: 5,
    color: Colors.text,
    fontSize: 16,
  },
  input: {
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    // borderBottomColor: ,
    // borderBottomWidth: 1,
    backgroundColor: Colors.cardBg,
    color: Colors.text,
    fontFamily: "product-sans-regular",
    fontSize: 15,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "product-sans-regular",
    fontSize: 14,
    color: "red",
  },
});

export default Input;
