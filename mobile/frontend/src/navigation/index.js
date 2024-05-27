import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BuyElectricity from "../screens/pages/meter";
import Valid from "../screens/pages/valid";
import Token from "../screens/pages/token";

// const Tabs = createBottomTabNavigator()

export default function Navigator() {
  return <AppNavigation />;
}

export function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Buy">
      <Stack.Screen
        name="Buy"
        component={BuyElectricity}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Valid"
        component={Valid}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Token"
        component={Token}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
