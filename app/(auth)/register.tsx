import { SafeAreaView, ScrollView, Image, View, Text, Alert, Keyboard } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../stores/rootStore";
import { useDispatch } from "react-redux";
import { registerActions, RegisterStatus } from "../../reducers/auth/registerReducer";
import MainButton from "@/components/MainButton";
import { Link, router } from "expo-router";
import DismissKeyboard from "@/components/DismissKeyboard";
import { useValidators } from "@/hooks/useValidators";

const RegisterPage = () => {
  const { email, password, username } = useSelector((state: RootState) => state.register.form);
  const { errorMessage, registerStatus } = useSelector((state: RootState) => state.register);
  const {emailValidator, passwordValidator, textValidator} = useValidators();

  const dispatch = useDispatch<AppDispatch>();

  const onRegister = async (_: any) => {
    Keyboard.dismiss()
    await dispatch(registerActions.registerUser({ email, password, username }));
  };

  useEffect(() => {
    if (registerStatus === RegisterStatus.SUCCESS) {
      router.replace("/home")
      dispatch(registerActions.reset());
    }
    if (errorMessage) {
      Alert.alert("Error", errorMessage, [
        { text: "OK", onPress: () => dispatch(registerActions.setErrorMessage(undefined)) },
      ]);
    }
  }, [errorMessage, registerStatus]);

  const isButtonDisabled = emailValidator(email) !== "" || passwordValidator(password) !== "" || textValidator(username, "Username") !== "";

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <DismissKeyboard>
          <View className="w-full min-h-[85vh] justify-center px-4 gap-y-7 my-6">
            <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
            <Text className="text-2xl text-white text-semibold font-psemibold">Sign up to Aora</Text>
            <FormField
              title="Username"
              value={username}
              keyboardType="default"
              validator={(value) => textValidator(value, "Username")}
              onChangeText={(value) => dispatch(registerActions.setFormField({ field: "username", value: value }))}
            />
            <FormField
              title="Email"
              value={email}
              keyboardType="email-address"
              validator={emailValidator}
              onChangeText={(value) => {
                dispatch(
                  registerActions.setFormField({
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
              validator={passwordValidator}
              onChangeText={(value) => {
                dispatch(
                  registerActions.setFormField({
                    field: "password",
                    value: value,
                  })
                );
              }}
            />
            <MainButton
              title="Register"
              onPress={onRegister}
              isLoading={registerStatus === RegisterStatus.LOADING}
              disabled={isButtonDisabled}
              className={`${
                isButtonDisabled || registerStatus === RegisterStatus.LOADING ? "bg-gray-400" : "bg-secondary"
              }`}
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
              <Link href="/login" className="text-lg font-psemibold text-secondary">
                Login
              </Link>
            </View>
          </View>
        </DismissKeyboard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterPage;
