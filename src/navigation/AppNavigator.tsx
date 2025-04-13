import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from '../pages/LandingPage';
import UserAuthPage from '../pages/UserAuthPage';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserAuth"
          component={UserAuthPage}
          options={{ title: 'User Authentication' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}