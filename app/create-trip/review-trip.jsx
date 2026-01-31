import { View, Text,TouchableOpacity } from 'react-native'
import React,{useEffect,useState,useContext} from 'react';
import {useNavigation} from "expo-router";
import { Colors } from '../../constants/Colours';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CreateTripContext } from '../../context/CreateTripContext';
import moment from 'moment';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';



export default function reviewTrip() {

    const navigation = useNavigation();
    const {tripData,setTripData}=useContext(CreateTripContext)

    useEffect(()=>{
        navigation.setOptions({
            headerTransparent:true,
            headerShown:true,
            headerTitle:''
        })
    },[])


  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:20,
      }}>Review  your Trip</Text>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20
        }}>
            Before generating your trip.Please review your selection
        </Text>

        {/* Destination  Info*/}
        
        <View style={{
            marginTop:40,
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            <Ionicons name="location" size={34} color="black" />
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:20,
                    color:Colors.GRAY
                }}>Destination</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:20
                }}>{tripData?.locationInfo?.name}</Text>
            </View>    
        </View>

        {/* Date Selected Info*/}


        <View style={{
            marginTop:25,
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            <EvilIcons name="calendar" size={34} color="black" />
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:20,
                    color:Colors.GRAY
                }}>Travel Date</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:20
                }}>{moment(tripData?.startDate).format('DD MMM')+"  To  "+moment(tripData?.endDate).format('DD MMM')+"  "}({tripData?.totalNoOfDays})</Text>
            </View>    
        </View>

         {/*Traveles  Info*/}


        <View style={{
            marginTop:25,
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            <FontAwesome name="bus" size={34} color="black" />
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:20,
                    color:Colors.GRAY
                }}>Who is Travelling</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:20
                }}>{tripData?.traveller?.title}</Text>
            </View>    
        </View>


        {/*Budget Info*/}

        <View style={{
            marginTop:25,
            display:'flex',
            flexDirection:'row',
            gap:20
        }}>
            <FontAwesome name="money" size={24} color="black" />
            <View>
                <Text style={{
                    fontFamily:'outfit',
                    fontSize:20,
                    color:Colors.GRAY
                }}>Budget</Text>
                <Text style={{
                    fontFamily:'outfit-medium',
                    fontSize:20
                }}>{tripData?.budget}</Text>
            </View>    
        </View>

        <TouchableOpacity 
            // onPress={()=>onClickContinue()}
            style={{
            padding:20,
            backgroundColor:Colors.PRIMARY,
            borderRadius:15,
            marginTop:80,
        }}>      
            <Text style={{
                textAlign:'center',
                color:Colors.WHITE,
                fontFamily:'outfit-medium',
                fontSize:20}}>
                Build My Trip
            </Text>
        </TouchableOpacity>


      </View>



    </View>
  )
}