import { Link } from "expo-router";
import { Text, View } from "react-native";
import './global.css';

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center font-extrabold">
      <Text className="text-5xl text-primary">Welcome.</Text>
      <Link href="./onboarding">Onboarding</Link>
      
    </View>
  );
}
