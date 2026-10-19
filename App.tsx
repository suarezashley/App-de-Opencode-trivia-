import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/HomeScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ResultScreen from "./src/screens/ResultScreen";
import { colors } from "./src/styles/theme";

export type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
  Result: { score: number; total: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [quizKey, setQuizKey] = useState(0);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: "fade",
          }}
        >
          <Stack.Screen name="Home">
            {({ navigation }) => (
              <HomeScreen
                onStart={() => {
                  setQuizKey((prev) => prev + 1);
                  navigation.navigate("Quiz");
                }}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Quiz" key={quizKey}>
            {({ navigation }) => (
              <QuizScreen
                onFinish={(score) => {
                  navigation.replace("Result", {
                    score,
                    total: 10,
                  });
                }}
              />
            )}
          </Stack.Screen>

          <Stack.Screen name="Result">
            {({ navigation, route }) => (
              <ResultScreen
                score={route.params.score}
                total={route.params.total}
                onRestart={() => {
                  setQuizKey((prev) => prev + 1);
                  navigation.replace("Home");
                }}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
