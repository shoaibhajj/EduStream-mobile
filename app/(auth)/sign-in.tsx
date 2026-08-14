import { View } from "react-native";
import { AuthView } from "@clerk/expo/native";

export default function SignInScreen() {
  return (
    <View className="flex-1 bg-background">
      <AuthView mode="signIn" isDismissible={false} />
    </View>
  );
}
