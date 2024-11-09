import { View, Text, TextInput, KeyboardTypeOptions, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";

interface FormFieldProps {
  title?: string | undefined;
  value?: string | undefined;
  className?: string;
  inputClassName?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  validator?: (value: string) => string;
  onChangeText: (e: string) => void;
}

const FormField = ({ title, value, onChangeText, className, inputClassName, keyboardType, placeholder, validator }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const [hasAlreadyTyped, setHasAlreadyTyped] = useState(false);
  
    return (
      <View className={`space-y-2 ${className}`}>
        {title && <Text className="text-base text-gray-100 font-pmedium">{title}</Text>}
        <View className="flex mt-2 w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
          <TextInput
            className={inputClassName || "flex-1 text-white font-psemibold text-base"}
            value={value}
            onChangeText={(value) => {
              onChangeText(value);
              if (!hasAlreadyTyped) {
                setHasAlreadyTyped(true);
              }
            }}
            keyboardType={keyboardType}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            secureTextEntry={title === "Password" && !showPassword}
          />
          {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image source={showPassword ? icons.eye : icons.eyeHide} className="w-8 h-8" resizeMode="contain" />
            </TouchableOpacity>
          )}
        </View>
        {validator && value && hasAlreadyTyped && <Text className="text-red-500 text-sm mt-[10px]">{validator(value)}</Text>}
      </View>
    );
};

export default FormField;
