import React from 'react';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const Feed = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>welcome Feed</Text></View>;
export const Graph = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Graph</Text></View>;
export const Columns = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Columns</Text></View>;
export const Settings = () => <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Settings</Text></View>;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#de8f18',
        }}>
        <Tab.Screen name="Feed" component={Feed} options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />),
        }} />
        <Tab.Screen name="Graph" component={Graph} options={{
          tabBarLabel: 'Graph',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" color={color} size={size} />),
        }} />
        <Tab.Screen name="Columns" component={Columns} options={{
          tabBarLabel: 'Columns',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" color={color} size={size} />),
        }} />
        <Tab.Screen name="Settings" component={Settings} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" color={color} size={size} />),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

