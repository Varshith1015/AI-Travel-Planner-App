import { View, Text ,Image,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colours'
import { useRouter } from 'expo-router'

export default function Login() {

    const router=useRouter();

  return (
    <View>
      <Image source={require('./../assets/images/login.jpg')}
       style={{
        width:'100%',
        height:500
       }}/>
       <View style={styles.container}>
        <Text style={{
            fontSize:28,
            fontFamily:'outfit-bold',
            textAlign:'center',
            
        }}>
            AI Travel Planner
        </Text> 

        <Text style={{
            fontSize:17,
            fontFamily:'outfit',
            textAlign:'center',
            color:Colors.GRAY,
            marginTop:25
        }}>
            Discover your next adventure effortlessly. Personalized itineraries at your fingertips.Travel smarter with AI-driven insights.
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>router.push('auth/sign-in')}>
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center',
                fontFamily:'outfit',
                fontSize:17
            }}>Get Started</Text>
        </TouchableOpacity>
       </View>
    </View>
  )
}

//external styling
const styles=StyleSheet.create({
    container:{
        backgroundColor:Colors.WHITE,
        marginTop:-20,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:15,
        height:'100%'
    },
    button:{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        marginTop:'20%',
    }
})
