import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStack } from '../types/navigation';
import HomeScreen from '../screens/Home/HomeScreen';
import TasksScreen from '../screens/Tasks/TasksScreen';
import ListScreen from '../screens/List/ListScreen';

const Stack = createStackNavigator<RootStack>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home', headerShown: false }}
      />
      <Stack.Screen 
        name="Tasks" 
        component={TasksScreen} 
        options={{ title: '' }} 
      />
      <Stack.Screen 
        name="List" 
        component={ListScreen} 
        options={{ title: '' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
