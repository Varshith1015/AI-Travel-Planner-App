import { View, Text,FlatList,TouchableOpacity,ToastAndroid} from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import {useNavigation,useRouter} from "expo-router";
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from "./../../components/CreateTrip/OptionCard"
import { Colors } from '../../constants/Colours';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function selectBudget() {

    const navigation = useNavigation();
    const [selectedOption,setSelectedOption]=useState();
    const {tripData,setTripData}=useContext(CreateTripContext);
    const router = useRouter();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    },[])

    useEffect(()=>{
        selectedOption && setTripData({
            ...tripData,
            budget:selectedOption?.title
        })
    },[selectedOption])

    const onClickContinue=()=>{
        if(!selectedOption){
            ToastAndroid.show('Select your Budget',ToastAndroid.LONG);
            return ;
        }
        router.push('/create-trip/review-trip');
    }

  return (
    <View style={{
        paddingTop:50,
        padding:25,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:20
      }}>Budget</Text>

      <View style={{
        marginTop:10
      }}>
        <Text style={{
            fontSize:18,
            fontFamily:'outfit-bold'
        }}>
            Choose spending habit for your trip
        </Text>

        <FlatList 
          data={SelectBudgetOptions}
            renderItem={({item,index})=>(
                <TouchableOpacity 

                onPress={()=>setSelectedOption(item)}
                
                style={{marginVertical:10}}>
                    <OptionCard option={item} selectedOption={selectedOption}/>
                </TouchableOpacity>
            )}
        />

        <TouchableOpacity 
           onPress={()=>onClickContinue()}
            style={{
            padding:20,
            backgroundColor:Colors.PRIMARY,
            borderRadius:15,
            marginTop:20,
        }}>      
            <Text style={{
                textAlign:'center',
                color:Colors.WHITE,
                fontFamily:'outfit-medium',
                fontSize:20}}>
                Continue
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}