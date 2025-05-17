import { ButtonProps } from "@/types/type";
import { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

// Constants for variant styles
const BG_VARIANTS = {
  primary: "bg-[#0286FF]",
  secondary: "bg-gray-500",
  danger: "bg-red-500",
  success: "bg-green-500",
  outline: "bg-transparent border-neutral-300 border-[0.5px]",
} as const;

const TEXT_VARIANTS = {
  default: "text-white",
  primary: "text-black",
  secondary: "text-gray-100",
  danger: "text-red-100",
  success: "text-green-100",
} as const;

const CustomButton: FC<ButtonProps> = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  isLoading,
  IconLeft,
  IconRight,
  className = "",
  ...props
}) => {
  // Get styles based on variants
  const bgStyle = BG_VARIANTS[bgVariant] || BG_VARIANTS.primary;
  const textStyle = TEXT_VARIANTS[textVariant] || TEXT_VARIANTS.default;

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`
        w-full rounded-full p-3 
        flex flex-row justify-center items-center 
        shadow-md shadow-neutral-400/70 
        ${bgStyle} ${className}
      `}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading && <ActivityIndicator className="w-5 h-5 mx-2 " />}
      {IconLeft && <IconLeft testID="button-icon-left" />}
      <Text className={`text-lg font-bold ${textStyle}`}>{title}</Text>
      {IconRight && <IconRight testID="button-icon-right" />}
    </TouchableOpacity>
  );
};

export default CustomButton;
