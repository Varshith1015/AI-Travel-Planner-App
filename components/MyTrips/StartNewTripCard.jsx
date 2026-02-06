import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Colours';
import { useRouter } from 'expo-router';


export default function StartNewTripCard() {

  const router= useRouter();

  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:20

    }}>
      <Ionicons name="location-sharp" size={24} color="black" />
      <Text style={{
        fontSize:25,
        fontFamily:'outfit-medium',
        marginTop:10
      }}>No Trips Planned
      </Text>

      <Text style={{
        fontSize:20,
        fontFamily:'outfit',
        marginTop:10,
        textAlign:'center',
        color:Colors.GRAY
      }}>Looks like it is time to plan a new travel experience! Get Started below.
      </Text>

      <TouchableOpacity 
        onPress={()=>router.push('/create-trip/search-place')} 
        style={{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:15,
        paddingHorizontal:30

      }}>
        <Text style={{
            color:Colors.WHITE,
            fontFamiliy:'outfit-medium'
        }}>
            Start a new Trip
        </Text>
      </TouchableOpacity>


    </View>
  )
}