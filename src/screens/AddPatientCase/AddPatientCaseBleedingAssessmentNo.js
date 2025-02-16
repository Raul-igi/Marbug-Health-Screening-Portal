import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { Checkbox } from "react-native-paper";
import Headers from "../../components/Headers";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const contactHistoryOptions = [
  "Had contact with a confirmed or probable case",
  "Entered a mine or cave for any reason",
  "Been around bats or their droppings",
  "Had contact with sick or dead wild animal or handled raw bushmeat",
  "Had contact with someone who is sick or died after an acute illness",
  "Sought care within the past 3 days for illness without improvement",
];

const AddPatientCaseBleedingAssessment = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Headers />
        <View style={styles.Container}>
          <View style={styles.loginContainer}>
            <View style={styles.pageHeader}>
              <Text style={styles.pageHeaderText}>
                Marburg Screening Virus Assessment
              </Text>
            </View>

            <View>
              <View style={styles.screenHeader}>
                <Text style={styles.screenHeaderText}>
                  Marburg virus patient screening
                </Text>
              </View>

              <View style={styles.screenHeader2}>
                <Text style={styles.screenHeader2Text}>Contact History</Text>
              </View>

              <View style={styles.screenQuestion}>
                <Text style={styles.screenQuestionText}>
                  In the past month, has the patient experienced any of the following?
                </Text>
              </View>

              <View style={styles.checkboxContainer}>
                {contactHistoryOptions.map((option, index) => (
                  <View key={index} style={styles.checkboxItem}>
                    <Checkbox.Android
                      status={selectedOptions.includes(option) ? "checked" : "unchecked"}
                      onPress={() => toggleOption(option)}
                      color={Colors.lightBlue}
                    />
                    <Text style={styles.checkboxLabel}>{option}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate("AddPatientCase")}>
                <View style={styles.NextButton}>
                  <Text style={styles.NextButtonText}>Previous</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("AddPatientCaseAssmentReview")}>
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
  },
  loginContainer: {
    backgroundColor: Colors.solidWhite,
    width: windowWidth * 0.9,
    borderRadius: 10,
  },
  pageHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  pageHeaderText: {
    color: Colors.dark,
    fontSize: windowHeight / 50,
  },
  screenHeader: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
  },
  screenHeaderText: {
    fontSize: windowHeight / 45,
    fontWeight: "400",
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
  checkboxContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 10,
    marginTop: 10,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  checkboxLabel: {
    flexShrink: 1,
    flexWrap: "wrap",
  },
  buttonContainer: {
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
    width: windowWidth * 0.3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightBlue,
  },
  NextButtonText: {
    fontSize: 20,
    color: Colors.solidWhite,
  },
});

export default AddPatientCaseBleedingAssessment;
