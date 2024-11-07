import { SafeAreaView, ScrollView, Image, View, Text } from "react-native";
import React from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { setFormField } from "./reducers/registerReducer";
import MainButton from "@/components/MainButton";
import { Link } from "expo-router";

const RegisterPage = () => {
  const { email, password, username } = useSelector((state: RootState) => state.register);

  const dispatch = useDispatch();

  const onRegister = (_: any) => {
    console.log();
  };

  const isButtonDisabled = email === "" || password === "" || username === "";

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 gap-y-7 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold font-psemibold">Sign up to Aora</Text>
          <FormField
            title="Username"
            value={username}
            keyboardType="default"
            onChangeText={(value) => dispatch(setFormField({ field: "username", value: value }))}
          />
          <FormField
            title="Email"
            value={email}
            keyboardType="email-address"
            onChangeText={(value) => {
              dispatch(
                setFormField({
                  field: "email",
                  value: value,
                })
              );
            }}
          />
          <FormField
            title="Password"
            value={password}
            keyboardType="default"
            onChangeText={(value) => {
              dispatch(
                setFormField({
                  field: "password",
                  value: value,
                })
              );
            }}
          />
          <MainButton
            title="Register"
            onPress={onRegister}
            disabled={isButtonDisabled}
            className={`${isButtonDisabled ? "bg-gray-400" : "bg-secondary"}`}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
            <Link href="/login" className="text-lg font-psemibold text-secondary">
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPage;

function viet(onEat: () => void) {
  console.log("Eating")
  onEat()
}

viet(() => {
  console.log("Viet is eating")
})

