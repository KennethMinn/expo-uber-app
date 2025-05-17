import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignIn = () => {};

  return (
    <ScrollView className="flex-1 bg-white ">
      <View className="flex-1 ">
        <View className="relative w-full h-[250px] z-0">
          <Image
            source={images.signUpCar}
            resizeMode="cover"
            className="w-full h-full"
          />
          <Text className="text-3xl font-semibold bottom-12 left-5">
            Welcome
          </Text>
        </View>
        <View className="px-5 gap-y-2">
          <InputField
            icon={icons.email}
            label="Email"
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            icon={icons.lock}
            secureTextEntry
            label="Name"
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton title="Sign In" className="mt-5" />
          <View className="flex-row items-center my-2 gap-x-2">
            <View className=" flex-1 h-[1px] bg-general-100" />
            <Text className="text-lg ">Or</Text>
            <View className=" flex-1 h-[1px] bg-general-100" />
          </View>
          <OAuth />
          <Link href="/sign-up" className="mt-5 text-center">
            <Text>
              Don&apos;t have an account?{" "}
              <Text className="text-primary-500">Sign Up</Text>
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
