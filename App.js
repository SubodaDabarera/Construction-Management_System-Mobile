import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/screens/Home';
import MyCart from './components/screens/MyCart';
import ProductInfo from './components/screens/ProductInfo';
import DeliveryNote from './components/screens/DeliveryNote';
import SignIn from './components/screens/SignIn';
import OrderHistory from './components/screens/OrderHistory';
import OrderedItems from './components/screens/OrderedItems';
import ApprovedDeliveryNote from './components/screens/ApprovedDeliveryNote';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="DeliveryNote" component={DeliveryNote} />
        <Stack.Screen name="OrderHistory" component={OrderHistory} />
        <Stack.Screen name="OrderedItems" component={OrderedItems} />
        <Stack.Screen name="ApprovedDeliveryNote" component={ApprovedDeliveryNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontSize: 20,
    fontFamily: 'Demo_ConeriaScript',
  },
});

export default App;
