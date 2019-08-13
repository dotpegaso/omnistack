import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import logo from "../assets/logo.png";
import {
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  Text,
  TouchableOpacity
} from "react-native";
import styles from "./Login.scss";

import api from "../services/api";

function Login({ navigation }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("id").then(user => {
      user && navigation.navigate("Main", { user });
    });
  }, []);

  async function handleLogin() {
    const response = await api.post("/devs", { username });

    const { _id } = response.data;

    await AsyncStorage.setItem("id", { _id });

    navigation.navigate("Main", { user: _id });
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS === "ios"}
      style={styles.container}
    >
      <Image source={logo} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="Digite seu usuário do Github"
        placeholderTextColor="#999"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default Login;
