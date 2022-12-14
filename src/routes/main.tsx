import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, ProfileScreen, SearchScreen} from '../screens';
import HomeIcons from 'react-native-vector-icons/Ionicons';
import ProfileIcon from 'react-native-vector-icons/FontAwesome5';
import SearchIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../config/constant';

export type BottmoParamList = {
  HomeScreen: undefined;
  ProfileScreen: undefined;
  SearchScreen: undefined;
};

const Tab = createBottomTabNavigator<BottmoParamList>();

export const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.INACTIVE,
        tabBarLabelStyle: {fontSize: 12, fontFamily: 'Raleway-Regular'},
        tabBarStyle: {
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color}) => (
            <HomeIcons name="home" size={20} color={color} />
          ),
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Pencarian',
          tabBarIcon: ({color}) => (
            <SearchIcon name="cloud-search" size={25} color={color} />
          ),
        }}
        name="SearchScreen"
        component={SearchScreen}
      />
      <Tab.Screen
        options={{
          title: 'Pengaturan',
          tabBarLabel: 'Pengaturan',
          tabBarIcon: ({color}) => (
            <ProfileIcon name="user-cog" size={20} color={color} />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
