import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import logo from "../assets/logo.png";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import styles from "./Main.scss";
import api from "../services/api";

function Main({ navigation }) {
  const id = navigation.getParam("user");
  const [users, setUsers] = useState([]);

  console.log("ID:", id);

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get("/devs", {
        headers: { user: id }
      });

      setUsers(response.data);
    }

    loadUsers();
  }, [id]);

  async function handleDislike() {
    const [user, ...rest] = users;
    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: { user: id }
    });
    setUsers(rest);
  }

  async function handleLike() {
    const [user, ...rest] = users;
    await api.post(`/devs/${user._id}/likes`, null, {
      headers: { user: id }
    });
    setUsers(rest);
  }

  async function handleLogout() {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>
      <View style={styles.cardsContainer}>
        {users.length === 0 ? (
          <Text style={styles.empty}>Acabou :(</Text>
        ) : (
          users.map((user, index) => (
            <View
              key={user._id}
              style={[styles.card, { zIndex: users.length - index }]}
            >
              <Image
                style={styles.avatar}
                source={{
                  uri: user.avatar
                }}
              />

              <View style={styles.footer}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio} numberOfLines={3}>
                  {user.bio}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {users.length > 0 && (
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleDislike}>
            <Image source={dislike} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLike}>
            <Image source={like} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

export default Main;
