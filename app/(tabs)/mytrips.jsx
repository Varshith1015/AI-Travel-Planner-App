import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React,{useState, useEffect} from 'react'
import {Colors} from "./../../constants/Colours"
import Ionicons from '@expo/vector-icons/Ionicons';
import StartNewTripCard from "./../../components/MyTrips/StartNewTripCard"
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from './../../configs/firebaseConfig';
import { useRouter } from 'expo-router';

export default function MyTrips() {

  const[userTrips,setUserTrips]=useState([]);
  const[loading, setLoading]=useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      GetMyTrips();
    }
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });
      setUserTrips(trips);
      console.log('✅ Fetched trips:', trips.length);
    } catch (error) {
      console.error('❌ Error fetching trips:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={{ fontFamily: 'outfit', marginTop: 10 }}>Loading trips...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{
      padding:25,
      paddingTop:55,
      backgroundColor:Colors.WHITE,
      height:'100%',
    }}>

      <View
       style={{
        display:'flex',
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'space-between',
       }}
      >
        <Text style={{
          fontFamily:'outfit-bold',
          fontSize:30
        }}>My Trips</Text>
        <Ionicons
          name="add-circle"
          size={50}
          color="black"
          onPress={() => router.push('/create-trip/search-place')}
        />
      </View>

      {userTrips?.length === 0 ? (
        <StartNewTripCard />
      ) : (
        <View style={{ marginTop: 20 }}>
          {userTrips.map((trip, index) => (
            <View
              key={trip.id}
              style={{
                backgroundColor: Colors.LIGHT_GRAY,
                padding: 20,
                borderRadius: 15,
                marginBottom: 15,
              }}
            >
              <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>
                {trip.tripData?.travelPlan?.location || 'Trip'}
              </Text>
              <Text style={{ fontFamily: 'outfit', fontSize: 14, marginTop: 5, color: Colors.GRAY }}>
                {trip.tripData?.travelPlan?.duration || 'Duration not specified'}
              </Text>
              <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }}>
                {trip.tripData?.travelPlan?.travelers || 'Travelers not specified'}
              </Text>
              <Text style={{ fontFamily: 'outfit-medium', fontSize: 16, marginTop: 10, color: Colors.PRIMARY }}>
                Budget: {trip.tripData?.travelPlan?.budget || 'Not specified'}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  )
}