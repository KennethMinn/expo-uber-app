import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  const { isSignedIn } = useAuth();

  return <Redirect href={isSignedIn ? "/home" : "/welcome"} />;
}
