import { InputFieldProps } from "@/types/type";
import React, { FC, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

const InputField: FC<InputFieldProps> = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Combine default and custom styles
  const containerDynamicStyle: StyleProp<ViewStyle> = {
    borderWidth: isFocused ? 1 : 0,
    borderColor: isFocused ? "#3b82f6" : "transparent",
  };

  const combinedContainerStyle = [
    "relative flex flex-row items-center justify-start rounded-full bg-neutral-100",
    containerStyle,
  ].join(" ");

  const combinedLabelStyle = ["text-lg mb-1", labelStyle].join(" ");
  const combinedInputStyle = [
    "rounded-full p-4 text-sm flex-1 mb-1 h-full",
    inputStyle,
  ].join(" ");
  const combinedIconStyle = ["w-6 h-6 ml-4", iconStyle].join(" ");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full my-2">
          {label && <Text className={combinedLabelStyle}>{label}</Text>}

          <View
            className={combinedContainerStyle}
            style={containerDynamicStyle}
          >
            {icon && <Image source={icon} className={combinedIconStyle} />}

            <TextInput
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholderTextColor="black"
              secureTextEntry={secureTextEntry}
              className={combinedInputStyle}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
