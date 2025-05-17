import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    // Show a loading indicator while auth state is loading
    return (
      <View className="items-center justify-center flex-1 bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return <Redirect href={isSignedIn ? "/home" : "/welcome"} />;
}
