import { View, Text, Image} from 'react-native'
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
    const router = useRouter();
    
   useEffect(() => {
    if (tripData) {
        GenerateAiTrip();
    }
    }, [tripData]);

    const GenerateAiTrip=async ()=>{
        setLoading(true);

        

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
                console.log(result.response.text());
                const tripResp = JSON.parse(result.response.text());
                const docId=(Date.now()).toString();

                const result_= await setDoc(doc(db,"UserTrips",docId),{
                    userEmail:user.email,
                    tripData:tripResp
                })
                setLoading(false);
                router.push('(tabs)/mytrips')

        } catch (error) {
        console.error("Error generating trip:", error);
        // Handle error (show alert to user)
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

    
    </View>
  )       
};
 
