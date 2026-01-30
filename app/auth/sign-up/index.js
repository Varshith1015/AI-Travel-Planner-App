import { View, Text, TextInput,StyleSheet,TouchableOpacity, ToastAndroid} from 'react-native'
import React ,{useEffect,useState} from 'react'
import {useNavigation} from "expo-router"
import {Colors} from  "./../../../constants/Colours"
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from './../../../configs/firebaseConfig';


export default function SignUp() {
    const navigation = useNavigation()
    const router=useRouter();
    useEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    },[]);

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [fullName,setFullName]=useState("");

    const onCreateAccount=()=>{

        if(!email || !password ||!fullName){
           ToastAndroid.show('Please Enter all details',ToastAndroid.BOTTOM);
           return;
        }
        
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up  
            const user = userCredential.user;
            router.replace('/mytrips');
            console.log(user);
            // ...
           })
          .catch((error) => {
           const errorCode = error.code;
           const errorMessage = error.message;
           console.log(errorMessage,errorCode);
         // ..
          });
    }

  return (
    <View style={{
        padding:25,
        paddingTop:50,
        height:'100%',    
        backgroundColor:Colors.WHITE
    }}>

        <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30,
        marginTop:30,
        }}>Create New Account</Text>


         {/*User Full Name */}
        <View style={{
            marginTop:50
        }}>
            <Text style={{
              fontFamily:'outfit',
            }}> Full Name </Text>
            <TextInput  style={styles.input} placeholder='Enter Full Name' onChangeText={(value)=>setFullName(value)}></TextInput>
       </View>

       {/* Email */}
        <View style={{
            marginTop:20
        }}>
            <Text style={{
              fontFamily:'outfit',
            }}> Email </Text>
            <TextInput  style={styles.input} placeholder='enter Email' onChangeText={(value)=>setEmail(value)}></TextInput>
       </View>
       
        {/* //password */}
        <View style={{
            marginTop:20
        }}>
           <Text style={{
              fontFamily:'outfit',
            }}> Password </Text>
            <TextInput secureTextEntry={true} style={styles.input} placeholder='enter password' onChangeText={(value)=>setPassword(value)}></TextInput>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity  onPress={onCreateAccount} style={{
            padding:20,
            backgroundColor:Colors.PRIMARY,
            borderRadius:15,
            marginTop:50
        }}>
            <Text style={{
                color:Colors.WHITE,
                textAlign:'center'
            }}>Create Account</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity 
        onPress={()=>router.replace('auth/sign-in')}
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
            }}>Sign In</Text>
            
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