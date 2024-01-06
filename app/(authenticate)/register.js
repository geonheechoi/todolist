import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter, } from "expo-router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password
    }
    axios.post("http://192.168.219.104:3000/register", user)
      .then((responce) => {
        console.log(responce);
        Alert.alert("Registration Success", "You have been successfully registered.");
        setEmail("");
        setPassword("");
        setName("");
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Registration Error", "An error occurred during registration.");
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "#0066b2" }}>
          TODO-LIST TRACKER
        </Text>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 20 }}>
            REGISTER
          </Text>
        </View>

        <View style={{ marginTop: 70 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <Ionicons style={{ marginLeft: 8 }} name="person" size={24} color="gray" />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 17 : 17 }}
              placeholder="Enter your Name"
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="black" />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: email ? 17 : 17 }}
              placeholder="Enter your Email"
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#E0E0E0", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
            <AntDesign name="lock1" size={24} color="gray" />
            <TextInput
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              style={{ color: "gray", marginVertical: 10, width: 300, fontSize: password ? 17 : 17 }}
              placeholder="Enter your Password"
            />
          </View>

          <View style={{ marginTop: 60 }} />
          <Pressable
            onPress={handleRegister}
            style={{ width: 200, backgroundColor: "#6699CC", padding: 10, borderRadius: 6, marginLeft: "auto", marginRight: "auto" }}
          >
            <Text style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: 16 }}>Register</Text>
          </Pressable>
          <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 15 }}>
            <Text style={{ textAlign: "center", fontSize: 15, color: "gray" }}>
              Already have an account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
