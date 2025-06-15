import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';

import SummaryScreen from '../screens/SummaryScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import { Colors } from '../../constants';
import { Image } from 'react-native';
import { getImage } from '../../constants/images';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: 'home',
  Create: 'add',
  Summary: 'summary', 
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
            const iconName = tabIcons[route.name as keyof typeof tabIcons] || '';
            return (
              <Image source={getImage(iconName)} />
            );
        },
        tabBarIconStyle: {
          marginVertical: 10,
          width: 50, 
          height: 50
        },
        tabBarStyle: {
            backgroundColor: Colors.navBarBackground[1],
            borderTopWidth: 0,
            height: 100,
            alignContent: 'center'
        },
        tabBarActiveTintColor: Colors.navTabActive,
        tabBarInactiveTintColor: Colors.navTabInactive,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Create" component={CreateNoteScreen} options={{ tabBarLabel: '', tabBarStyle: {display: 'none'}}}/>
      <Tab.Screen name="Summary" component={SummaryScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
