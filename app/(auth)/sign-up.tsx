import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

type FormState = {
  name: string;
  email: string;
  password: string;
};

type VerificationStatus = "default" | "pending" | "success" | "failed";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });

  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("default");
  const [verificationCode, setVerificationCode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isSingingUp, setIsSigningUp] = useState(false);

  // Handle form input changes
  const handleInputChange = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Sign up submission
  const handleSignUp = async () => {
    if (!isLoaded) return;

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSigningUp(true);
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerificationStatus("pending");
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setIsSigningUp(false);
    }
  };

  // Verify email with code
  const handleVerification = async () => {
    if (!isLoaded) return;
    setIsVerifying(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerificationStatus("success");
        setVerificationCode("");
      } else {
        Alert.alert("Error", "Verification failed");
        setVerificationStatus("failed");
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
      setVerificationStatus("failed");
      setVerificationCode("");
    } finally {
      setIsVerifying(false);
    }
  };

  // Navigate home after successful verification
  const navigateHome = () => {
    router.replace("/home");
    setVerificationStatus("default");
  };

  console.log(form);

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Main Content */}
      <View className="flex-1">
        {/* Header with image */}
        <View className="relative w-full h-64">
          <Image
            source={images.signUpCar}
            resizeMode="cover"
            className="w-full h-full"
          />
          <Text className="absolute text-3xl font-semibold text-white bottom-8 left-5">
            Create your account
          </Text>
        </View>

        {/* Signup Form */}
        <View className="px-5 gap-y-4">
          <InputField
            icon={icons.person}
            label="Name"
            placeholder="Enter your name"
            value={form.name}
            onChangeText={handleInputChange("name")}
          />

          <InputField
            icon={icons.email}
            label="Email"
            placeholder="Enter your email"
            value={form.email}
            onChangeText={handleInputChange("email")}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <InputField
            icon={icons.lock}
            secureTextEntry
            label="Password"
            placeholder="Enter your password"
            value={form.password}
            onChangeText={handleInputChange("password")}
          />

          <CustomButton
            title="Sign Up"
            className="mt-5"
            onPress={handleSignUp}
            isLoading={isSingingUp}
            disabled={isSingingUp}
          />

          {/* Divider */}
          <View className="flex-row items-center my-4 gap-x-2">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="text-gray-500">Or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <OAuth />

          {/* Sign in link */}
          <Link href="/sign-in" className="mt-5">
            <Text className="text-center text-gray-600">
              Already have an account?{" "}
              <Text className="font-medium text-primary-500">Sign in</Text>
            </Text>
          </Link>
        </View>
      </View>

      {/* Verification Modal */}
      <ReactNativeModal
        isVisible={verificationStatus === "pending"}
        onBackdropPress={() => setVerificationStatus("default")}
        onModalHide={() =>
          verificationStatus === "success" && setShowSuccessModal(true)
        }
      >
        <View className="bg-white gap-y-4 px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl font-bold">Verification</Text>
          <Text className="text-base">
            We&apos;ve sent a verification code to {form.email}
          </Text>

          <InputField
            icon={icons.lock}
            label="Code"
            value={verificationCode}
            placeholder="000000"
            keyboardType="numeric"
            onChangeText={setVerificationCode}
          />

          <CustomButton
            title="Verify Email"
            className="mt-5 bg-success-500"
            onPress={handleVerification}
            isLoading={isVerifying}
            disabled={isVerifying}
          />
        </View>
      </ReactNativeModal>

      {/* Success Modal */}
      <ReactNativeModal isVisible={showSuccessModal} onModalHide={navigateHome}>
        <View className="bg-white items-center gap-y-4 px-7 py-9 rounded-2xl min-h-[300px]">
          <Image source={images.check} className="w-28 h-28" />
          <Text className="text-3xl font-bold">Verified</Text>
          <Text className="text-base text-gray-500">
            You have successfully verified your account
          </Text>
          <CustomButton title="Browse home" onPress={navigateHome} />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignUp;
