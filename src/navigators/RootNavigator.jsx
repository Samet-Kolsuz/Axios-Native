import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductPage from '../screens/ProductPage';
import MainPage from '../screens/MainPage';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainPage" 
        component={MainPage} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen name="ProductPage" component={ProductPage} />
    </Stack.Navigator>
  )
}

export default RootNavigator