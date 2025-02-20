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
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icon library
import { Dropdown } from "react-native-element-dropdown";
import Headers from "../../components/Headers";
import Menu from "../../components/Menu/Menu";
import { List } from "react-native-paper";

import * as LucideIcons from "lucide-react-native";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const data = [
  { label: "All", value: "1" },
  { label: "Isolate and Investigate", value: "2" },
  { label: "Discharge", value: "3" },
  { label: "Isolate and Investigate After Three Days", value: "4" },
  {
    label: "Test for Other Diseases(Malaria,Typhoid,Gastroenteritis",
    value: "5",
  },
  { label: "Retake Test", value: "6" },
  { label: "No Threat", value: "7" },
  { label: "No Test Needed", value: "8" },
  { label: "Error", value: "9" },
  { label: "Linked to Testing", value: "10" },
];

const AddPatientCaseAssmentReview = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [focusedField, setFocusedField] = useState(null); // State to track focused field
  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    const isSelected = item.value === value;
    return (
      <View>
        <View
          style={[
            styles.item,
            isSelected && { backgroundColor: Colors.lightBlue },
          ]}
        >
          <Text style={[styles.textItem, isSelected && { color: "white" }]}>
            {item.label}
          </Text>
        </View>
        <View style={styles.separator} />
      </View>
    );
  };



   const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Headers />

       

        <ScrollView>
        <View style={styles.Container}>
          <View style={styles.loginContainer}>
            <View style={styles.pageHeader}>
              <Text style={styles.pageHeaderText}>Marburg Screening</Text>
            </View>


            <View style={styles.pageHeaderContainer}>
            <View style={styles.pageHeader2}>
              <IconLucide name="TriangleAlert" size={23} color={"black"} />
              <Text style={styles.pageHeader2Text}>Assessment Review</Text>
            </View>

            <View style={styles.statusContainer}>
              <View>
                <Text style={styles.StatusText}>Status</Text>
              </View>

              <View>
                <Text style={styles.statusKeyText}>Name: <Text style={styles.statusValueText}>ISOLATE_AND_TEST</Text></Text>
              </View>

              <View>
                <Text style={styles.statusKeyText}>Description: <Text style={styles.statusValueText}>Isolate and test if certain conditions met</Text></Text>
              </View>

            </View>

            </View>


             

             <List.Section title="Review Answers">
            
                    <List.Accordion
                      title="Personal Information"
                      left={(props) => (
                        <List.Icon {...props} icon="table" color="#0790CF" />
                      )}
                      
                    >
                      <List.Item title="Name: Raul IGIRANEZA" />
                      <List.Item title="Phone: 0784694634" />
                    </List.Accordion>
            
                    <List.Accordion
                      title="Health Center"
                      left={(props) => (
                        <List.Icon {...props} icon="table" color="#0790CF" />
                      )}
                      expanded={expanded}
                      onPress={handlePress}
                     
                    >
                      <List.Item title="Butare Teaching University (CHUB)" />
                    </List.Accordion>
            
                    <List.Accordion
                      title="Has he/she had any unexplained bleeding?"
                      left={(props) => (
                        <List.Icon {...props} icon="table" color="#0790CF" />
                      )}
                    >
                      <List.Item title="Yes" />
                     
                    </List.Accordion>
                  </List.Section>



                  <View style={styles.screenOfficerContainer}>
                <Text style={styles.screenOfficerText}>Status</Text>
              </View>



           
            
            <View style={styles.signinInputContainer}>
              <View>
                <Text>First Name</Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "firstName" && { borderColor: "#0790CF" },
                  ]}
                  placeholder="Enter first name"
                  placeholderTextColor={Colors.gray}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("firstName")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View> 
         
            <View style={styles.signinInputContainer}>
              <View>
                <Text>Last Name</Text>
              </View>

              <View>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "lastName" && { borderColor: "#0790CF" },
                  ]}
                  placeholder="Enter last name"
                  placeholderTextColor={Colors.gray}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("lastName")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.signinInputContainer}>
              <View>
                <Text>Phone Number</Text>
              </View>

              <View style={styles.phoneNumberInputWrapper}>
                <TextInput
                  style={[
                    styles.signinInputFilds,
                    focusedField === "phoneNumber" && {
                      borderColor: "#0790CF",
                    },
                  ]}
                  placeholder="Enter phone number"
                  placeholderTextColor={Colors.gray}
                  value={phoneNumber}
                  onChangeText={(text) => setphoneNumber(text)}
                  autoCapitalize="none"
                  onFocus={() => setFocusedField("phoneNumber")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={styles.buttonConatainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddPatientCaseBleedingAssessment")
                }
              >
                <View style={styles.PreviousButton}>
                  <Text style={styles.PreviousButtonText}>Previous</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddPatientCaseBleedingAssessment")
                }
              >
                <View style={styles.NextButton}>
                  <Text style={styles.NextButtonText}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: Colors.pageBackgroundColor,
  },

  loginContainer: {
    //backgroundColor: Colors.solidWhite,
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

  pageHeaderText: {
    color: "#0790CF",
    fontSize: 15,
  },

  pageHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageHeaderText: {
    fontSize: 30,
    letterSpacing: 1,
    fontWeight: "400",
  },

  pageHeaderContainer:{
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#cce3de",
    marginTop:10,
    padding:10,
    paddingBottom:40,
    borderRadius:10
  },


  pageHeader2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
    gap: 5,
  },
  pageHeader2Text: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "400",
  },

  LoginSubHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  LoginSubHeaderText: {
    fontSize: 18,
    color: Colors.gray,
  },

  signinInputContainer: {
    //marginHorizontal: 10,
    marginTop: 20,
  },

  signinInputFilds: {
    marginTop: 10,
    width: 337,
    height: windowHeight * 0.05,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  phoneNumberInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  eyeIcon: {
    position: "absolute",
    right: 10,
  },

  buttonConatainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  NextButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
    windowHeight: 0.05,
    width: windowWidth * 0.3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  NextButtonText: {
    fontSize: 20,
    color: Colors.solidWhite,
  },

  PreviousButton: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 30,
    height: windowHeight * 0.05,
    width: windowWidth * 0.3,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  PreviousButtonText: {
    fontSize: 20,
    color: Colors.gray,
  },

  filterdropdown: {
    width: 300,
    height: windowHeight * 0.05,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    elevation: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    marginHorizontal: 20,
    marginTop: 10,
  },

  dropDownPlaceHolderStyle: {
    fontSize: 16,
    color: Colors.gray,
  },

  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 2,
  },

  DropDownHeaderText: {
    marginHorizontal: 20,
    marginTop: 20,
  },

  menuHamburger: {
    alignItems: "center",
    marginTop: -24,
    marginHorizontal: 20,
    backgroundColor: "#f8f8f8",
    width: 30,
  },

  statusContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    gap:10
  },
  StatusText: {
    fontSize: 22,
    fontWeight: "500",
    Color: "red",
  },

  statusKeyText: {
    fontSize: 20,
    fontWeight: "400",
    Color: "red", 
  },

  statusValueText:{
    justifyContent:"center",
    alignItems:"center",
    fontSize:18,
    color:Colors.lightBlue
  },

  statusResponse: {
    flexDirection: "row",
    alignItems:"center",
    marginTop: 10,
    width:260,
    gap:5,
    backgroundColor:"red"
  },

  focusedAccordion: {
    backgroundColor: "#f0f8ff", // Light background for the focused list
    borderWidth: 1,
    borderColor: "#1e90ff", // Highlight border color
  },

  screenOfficerContainer:{
    marginHorizontal: 10,
    marginTop: 10,
    gap:10
  },

  screenOfficerText:{
    fontSize: 22,
    fontWeight: "500",
    Color: "red",
  },

  statusContainer: {
    marginHorizontal: 10,
    marginTop: 20,
    gap:10
  },

  StatusText: {
    fontSize: 22,
    fontWeight: "500",
    Color: "red",
  },

 statusKeyText: {
    fontSize: 20,
    fontWeight: "400",
    Color: "red", 
  },


 screenOfficerContainer:{
    marginHorizontal: 10,
    marginTop: 10,
    gap:10
  },


screenOfficerText:{
    fontSize: 22,
    fontWeight: "500",
    Color: "red",
  }

});

export default AddPatientCaseAssmentReview;
