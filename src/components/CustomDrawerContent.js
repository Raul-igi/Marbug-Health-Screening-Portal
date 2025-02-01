import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import * as LucideIcons from "lucide-react-native";
import Colors from "../constants/Colors";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={size} color={color} />;
};

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View style={styles.drawerImageContainer}>
      <Image
        style={styles.drawerImage}
        source={require("../constants/images/rwandaGov2.png")}
        resizeMode="contain"
      />
      <Text style={styles.drawerTitle}>Marburg Health Screening Portal</Text>
      <View style={styles.separator} />
    </View>
    <DrawerItemList {...props} />
    <TouchableOpacity
      onPress={() => console.log("User logged out")}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginLeft: 10,
      }}
    >
      <IconLucide name="LogOut" size={23} color="black" />
      <Text style={{ marginLeft: 10, color: "black", fontSize: 16 }}>
        Logout
      </Text>
    </TouchableOpacity>
  </DrawerContentScrollView>
);

const styles = StyleSheet.create({
  drawerImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  drawerImage: {
    width: 85,
    height: 80,
    borderRadius: 40,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    color: Colors.lightBlue,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
  },
});

export default CustomDrawerContent;
