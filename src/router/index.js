import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Login, Register, Home, Detail, Pokebag } from '../pages';

const Stack = createNativeStackNavigator();

const MainApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
      <Stack.Screen name="Pokebag" component={Pokebag} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})