// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/Home/HomeScreen';
import TasksScreen from './src/screens/Tasks/TasksScreen';
import ListScreen from './src/screens/List/ListScreen';
import { RootStack } from './src/types/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store/store'; 

const Stack = createNativeStackNavigator<RootStack>();

export default function App() {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Principal' }} />
          <Stack.Screen name="Tasks" component={TasksScreen} options={{ title: 'Tasks' }} />
          <Stack.Screen name="List" component={ListScreen} options={{ title: 'Listado' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}