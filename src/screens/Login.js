import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle visibility
  const [focusedField, setFocusedField] = useState(null); // State to track focused field

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <LinearGradient
          style={styles.Container}
          colors={["#ffffff", "#cbf3f0", "#ffffff", "#caf0f8"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View>
            <View style={styles.loginContainerHeader}>
              <View>
                <Image
                  style={styles.loginLogo}
                  source={require("../constants/images/ministry-of-Rwanda-logor.png")}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={styles.loginHeaderText}>RAB</Text>
                <Text style={styles.loginHeaderText}>Livestock Contact</Text>
                <Text style={styles.loginHeaderText}>System</Text>
              </View>
            </View>

            <View style={styles.LoginHeader}>
              <Text style={styles.LoginHeaderText}>Login to Portal</Text>
            </View>

            <View style={styles.LoginSubHeader}>
              <Text style={styles.LoginSubHeaderText}>
                Enter below details to continue
              </Text>
            </View>

            <View style={styles.signinInputContainer}>
              <View style={styles.signinInputContainerUsername}>
                <Text style={styles.signinText}>Username</Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "username" && { borderColor: "#0790CF" },
                  ]}
                  placeholder="Enter your Username"
                  placeholderTextColor={Colors.dark}
                  value={userName}
                  onChangeText={(text) => setUserName(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.signinInputContainer}>
              <View style={styles.signinInputContainerPassword}>
                <Text style={styles.passwordText}>Password</Text>
              </View>

              <View style={styles.passwordInputWrapper}>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "password" && { borderColor: "#0790CF" },
                  ]}
                  placeholder="Enter your Password"
                  placeholderTextColor={Colors.dark}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={passwordVisible ? "visibility" : "visibility-off"}
                    size={20}
                    color="gray"
                    style={{ marginTop: 8 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("mainScreen")}>
              <View style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.pageBackgroundColor,
  },

  loginContainer: {
    backgroundColor: Colors.solidWhite,
    width: windowWidth * 0.9,
    borderRadius: 10,
  },

  loginContainerHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    gap: 5,
  },

  loginLogo: {
    padding: 10,
    height: 85,
    width: 80,
  },

  loginHeaderText: {
    color: Colors.lightBlue,
    fontSize: windowHeight / 55,
  },

  LoginHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  LoginHeaderText: {
    fontSize: windowHeight / 40,
    fontWeight: "400",
  },

  LoginSubHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  LoginSubHeaderText: {
    fontSize: windowHeight / 50,
    color: Colors.gray,
  },

  signinInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },

  signinInputFilds: {
    marginTop: 10,
    width: 300,
    height: 40,
    borderColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  passwordInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
  },

  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
    height: 40,
    width: 300,

    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  loginButtonText: {
    fontSize: windowHeight / 50,
    color: Colors.solidWhite,
  },

  signinInputContainerUsername: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },

  signinInputContainerPassword: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },

  signinText: {
    color: Colors.dark,
  },
  passwordText: {
    color: Colors.dark,
  },
});

export default Login;
