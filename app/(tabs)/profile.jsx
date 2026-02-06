import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../../configs/firebaseConfig';
import { signOut } from 'firebase/auth';
import { Colors } from '../../constants/Colours';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to logout. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: '100%'
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          marginTop: 20
        }}
      >
        Profile
      </Text>

      {/* User Info Card */}
      <View
        style={{
          marginTop: 30,
          backgroundColor: Colors.LIGHT_GRAY,
          padding: 20,
          borderRadius: 15
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
          <Ionicons name="person-circle" size={60} color={Colors.PRIMARY} />
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text
              style={{
                fontFamily: 'outfit-medium',
                fontSize: 20,
                color: Colors.PRIMARY
              }}
            >
              {user?.displayName || 'User'}
            </Text>
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 14,
                color: Colors.GRAY,
                marginTop: 5
              }}
            >
              {user?.email}
            </Text>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={{ marginTop: 30 }}>
        <Text
          style={{
            fontFamily: 'outfit-medium',
            fontSize: 18,
            marginBottom: 15,
            color: Colors.PRIMARY
          }}
        >
          Account
        </Text>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            backgroundColor: '#ffebee',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#ef5350'
          }}
        >
          <Ionicons name="log-out-outline" size={24} color="#ef5350" />
          <Text
            style={{
              fontFamily: 'outfit-medium',
              fontSize: 16,
              color: '#ef5350',
              marginLeft: 15
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 12,
            color: Colors.GRAY
          }}
        >
          AI Travel Planner v1.0.0
        </Text>
      </View>
    </View>
  );
}