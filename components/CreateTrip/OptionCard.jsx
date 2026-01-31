import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colours'
export default function OptionCard({option,selectedTraveller}) {
  return (
    <View style={[{
      padding:20,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:Colors.LIGHT_GRAY,
      borderRadius:20
    },selectedTraveller?.id==option?.id&&{borderWidth:3}]}>
      <View>
        <Text style={{
          fontSize:20,
          fontFamily:'outfit-bold'
        }}>{option?.title}</Text>
        <Text style={{
          fontSize:17,
          fontFamily:'outfit',
          color:Colors.GRAY
        }}>{option?.desc}</Text>

      </View>
      
    </View>
  )
}