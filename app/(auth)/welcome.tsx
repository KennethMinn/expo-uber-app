import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const DOT_STYLE = "w-[32px] h-[4px] mx-1 rounded-full";
const INACTIVE_DOT = <View className={`${DOT_STYLE} bg-[#E2E8F0]`} />;
const ACTIVE_DOT = <View className={`${DOT_STYLE} bg-[#0286FF]`} />;

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleNext = () => {
    if (isLastSlide) {
      router.replace("/sign-up");
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <SafeAreaView className="items-center justify-between flex-1">
      {/* Skip Button */}
      <TouchableOpacity
        onPress={() => router.replace("/sign-up")}
        className="p-5 ms-auto"
      >
        <Text className="font-semibold">Skip</Text>
      </TouchableOpacity>

      {/* Swiper Slides */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={INACTIVE_DOT}
        activeDot={ACTIVE_DOT}
        onIndexChanged={setActiveIndex}
      >
        {onboarding.map((item) => (
          <View
            key={item.id}
            className="items-center justify-center mt-12 gap-y-5"
          >
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <Text className="mx-5 text-4xl font-bold text-center">
              {item.title}
            </Text>
            <Text className="text-xl text-center opacity-50">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      {/* Next Button */}
      <CustomButton title="Next" className="w-10/12" onPress={handleNext} />
    </SafeAreaView>
  );
};

export default Welcome;
