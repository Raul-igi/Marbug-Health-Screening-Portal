import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as LucideIcons from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name]; // Access the icon dynamically
  if (!LucideIcon) {
    return null; // Handle cases where the icon name is incorrect
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const RolesAndPermissions = () => {
  const [focusedField, setFocusedField] = useState(null);
  const navigation = useNavigation();

  return (
    <View style={styles.maincontainer}>
      <View style={styles.menuHamburgerContainer}>
        <View style={styles.menuHamburger}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <IconLucide name="AlignJustify" size={23} color={"black"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{justifyContent:"center", alignItems:"center"}}>
        <Text style={{marginTop:-1000}}>Roles & Permissions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: Colors.pageBackgroundColor,
  },

  menuHamburgerContainer: {
    flex: 1,
  },

  menuHamburger: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 20,
    backgroundColor: "#f8f8f8",
  },
});

export default RolesAndPermissions;
