import { icons } from "@/constants";
import React from "react";
import { Image, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const onPressHandler = async () => {};

  return (
    <View>
      <CustomButton
        onPress={onPressHandler}
        title="Log in with Google"
        bgVariant="outline"
        textVariant="primary"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-5 h-5 mx-2"
            resizeMode="contain"
          />
        )}
      />
    </View>
  );
};

export default OAuth;
