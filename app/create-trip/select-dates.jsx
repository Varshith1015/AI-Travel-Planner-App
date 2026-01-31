import { View, Text,TouchableOpacity } from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import {Link, useNavigation,useRouter } from 'expo-router';
import { Colors } from '../../constants/Colours';
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import {CreateTripContext} from "./../../context/CreateTripContext";

export default function SelectDate() {

  const navigation = useNavigation();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const {tripData,setTripData}=useContext(CreateTripContext);
  const router =useRouter();


  const onDateChange = (date, type) => {
    console.log(date,type)
    if (type === 'START_DATE') {
      setStartDate(moment(date));
      setEndDate(null);
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionContinue=()=>{
    if(!startDate && !endDate){
      ToastAndroid.show('Please select start and end date')
      return ;
    }
    const totalNoOfDays=endDate.diff(startDate,'days');
      console.log(totalNoOfDays+1);
      setTripData({...tripData,
        startDate:startDate,
        endDate:endDate,
        totalNoOfDays:totalNoOfDays+1
      },[])
      router.push('/create-trip/select-budget');
    };
  
    
    
    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })

        
    },[]);

  return (
    <View
    style={{
        padding:25,
        paddingTop:75,
        backgroundColor:Colors.WHITE,
        height:'100%'
    }}>
      <Text
      style={{
        fontFamily:'outfit-bold',
        fontSize:35,
        marginTop:20
      }}>Travel Dates</Text>

      
      
      <View style={{
        marginTop:30,

      }}>
        <CalendarPicker
        allowRangeSelection={true}
        minDate={new Date()}
        // selectedStartDate={startDate}
        // selectedEndDate={endDate}
        onDateChange={onDateChange}
        maxRangeDuration={5}
        
      />
      </View>
      

      <TouchableOpacity 
      onPress ={onDateSelectionContinue}
          style={{
          padding:20,
          backgroundColor:Colors.PRIMARY,
          borderRadius:15,
          marginTop:35,
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
  )
}