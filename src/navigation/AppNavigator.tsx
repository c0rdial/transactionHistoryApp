import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from '../pages/LandingPage';
import UserAuthPage from '../pages/UserAuthPage';
import TransactionHistoryScreen from '../pages/TransactionHistoryPage';
import TransactionDetailScreen from '../pages/TransactionDetailsPage';

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
        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
          options={{ title: 'Transaction History' }}
        />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{ title: 'Transaction Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}