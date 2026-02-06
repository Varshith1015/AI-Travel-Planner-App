import { View, Text, Image, TouchableOpacity} from 'react-native'
import React,{useContext,useEffect,useState} from 'react'
import { Colors } from '../../constants/Colours'
import {CreateTripContext} from "../../context/CreateTripContext";
import {AI_PROMPT} from "../../constants/Options"
import { chatSession } from '../../configs/AIModel';
import {useRouter} from "expo-router";
import {doc,setDoc} from "firebase/firestore";
import {auth,db} from "./../../configs/firebaseConfig";


export default function GenerateTrip() {

    const {tripData,setTripData}=useContext(CreateTripContext);
    const [loading,setLoading]=useState(false);
    const [hasGenerated,setHasGenerated]=useState(false);
    const router = useRouter();

   useEffect(() => {
    if (tripData && !hasGenerated) {
        GenerateAiTrip();
    }
    }, [tripData]);

    const GenerateAiTrip=async ()=>{
        setLoading(true);
        setHasGenerated(true);



        try{
            const user= auth.currentUser;
            if(!user){
                console.log("User not logged");
                router.push('/auth/sign-in');
                return;
            }

            const FINAL_PROMPT=AI_PROMPT
                .replace('{location}',tripData?.locationInfo?.name)
                .replace('{totalDays}',tripData?.totalNoOfDays)
                .replace('{totalNights}',tripData?.totalNoOfDays-1)
                .replace('{traveller}',tripData?.traveller?.title)
                .replace('{budget}',tripData?.budget)
                .replace('{totalDays}',tripData?.totalNoOfDays)
                .replace('{totalNights}',tripData?.totalNoOfDays-1)

                console.log(FINAL_PROMPT);

                const result=await chatSession.sendMessage(FINAL_PROMPT);
                const responseText = result.response.text();
                console.log('✅ AI Response:', responseText);

                const tripResp = JSON.parse(responseText);
                console.log('✅ Parsed JSON:', tripResp);

                const docId=(Date.now()).toString();
                console.log('📝 Saving to Firestore with ID:', docId);
                console.log('👤 User email:', user.email);

                // Save to Firestore without blocking (fire and forget)
                const docRef = doc(db, "UserTrips", docId);
                setDoc(docRef, {
                    userEmail: user.email,
                    tripData: tripResp,
                    createdAt: new Date().toISOString()
                }).then(() => {
                    console.log('✅ Saved to Firestore successfully');
                }).catch((firestoreError) => {
                    console.error('❌ Firestore save error:', firestoreError.message);
                });

                // Clear trip data to prevent re-triggers
                setTripData(null);
                setLoading(false);

                // Navigate immediately without waiting for Firestore
                console.log('🚀 Navigating to trip details page...');
                console.log('📍 Navigation path:', `/trip-details/${docId}`);

                router.push(`/trip-details/${docId}`);

                console.log('✅ Navigation command executed to trip-details/' + docId);

        } catch (error) {
            console.error("❌ Error generating trip:", error);
            console.error("Error details:", error.message);
            alert("Failed to generate trip. Please try again.");
            router.back();
        } finally {
            setLoading(false);
        }    
    }

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
        textAlign:'center'
      }}>Please Wait....</Text>

      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20,
        textAlign:'center',
        marginTop:14
      }}>We are working to generate your dream trip</Text>

      <Image source={require('./../../assets/images/air-plane.png')} 
      style={{
        width:'100%',
        height:200,
        objectFit:'contain'
      }}
      />

      <Text style={{
        fontFamily:'outfit',
        color:Colors.GRAY,
        fontSize:20,
        textAlign:'center'
      }}>Do not go back</Text>

      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginTop: 30,
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          borderRadius: 15,
          alignItems: 'center'
        }}
      >
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 16,
          color: Colors.WHITE
        }}>Go Back</Text>
      </TouchableOpacity>

    </View>
  )
};
 
