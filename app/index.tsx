<<<<<<< HEAD
import { View, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
=======
import { Text, View } from "react-native";
>>>>>>> parent of cd3fdb5 (Implement UI upto review trip)
import Login from "./../components/Login.jsx";
import { auth } from './../configs/firebaseConfig.js';
import { Redirect } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}
<<<<<<< HEAD
    >
      {user ? <Redirect href={'/mytrips'} /> : <Login />}
=======
    > 
      {user?
        <Redirect href={'/mytrips'}/>:<Login />
      }
>>>>>>> parent of cd3fdb5 (Implement UI upto review trip)
    </View>
  );
}
