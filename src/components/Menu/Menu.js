import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import * as LucideIcons from "lucide-react-native";
import { BlurView } from "expo-blur";
import { useNavigation, useRoute } from "@react-navigation/native";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("screen").height;

const Menu = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [focusedField, setFocusedField] = useState(route.name); //Set initial focus based on the current route

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setFocusedField(route.name); //Update focusedField whenever navigation changes
    });

    return unsubscribe;
  }, [navigation, route]); //Depend on navigation and route to track changes

  return (
    <View style={styles.container}>
      <BlurView intensity={70} tint="light" style={styles.menuMainContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <View style={styles.iconContainer}>
            <IconLucide
              name="LayoutDashboard"
              size={23}
              color={focusedField === "Dashboard" ? "#0790CF" : "black"}
            />
            <Text style={{ color: focusedField === "Dashboard" ? "#0790CF" : "black" }}>
              Dashboard
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("PatientInformation")}>
          <View style={styles.iconContainer}>
            <IconLucide
              name="Stethoscope"
              size={23}
              color={focusedField === "PatientInformation" ? "#0790CF" : "black"}
            />
            <Text style={{ color: focusedField === "PatientInformation" ? "#0790CF" : "black" }}>
              Patient Info
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("OfflineData")}>
          <View style={styles.iconContainer}>
            <IconLucide
              name="WifiOff"
              size={23}
              color={focusedField === "OfflineData" ? "#0790CF" : "black"}
            />
            <Text style={{ color: focusedField === "OfflineData" ? "#0790CF" : "black" }}>
              Offline Data
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View style={styles.iconContainer}>
            <IconLucide
              name="CircleUser"
              size={23}
              color={focusedField === "Profile" ? "#0790CF" : "black"}
            />
            <Text style={{ color: focusedField === "Profile" ? "#0790CF" : "black" }}>
              Profile
            </Text>
          </View>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    position: "absolute",
    top: windowHeight * 0.9,
    flexDirection: "row",
    justifyContent: "center",
  },

  menuMainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: windowWidth * 0.94,
    height: windowHeight * 0.07,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    gap: 20,
    overflow: "hidden",
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
});

export default Menu;
