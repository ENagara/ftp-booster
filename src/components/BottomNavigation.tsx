import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// ナビゲータ
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Colors from '../configs/Colors';
import { BottomTabParamList, FeedParamList, GraphParamList, SettingsParamList } from '../configs/Types';

// 画面
import FeedScreen from '../screens/FeedScreen';
import GraphScreen from '../screens/GraphScreen';
import SettingsScreen from '../screens/SettingsScreen';

const DISP_FEED = 'フィード';
const DISP_GRAPH = 'グラフ';
const DISP_SETTINGS = '設定';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default class BottomNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='Feed'
          tabBarOptions={{
            activeTintColor: Colors.tint,
          }}>
          <Tab.Screen name='Feed' component={FeedNavigator} options={{
            tabBarIcon: getTabNavigatorIcon('home'),
            tabBarLabel: DISP_FEED,
          }} />
          <Tab.Screen name='Graph' component={GraphNavigator} options={{
            tabBarIcon: getTabNavigatorIcon('linechart'),
            tabBarLabel: DISP_GRAPH,
          }} />
          <Tab.Screen name='Settings' component={SettingsNavigator} options={{
            tabBarIcon: getTabNavigatorIcon('setting'),
            tabBarLabel: DISP_SETTINGS,
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

/** AntDesignアイコン読み込み */
const getTabNavigatorIcon = (name: string) => ({ color, size }: {
  color: string;
  size: number;
}) => <AntDesign name={name} color={color} size={size} />;

/** ------- スタックに積むスクリーン設定 ------- */
const FeedStack = createStackNavigator<FeedParamList>();
const FeedNavigator = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name='FeedScreen'
        component={FeedScreen}
        options={ScreenOptions(DISP_FEED)}
      />
    </FeedStack.Navigator>
  );
}

const GraphStack = createStackNavigator<GraphParamList>();
const GraphNavigator = () => {
  return (
    <GraphStack.Navigator>
      <GraphStack.Screen
        name='GraphScreen'
        component={GraphScreen}
        options={ScreenOptions(DISP_GRAPH)}
      />
    </GraphStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();
const SettingsNavigator = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name='SettingsScreen'
        component={SettingsScreen}
        options={ScreenOptions(DISP_SETTINGS)}
      />
    </SettingsStack.Navigator>
  );
}

const ScreenOptions = (title: string) => {
  return {
    headerTitle: title,
    headerTitleStyle: { color: Colors.background },
    headerStyle: { backgroundColor: Colors.tint }
  }
}
