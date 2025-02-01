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
import Menu from "../../components/Menu";
import { RadioButton } from "react-native-paper";

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

const AddPatientCaseBleedingAssessment = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [focusedField, setFocusedField] = useState(null); // State to track focused field
  const [value, setValue] = useState(null);
  const [radioValue, setRadioValue] = React.useState("first");

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Headers />

        <View>
          <View style={styles.menuHamburger}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <IconLucide name="AlignJustify" size={23} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.Container}>
          <View style={styles.loginContainer}>
            <View style={styles.pageHeader}>
              <Text style={styles.pageHeaderText}>Marburg Screening</Text>
            </View>

            <View>
              <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>Bleeding Assessment</Text>
              </View>

              <View style={styles.screenHeader2}>
                <Text style={styles.screenHeader2Text}>
                  Determine if the patient has any unexplained bleeding
                </Text>
              </View>

              <View style={styles.screenQuestion}>
                <Text style={styles.screenQuestionText}>
                  Has he/she had any unexplained bleeding?
                </Text>
              </View>



              <View style={styles.radioContainer}>
                <RadioButton.Group
                  onValueChange={(newValue) => setRadioValue(newValue)}
                  value={radioValue}
                >
                  <View>
                    <Text>Yes</Text>
                    <RadioButton.Android value="first" color={Colors.lightBlue} />
                  </View>
                  <View>
                    <Text>No</Text>
                    <RadioButton.Android value="second" color={Colors.lightBlue} />
                  </View>
                </RadioButton.Group>
              </View>


            </View>

            <View style={styles.buttonConatainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddPatientCase")}
              >
                <View style={styles.NextButton}>
                  <Text style={styles.NextButtonText}>Previous</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate("AddPatientCaseAssmentReview")}
              >
                <View style={styles.NextButton}>
                  <Text style={styles.NextButtonText}>Next</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    marginHorizontal: 20,
    marginTop: 20,
  },

  signinInputFilds: {
    marginTop: 10,
    width: 300,
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

  screenHeader: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
  },
  screenHeaderText: {
    fontSize: 30,
    letterSpacing: 1,
    fontWeight: "200",
    color: Colors.lightBlue,
  },

  screenHeader2: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
  },
  screenHeader2Text: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "300",
    color: Colors.dark,
  },

  screenQuestion: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
  },

  screenQuestionText: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "600",
    color: Colors.dark,
  },

  radioContainer:{
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
  }
});

export default AddPatientCaseBleedingAssessment;
