import { View, Text, TextInput, KeyboardTypeOptions, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";

interface FormFieldProps {
  title: string;
  value: string;
  className?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder?: string;
  onChangeText: (e: string) => void;
}

const FormField = ({ title, value, onChangeText, className, keyboardType, placeholder }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
    return (
      <View className={`space-y-2 ${className}`}>
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
        <View className="flex mt-2 w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row">
          <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            onChangeText={onChangeText}
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
      </View>
    );
};

export default FormField;
