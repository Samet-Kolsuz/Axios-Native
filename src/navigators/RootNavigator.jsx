import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProductPage from '../screens/ProductPage';
import MainPage from '../screens/MainPage';
import CartPage from '../screens/CartPage';

const Stack = createStackNavigator();
const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <View style={{alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('CartPage')}
              style={{marginRight: 20}}>
              <Text>CART</Text>
            </TouchableOpacity>
          </View>
        )
      })}>
      
      <Stack.Screen
        name="MainPage"
        component={MainPage}
        options={{ headerShown: false }} 
      />
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="CartPage" component={CartPage} />
    </Stack.Navigator>
  )
}

export default RootNavigator