import React from 'react';
import { NavigationContainer } from'@react-navigation/native';
import { createNativeStackNavigator } from'@react-navigation/native-stack';
import AddressList from './components/AddressList';
import MapScreen from './components/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Address List">
      <Stack.Screen name="My Places" component={AddressList} />
      <Stack.Screen name="MapScreen" component={MapScreen} options={{
        headerTitle: 'Map',
      }} />
    </Stack.Navigator>
  </NavigationContainer>
    
  );
}
