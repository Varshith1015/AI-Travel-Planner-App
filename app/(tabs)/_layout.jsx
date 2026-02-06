import { View, Text } from 'react-native'
import React from 'react';
import {Tabs} from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import {Colors} from "./../../constants/Colours.ts";


export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:Colors.PRIMARY}}
      >
        <Tabs.Screen name="mytrips" 
          options={{
            tabBarLabel:'My Trips',
            tabBarIcon:({color})=><Ionicons name="location-sharp" size={24} color="{color}" />,
           
          }}  
        />
        <Tabs.Screen name="discover"
        options={{
          tabBarLabel:'Discover',
          tabBarIcon:({color})=><Ionicons name="globe-sharp" size={24} color="black" />,
        }}/>
        <Tabs.Screen name="profile"
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="people-circle" size={24} color="black" />,
        }}  
        />
    </Tabs>
  )
}
