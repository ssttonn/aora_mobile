import { Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import MainButton from "@/components/MainButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setFormField } from "./reducers/loginReducer";
import { Link } from "expo-router";

const LoginPage = () => {
  const {email, password} = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const onLogin = (_: any) => {
    console.log(email, password);
  }

  const isButtonDisabled = email === "" || password === "";

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6 gap-y-7">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={(value) => {
              dispatch(setFormField({ field: "email", value: value }));
            }}
          />
          <FormField
            title="Password"
            value={password}
            keyboardType="default"
            onChangeText={(value) => dispatch(setFormField({ field: "password", value: value }))}
          />
          <MainButton
            title="Login"
            onPress={onLogin}
            disabled={isButtonDisabled}
            className={`${isButtonDisabled ? "bg-gray-400" : "bg-secondary"}`}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
            <Link href="/register" className="text-lg font-psemibold text-secondary">
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginPage;
