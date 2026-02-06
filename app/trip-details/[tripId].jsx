import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './../../configs/firebaseConfig';
import { Colors } from './../../constants/Colours';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TripDetails() {
  const { tripId } = useLocalSearchParams();
  const router = useRouter();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId]);

  const fetchTripDetails = async () => {
    try {
      console.log('📥 Fetching trip with ID:', tripId);
      const docRef = doc(db, 'UserTrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('✅ Trip data loaded:', data);
        setTripData(data.tripData);
      } else {
        console.error('❌ No trip found with ID:', tripId);
      }
    } catch (error) {
      console.error('❌ Error fetching trip:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.WHITE }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
        <Text style={{ fontFamily: 'outfit', marginTop: 10 }}>Loading your trip...</Text>
      </View>
    );
  }

  if (!tripData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.WHITE, padding: 25 }}>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 20 }}>Trip not found</Text>
        <TouchableOpacity
          onPress={() => router.replace('/mytrips')}
          style={{ marginTop: 20, backgroundColor: Colors.PRIMARY, padding: 15, borderRadius: 15 }}
        >
          <Text style={{ fontFamily: 'outfit-medium', color: Colors.WHITE }}>Go to My Trips</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const plan = tripData.travelPlan;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      {/* Header */}
      <View style={{ padding: 25, paddingTop: 60, backgroundColor: Colors.PRIMARY }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 15 }}>
          <Ionicons name="arrow-back" size={28} color={Colors.WHITE} />
        </TouchableOpacity>
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 32, color: Colors.WHITE }}>
          {plan?.location || 'Your Trip'}
        </Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.WHITE, marginTop: 5 }}>
          {plan?.duration} • {plan?.travelers}
        </Text>
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, color: Colors.WHITE, marginTop: 5 }}>
          Budget: {plan?.budget}
        </Text>
      </View>

      {/* Flight Details */}
      {plan?.flights && (
        <View style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: Colors.LIGHT_GRAY }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Ionicons name="airplane" size={24} color={Colors.PRIMARY} />
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, marginLeft: 10 }}>Flight Details</Text>
          </View>

          <View style={{ backgroundColor: Colors.LIGHT_GRAY, padding: 15, borderRadius: 15 }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>
              {plan.flights.airline} - {plan.flights.flightNumber}
            </Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY, marginTop: 5 }}>
              Departure: {plan.flights.departure}
            </Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }}>
              Arrival: {plan.flights.arrival}
            </Text>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 18, color: Colors.PRIMARY, marginTop: 10 }}>
              {plan.flights.price}
            </Text>
            {plan.flights.bookingUrl && (
              <TouchableOpacity
                onPress={() => console.log('Open booking URL:', plan.flights.bookingUrl)}
                style={{ marginTop: 10, backgroundColor: Colors.PRIMARY, padding: 10, borderRadius: 10, alignItems: 'center' }}
              >
                <Text style={{ fontFamily: 'outfit-medium', color: Colors.WHITE }}>Book Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Hotel Options */}
      {plan?.hotels && plan.hotels.length > 0 && (
        <View style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: Colors.LIGHT_GRAY }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Ionicons name="bed" size={24} color={Colors.PRIMARY} />
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, marginLeft: 10 }}>Hotel Options</Text>
          </View>

          {plan.hotels.map((hotel, index) => (
            <View key={index} style={{ backgroundColor: Colors.LIGHT_GRAY, padding: 15, borderRadius: 15, marginBottom: 15 }}>
              <Text style={{ fontFamily: 'outfit-bold', fontSize: 18 }}>{hotel.hotelName}</Text>
              <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY, marginTop: 5 }}>
                {hotel.hotelAddress}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={{ fontFamily: 'outfit', fontSize: 14, marginLeft: 5 }}>{hotel.rating}</Text>
              </View>
              <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY, marginTop: 8 }}>
                {hotel.description}
              </Text>
              <Text style={{ fontFamily: 'outfit-bold', fontSize: 16, color: Colors.PRIMARY, marginTop: 10 }}>
                {hotel.price}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Daily Itinerary */}
      {plan?.itinerary && plan.itinerary.length > 0 && (
        <View style={{ padding: 25, paddingBottom: 40 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <Ionicons name="calendar" size={24} color={Colors.PRIMARY} />
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, marginLeft: 10 }}>Daily Itinerary</Text>
          </View>

          {plan.itinerary.map((dayPlan, dayIndex) => (
            <View key={dayIndex} style={{ marginBottom: 25 }}>
              <Text style={{ fontFamily: 'outfit-bold', fontSize: 20, color: Colors.PRIMARY, marginBottom: 10 }}>
                Day {dayPlan.day}: {dayPlan.title}
              </Text>

              {dayPlan.places && dayPlan.places.map((place, placeIndex) => (
                <View key={placeIndex} style={{ backgroundColor: Colors.LIGHT_GRAY, padding: 15, borderRadius: 15, marginBottom: 10 }}>
                  <Text style={{ fontFamily: 'outfit-bold', fontSize: 16 }}>{place.placeName}</Text>
                  <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY, marginTop: 5 }}>
                    {place.placeDetails}
                  </Text>

                  <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                    <View>
                      <Text style={{ fontFamily: 'outfit', fontSize: 12, color: Colors.GRAY }}>Best Time</Text>
                      <Text style={{ fontFamily: 'outfit-medium', fontSize: 14 }}>{place.bestTimeToVisit}</Text>
                    </View>
                    <View>
                      <Text style={{ fontFamily: 'outfit', fontSize: 12, color: Colors.GRAY }}>Duration</Text>
                      <Text style={{ fontFamily: 'outfit-medium', fontSize: 14 }}>{place.timeToTravel}</Text>
                    </View>
                    <View>
                      <Text style={{ fontFamily: 'outfit', fontSize: 12, color: Colors.GRAY }}>Ticket</Text>
                      <Text style={{ fontFamily: 'outfit-medium', fontSize: 14, color: Colors.PRIMARY }}>
                        {place.ticketPricing}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Bottom Action Button */}
      <View style={{ padding: 25, paddingBottom: 40 }}>
        <TouchableOpacity
          onPress={() => router.replace('/mytrips')}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 15,
            borderRadius: 15,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Ionicons name="checkmark-circle" size={24} color={Colors.WHITE} />
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 16, color: Colors.WHITE, marginLeft: 10 }}>
            Go to My Trips
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}