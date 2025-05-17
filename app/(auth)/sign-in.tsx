import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

type FormState = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Handle form input changes
  const handleInputChange = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle sign in submission
  const handleSignIn = async () => {
    if (!isLoaded) return;

    // Basic validation
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSigningIn(true);
    try {
      const result = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/");
      } else {
        console.log("Sign in incomplete:", JSON.stringify(result, null, 2));
        Alert.alert("Error", "Sign in process incomplete");
      }
    } catch (err: any) {
      console.error("Sign in error:", err);
      Alert.alert("Error", err.errors?.[0]?.longMessage || "Failed to sign in");
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header Section */}
      <View className="relative w-full h-64">
        <Image
          source={images.signUpCar}
          resizeMode="cover"
          className="w-full h-full"
        />
        <Text className="absolute text-3xl font-semibold text-white bottom-8 left-5">
          Welcome Back
        </Text>
      </View>

      {/* Form Section */}
      <View className="px-5 gap-y-4">
        <InputField
          icon={icons.email}
          label="Email"
          placeholder="Enter your email"
          value={form.email}
          onChangeText={handleInputChange("email")}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <InputField
          icon={icons.lock}
          secureTextEntry
          label="Password"
          placeholder="Enter your password"
          value={form.password}
          onChangeText={handleInputChange("password")}
          onSubmitEditing={handleSignIn}
        />

        <CustomButton
          title="Sign In"
          className="mt-5"
          onPress={handleSignIn}
          isLoading={isSigningIn}
          disabled={isSigningIn}
        />

        {/* Divider */}
        <View className="flex-row items-center my-4 gap-x-2">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="text-gray-500">Or</Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        <OAuth />

        {/* Sign up link */}
        <Link href="/sign-up" className="mt-5">
          <Text className="text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Text className="font-medium text-primary-500">Sign Up</Text>
          </Text>
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignIn;
