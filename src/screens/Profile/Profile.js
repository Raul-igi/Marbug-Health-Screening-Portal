import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
  } from "react-native";
  import React, { useState } from "react";
  import Colors from "../../constants/Colors";
  import { useNavigation } from "@react-navigation/native";
  import Menu from "../../components/Menu";
  import Headers from "../../components/Headers";
  import { MaterialIcons } from "@expo/vector-icons";
  import * as LucideIcons from "lucide-react-native";
  
  const IconLucide = ({ name, size = 24, color = "black" }) => {
    const LucideIcon = LucideIcons[name];
    if (!LucideIcon) {
      return null;
    }
    return <LucideIcon size={size} color={color} />;
  };
  
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("screen").height;
  
  const Profile = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle visibility
    const [focusedField, setFocusedField] = useState(null); // State to track focused field
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.maincontainer}>
            <Headers />
  
            <ScrollView>
              <View style={styles.profileContainer}>
  
                <View style={styles.pictureContainer}>
                  <Text>IR</Text>
                </View>
  
                <View style={styles.userDescriptionContainer}>
                  <Text style={styles.userNameText1}>Raul Igiraneza</Text>
                </View>
  
                <View style={styles.userDescriptionContainer}>
                  <Text style={styles.userNameText2}> @user3</Text>
                </View>
  
                <View style={styles.lineSeparator} />
  
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleText}>User Information</Text>
                </View>
  
                <View style={styles.infoMainContainer}>
                  <View style={styles.infoContainer}>
                    <View style={styles.profileName}>
                      <IconLucide name="User" size={23} color={Colors.Green} />
                      <Text style={styles.profileNameText}>Name</Text>
                    </View>
  
                    <View style={styles.profileName}>
                      <Text style={styles.profileNameText}>Raul IGIRANEZA</Text>
                    </View>
                  </View>
  
                  <View style={styles.infoContainer}>
                    <View style={styles.dateInfo}>
                      <IconLucide
                        name="CalendarClock"
                        size={23}
                        color={Colors.Green}
                      />
  
                      <Text style={styles.dateInfoText}>Created At</Text>
                    </View>
  
                    <View style={styles.dateInfo}>
                      <Text style={styles.dateInfoText}>11/25/2024</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.lineSeparator} />
  
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleText}>Location</Text>
                </View>
  
                <View style={styles.infoMainContainer}>
                  <View style={styles.infoContainer}>
                    <View style={styles.locationName}>
                      <IconLucide name="MapPin" size={23} color={Colors.Green} />
                      <Text style={styles.locationNameText}>Name</Text>
                    </View>
  
                    <View style={styles.locationName}>
                      <Text style={styles.locationNameText}>NYAGATARE</Text>
                    </View>
                  </View>
  
                  <View style={styles.infoContainer}>
                    <View style={styles.locationName}>
                      <IconLucide
                        name="SignpostBig"
                        size={23}
                        color={Colors.Green}
                      />
                      <Text style={styles.locationNameText}>Level</Text>
                    </View>
  
                    <View style={styles.locationName}>
                      <Text style={styles.locationNameText}>DISTRICTS</Text>
                    </View>
                  </View>
                </View>
  
                <View style={styles.lineSeparator} />
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleText}>Catchment Area</Text>
                </View>
  
                <View style={styles.infoMainContainer}>
                  <View style={styles.infoContainer}>
                    <View style={styles.locationName}>
                      <IconLucide name="MapPin" size={23} color={Colors.Green} />
                      <Text style={styles.locationNameText}>Name</Text>
                    </View>
  
                    <View style={styles.locationName}>
                      <Text style={styles.locationNameText}>NYAGATARE</Text>
                    </View>
                  </View>
                </View>
  
                <View style={styles.lineSeparator} />
  
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionTitleText}>Password Management</Text>
                </View>
  
                <TouchableOpacity onPress={() => setShowPasswordFields(true)}>
                  <View style={styles.changePasswordButton}>
                    <Text style={styles.changePasswordButtonText}>
                      Change Password
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
  
              {showPasswordFields && ( // Conditional rendering for password input and buttons
                <>
                  <View style={styles.passwordInputWrapper}>
                    <TextInput
                      style={[
                        styles.signinInputFilds,
                        focusedField === "password" && { borderColor: "#0790CF" },
                      ]}
                      placeholder="New Password"
                      placeholderTextColor={"black"}
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
                        size={22}
                        color="gray"
                        style={{ marginTop: 8 }}
                      />
                    </TouchableOpacity>
                  </View>
  
                  <View style={styles.twoButtons}>
                    <TouchableOpacity
                      onPress={() => setShowPasswordFields(false)}
                    >
                      <View style={styles.changePasswordButton2}>
                        <Text style={styles.changePasswordButtonText2}>
                          cancel
                        </Text>
                      </View>
                    </TouchableOpacity>
  
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("AddPatientCase");
                      }}
                    >
                      <View style={styles.changePasswordButton2}>
                        <Text style={styles.changePasswordButtonText2}>
                          Change Password2
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
  
            
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  };
  
  const styles = StyleSheet.create({
    maincontainer: {
      flex: 1,
      backgroundColor: Colors.pageBackgroundColor,
    },
    menuHamburger: {
      alignItems: "center",
      marginTop: -24,
      marginHorizontal: 20,
      backgroundColor: "#f8f8f8",
      width: 30,
    },
  
    profileContainer: {
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      //backgroundColor: Colors.solidWhite,
      marginHorizontal: 20,
      height: windowHeight * 0.6,
      borderRadius: 10,
      marginTop: 50,
      //borderWidth: 1,
      //borderColor: Colors.Green,
    },
  
    pictureContainer: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginHorizontal: 20,
      borderRadius: 50,
      backgroundColor: Colors.solidWhite,
      height: 70,
      width: 70,
      borderWidth: 1,
      borderColor: Colors.Green,
      //marginTop:30
    },
  
    userDescriptionContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
  
    userNameText1: {
      fontSize: 14,
      color: Colors.dark,
      fontWeight: 700,
    },
    userNameText2: {
      fontSize: 13,
      color: Colors.gray,
    },
  
    lineSeparator: {
      borderWidth: 1,
      borderColor: Colors.lightGray,
      width: windowWidth * 0.8,
    },
  
    infoMainContainer: {
      //backgroundColor: "#d8e2dc",
      gap: 20,
    },
  
    infoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "space-between",
      width: windowWidth * 0.8,
    },
  
    profileName: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
  
    profileNameText: {
      fontSize: 14,
    },
    dateInfo: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
  
    dateInfoText: {
      fontSize: 14,
    },
  
    sectionTitleContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
  
    sectionTitleText: {
      fontWeight: 700,
      fontSize: 14,
      color: Colors.dark,
    },
  
    locationName: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 5,
    },
  
    locationNameText: {
      fontSize: 14,
    },
  
    changePasswordButton: {
      justifyContent: "center",
      alignItems: "center",
      height: windowHeight * 0.05,
      width: windowWidth * 0.39,
      backgroundColor: Colors.solidWhite,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.Green,
      
    },
  
    changePasswordButtonText: {
      color: Colors.Green,
      fontSize: 14,
      fontWeight: 700,
    },
  
    changePasswordButton2: {
      justifyContent: "center",
      alignItems: "center",
      height: windowHeight * 0.05,
      width: windowWidth * 0.39,
      backgroundColor: Colors.solidWhite,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.Green,
      marginTop: 10,
      
    },
  
    changePasswordButtonText2: {
      color: Colors.Green,
      fontSize: 14,
      fontWeight: 700,
    },
  
    passwordInputWrapper: {
      //flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: windowHeight *0.04,
    },
  
    signinInputFilds: {
      //marginTop: 10,
      width: 300,
      height: 40,
      borderColor: Colors.lightGray,
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 10,
    },
  
    eyeIcon: {
      position: "absolute",
      right: 50,
    },
  
    twoButtons: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 20,
      flexDirection: "row",
      //marginTop:40,
      gap: 10,
      
    },
  });
  
  export default Profile;
  