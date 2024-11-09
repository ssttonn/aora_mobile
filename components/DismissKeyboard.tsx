import { Keyboard, TouchableWithoutFeedback } from "react-native";
import React, { ReactNode } from "react";

const DismissKeyboard = ({ children }: { children: ReactNode }) => {
  return (
    <TouchableWithoutFeedback
      onPress={(e) => {
        Keyboard.dismiss();
        e.preventDefault();
      }}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
