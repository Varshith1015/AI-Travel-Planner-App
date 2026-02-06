import { View, Text } from 'react-native'
import React,{useEffect,useContext} from 'react';
import { useNavigation ,useRouter} from 'expo-router';
import { Colors } from '../../constants/Colours';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {CreateTripContext} from "./../../context/CreateTripContext";


export default function searchPlace() {
    const navigation =useNavigation();
    const {tripData,setTripData}=useContext(CreateTripContext);
    const router =useRouter();

    useEffect(()=>{
      navigation.setOptions({
        headerShown:true,
        headerTransparent:true,
        headerTitle:'Search'
      })

      // Debug: Check API key
      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY || 'AIzaSyARY3Uu_Bk3CwviHnwt76rPJbC9rHPXJh4';
      console.log('🔑 API Key loaded:', apiKey ? 'YES (length: ' + apiKey.length + ')' : 'NO');
    },[]);

    useEffect(()=>{
      console.log('Trip Data:', tripData);
    },[tripData])

  return (
    <View style={{
      padding:25,
      paddingTop:75,
      backgroundColor:Colors.WHITE,
      height:'100%'
    }}>
      <View style={{ marginTop: 25 }}>
        <GooglePlacesAutocomplete
          placeholder='Search Place'
          fetchDetails={true}
          minLength={2}
          enablePoweredByContainer={false}
          debounce={400}
          onPress={(data, details = null) => {
            console.log('✅ Place selected:', data.description);
            console.log('📍 Coordinates:', details?.geometry.location);
            console.log('📷 Photo:', details?.photos?.[0]?.photo_reference);
            console.log('🔗 URL:', details?.url);

            setTripData({
              locationInfo:{
                name:data.description,
                coordinates:details?.geometry.location,
                photoRef:details?.photos?.[0]?.photo_reference,
                url:details?.url
              }
            })

            router.push('/create-trip/Select-Traveller')
          }}
          query={{
            key: 'AIzaSyARY3Uu_Bk3CwviHnwt76rPJbC9rHPXJh4',
            language: 'en',
            types: '(cities)',
          }}
          onFail={(error) => {
            console.error('❌ Google Places Error:', error);
          }}
          onNotFound={() => {
            console.log('⚠️ No results found');
          }}
          textInputProps={{
            onChangeText: (text) => {
              console.log('🔤 User typed:', text);
            }
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInputContainer:{
              borderWidth:1,
              borderRadius:5,
              backgroundColor: Colors.WHITE,
            },
            textInput: {
              height: 44,
              fontSize: 16,
              fontFamily: 'outfit',
            },
            listView: {
              position: 'absolute',
              top: 45,
              backgroundColor: Colors.WHITE,
              borderWidth: 1,
              borderColor: Colors.LIGHT_GRAY,
              borderRadius: 5,
              zIndex: 1000,
            },
            row: {
              backgroundColor: Colors.WHITE,
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            separator: {
              height: 0.5,
              backgroundColor: Colors.LIGHT_GRAY,
            },
          }}
        />
      </View>
    </View>
  )
}