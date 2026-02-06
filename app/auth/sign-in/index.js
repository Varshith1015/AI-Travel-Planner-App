import { View, Text, TextInput,StyleSheet,TouchableOpacity, ToastAndroid} from 'react-native'
import React ,{useEffect,useState} from 'react'
import {useNavigation, useLocalSearchParams} from "expo-router"
import {Colors} from  "./../../../constants/Colours"
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./../../../configs/firebaseConfig";


export default function SignIn() {
    const navigation = useNavigation()
    const router=useRouter();
    const { redirect } = useLocalSearchParams(); 
    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[])

    const [email,setEmail]=useState();
    const [password,setPassword] = useState();


    const onSignIn =()=>{

        if(!email || !password){
            ToastAndroid.show("Please enter email & password",ToastAndroid.LONG);
            return ;
        }
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
             const user = userCredential.user;
             // Redirect back to the page that sent us here, or default to mytrips
             const destination = redirect || '/mytrips';
             router.replace(destination);
             console.log(user);
            // ...
           })
          .catch((error) => {
             const errorCode = error.code;
             const errorMessage = error.message;
             console.log(errorMessage);
             if(errorCode=='auth/invalid-credentials'){
                ToastAndroid.show("Invalid Credentials",ToastAndroid.LONG)
             }
             
           });
    }

  return (
    <View style={{
        padding:25,
        paddingTop:40,
        height:'100%',    
        backgroundColor:Colors.WHITE
    }}>
        <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:30,
            marginTop:30
        }}>
            Let's Sign You In
        </Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:30,
            color:Colors.GRAY,
            marginTop:20
        }}>
            Welcome Back
        </Text>
        <Text style={{
            fontFamily:'outfit',
            fontSize:20,
            color:Colors.GRAY,
            marginTop:10
        }}>
            You have been missed!
        </Text>


        {/* Email */}
        <View style={{
            marginTop:50
        }}>
            <Text style={{
                fontFamily:'outfit',

            }}> Email </Text>
            <TextInput  style={styles.input} onChangeText={(value)=>setEmail(value)} placeholder='enter Email'></TextInput>
        </View>



        {/* //password */}
        <View style={{
            marginTop:20
        }}>
            <Text style={{
                fontFamily:'outfit',

            }}> Password </Text>
            <TextInput secureTextEntry={true} style={styles.input} onChangeText={(value)=>setPassword(value)} placeholder='enter password'></TextInput>
        </View>


        {/* Sign In Button */}
        <TouchableOpacity  onPress={onSignIn} style={{
            padding:20,
            backgroundColor:Colors.PRIMARY,
            borderRadius:15,
            marginTop:50
        }}>
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center'
            }}>Sign In</Text>
        </TouchableOpacity>

        {/* Create account Button */}
        <TouchableOpacity 
        onPress={()=>router.replace('auth/sign-up')}
            style={{
            padding:20,
            backgroundColor:Colors.WHITE,
            borderRadius:15,
            marginTop:20,
            borderWidth:1
        }}>
            <Text style={{
                color:Colors.PRIMARY,
                textAlign:'center'
            }}>Create Account</Text>
            
        </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        padding:15,
        borderWidth:1,
        borderRadius:15,
        borderColor:Colors.GRAY,
        fontFamily:'outfit',
    }
})
