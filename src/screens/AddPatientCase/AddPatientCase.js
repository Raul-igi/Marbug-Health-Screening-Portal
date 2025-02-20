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
import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons"; // Importing icon library
import { Dropdown } from "react-native-element-dropdown";
import Headers from "../../components/Headers";
import Menu from "../../components/Menu";
import apiService from "../../apiService/apiService";
import { RadioButton, Checkbox } from "react-native-paper";
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

const AddPatientCase = ({ navigation, route }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [value, setValue] = useState(null);
  const [radioValue, setRadioValue] = React.useState("first");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [healthFacilitesData, setHealthFacilitiesData] = useState([]);
  const [selectedRadioAnswers, setSelectedRadioAnswers] = useState({});
  const [patientQuestions, setPatientQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  //manupulated data
  function addAnswerProperty(data) {
    if (!data.categoryQuestionGroups) return data;

    data.categoryQuestionGroups.forEach((group) => {
      if (group.questions) {
        group.questions.forEach((question) => {
          question.answer = "";
        });
      }
    });

    return data;
  }

  function updateAnswer(
    data,
    categoryQuestionGroupId,
    questionId,
    answerValue
  ) {
    if (!data.categoryQuestionGroups) return data;

    let answerUpdated = false; // Track if the update was successful

    data.categoryQuestionGroups.forEach((group) => {
      if (group.id === categoryQuestionGroupId && group.questions) {
        group.questions.forEach((question) => {
          if (question.id === questionId) {
            question.answer = answerValue;
            answerUpdated = true;
            // console.log(
            //   `Updated Answer: ${question.answer} for Question ID: ${questionId} in Group ID: ${categoryQuestionGroupId}`
            // );
          }
        });
      }
    });

    if (!answerUpdated) {
      console.warn(
        `No matching question found for Question ID: ${questionId} in Group ID: ${categoryQuestionGroupId}`
      );
    }

    // console.log("Updated Data:", JSON.stringify(data, null, 2)); // Print the full updated data structure

    return data;
  }

  const fetchPatientCaseAssessmentData = async () => {
    try {
      const data = await apiService.fetchQuestions(route.params.id);
      const cleanedData = addAnswerProperty(data);
      console.log("lskjf", cleanedData.categoryQuestionGroups.length);
      setPatientQuestions(cleanedData);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchhealthFacilitesData = async () => {
    try {
      setLoading(true);
      const data = await apiService.fetchHealthFacilities();
      //console.log(data)
      const formattedFacilities = data.map((facility) => ({
        label: facility.name,
        value: facility.id,
      }));
      setHealthFacilitiesData(formattedFacilities);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('myidididididid',route.params.id)
    setSelectedIndex(-1);
    setPatientQuestions([]);
    fetchPatientCaseAssessmentData();
    fetchhealthFacilitesData();
    const focusHandler = navigation.addListener("focus", () => {
      console.log('myidididididid',route.params.id)
      setSelectedIndex(-1);
      setPatientQuestions([]);
      fetchPatientCaseAssessmentData();
      fetchhealthFacilitesData();
    });
    return focusHandler;
  }, [navigation]);

  const handleAddPatient = async () => {
    try {
      if (!firstName || !lastName || !phoneNumber || !value) {
        alert("Please fill all fields before submitting.");
        return;
      }

      // console.log("First Name:", firstName);
      // console.log("Last Name:", lastName);
      // console.log("Phone Number:", phoneNumber);
      // console.log("Selected Value:", value);
      // console.log("Selected Radio Answers:", selectedRadioAnswers);

      const response = await apiService.addPatient(
        route.params.id,
        value,
        firstName,
        lastName,
        phoneNumber,
        selectedRadioAnswers
      );

      console.log("Patient added successfully:", response);
      alert("Patient added successfully!");

      // Navigate to the next screen or reset the form
      setFirstName("");
      setLastName("");
      setphoneNumber("");
      setValue(null);
    } catch (error) {
      console.error("Failed to add patient:", error.message);
      alert("Failed to add patient. Please try again.");
    }
  };

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
          {selectedIndex === -1 && (
            <View style={styles.Container}>
              <View style={styles.loginContainer}>
                <View style={styles.pageHeader}>
                  <Text style={styles.pageHeaderText}>
                    {patientQuestions.name}
                  </Text>
                </View>

                <View style={styles.pageHeader2}>
                  <Text style={styles.pageHeader2Text}>
                    {patientQuestions.description}
                  </Text>
                </View>

                <View>
                  <View>
                    <Text style={styles.DropDownHeaderText}>Health Center</Text>
                  </View>

                  <Dropdown
                    containerStyle={{
                      borderRadius: 10,
                      backgroundColor: Colors.pageBackgroundColor,
                      padding: 10,
                    }}
                    style={[
                      styles.filterdropdown,
                      focusedField === "dropDown" && { borderColor: "#0790CF" },
                    ]}
                    placeholderStyle={styles.dropDownPlaceHolderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    search
                    searchPlaceholder="Search..."
                    data={healthFacilitesData}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Select"
                    value={value}
                    onChange={(item) => {
                      setValue(item);
                    }}
                    renderItem={renderItem}
                    onFocus={() => setFocusedField("dropDown")}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>

                <View style={styles.signinInputContainer}>
                  <View>
                    <Text>First Name</Text>
                  </View>

                  <View>
                    <TextInput
                      style={[
                        styles.signinInputFilds,
                        focusedField === "firstName" && {
                          borderColor: "#0790CF",
                        },
                      ]}
                      placeholder="Enter first name"
                      placeholderTextColor={Colors.gray}
                      value={firstName}
                      onChangeText={setFirstName}
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
                        focusedField === "lastName" && {
                          borderColor: "#0790CF",
                        },
                      ]}
                      placeholder="Enter last name"
                      placeholderTextColor={Colors.gray}
                      value={lastName}
                      onChangeText={setLastName}
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
                      onChangeText={setphoneNumber}
                      autoCapitalize="none"
                      onFocus={() => setFocusedField("phoneNumber")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </View>

                <View style={styles.buttonConatainer}>
                  <TouchableOpacity
                    onPress={() => setSelectedIndex(selectedIndex + 1)}
                  >
                    <View style={styles.NextButton}>
                      <Text style={styles.NextButtonText}>Next</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {patientQuestions.categoryQuestionGroups?.map((itemInfo, index) => {
            if (index !== selectedIndex) return null; // Show only the selected card

            return (
              <View key={index} style={styles.Container}>
                <View style={styles.loginContainer}>
                  <View>
                    <View style={styles.radioHeader}>
                      <Text style={styles.screenHeaderText}>
                        {itemInfo.name}
                      </Text>
                    </View>

                    <View style={styles.radioHeader}>
                      <Text style={styles.screenHeader2Text}>
                        {itemInfo.description}
                      </Text>
                    </View>

                    {itemInfo.questions?.map((radioQ) => (
                      <View key={radioQ.id}>
                        <View style={styles.screenQuestion}>
                          <Text style={styles.screenQuestionText}>
                            {radioQ.name}
                          </Text>
                        </View>

                        <View style={styles.radioContainer}>
                          <RadioButton.Group
                            onValueChange={(newValue) => {
                              //console.log("Selected Radio Button:", newValue);
                              setRadioValue(newValue);

                              const updatedData = updateAnswer(
                                patientQuestions,
                                itemInfo.id, // categoryQuestionGroupId
                                radioQ.id, // questionId
                                newValue // answerValue
                              );

                              setSelectedRadioAnswers((prev) => ({
                                ...prev,
                                [radioQ.id]: {
                                  categoryQuestionId: radioQ.id,
                                  ...(radioQ.categoryQuestionType === "CHECKBOX" // Replace `condition` with your actual condition
                                    ? { categoryQuestionOptionIds: [newValue] }
                                    : {
                                        categoryQuestionOptionId: newValue,
                                      }),
                                },
                              }));

                              // Update the state with the modified questions
                              setPatientQuestions(updatedData);
                            }}
                            value={radioValue}
                          >
                            {radioQ.options.map((radioOPT) => (
                              <View key={radioOPT.id}>
                                <Text>{radioOPT.name}</Text>
                                <RadioButton.Android
                                  value={radioOPT.id}
                                  color={Colors.lightBlue}
                                />
                              </View>
                            ))}
                          </RadioButton.Group>
                        </View>
                      </View>
                    ))}
                  </View>

                  <View style={styles.buttonConatainer}>
                    <TouchableOpacity
                      disabled={selectedIndex === -1} // Disable if first item
                      onPress={() => setSelectedIndex(index - 1)}
                    >
                      <View style={styles.NextButton}>
                        <Text style={styles.NextButtonText}>Previous</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        // Ensure "Yes" option is detected dynamically
                        const yesOption = itemInfo.questions
                          .flatMap((q) => q.options)
                          .find((opt) => opt.name.toLowerCase() === "yes");

                        if (yesOption && radioValue === yesOption.id) {
                          // Navigate only when "Yes" is selected & button is pressed
                          navigation.navigate("");
                        } else {
                          // Move to the next question only when "Next" is pressed
                          setSelectedIndex(index + 1);
                        }
                      }}
                      disabled={!radioValue} // Prevents pressing "Next" without selecting an option
                    >
                      <View
                        style={[
                          styles.NextButton,
                          !radioValue && { opacity: 0.5 },
                        ]}
                      >
                        <Text style={styles.NextButtonText}>Next</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}

          <View style={styles.Container}>
            <View style={styles.loginContainer}>
              <View style={styles.pageHeader}>
                <Text style={styles.pageHeaderText}>Marburg Screening</Text>
              </View>

              <View style={styles.pageHeaderContainer}>
                <View style={styles.pageHeader3}>
                  <IconLucide name="TriangleAlert" size={23} color={"black"} />
                  <Text style={styles.pageHeader3Text}>Assessment Review</Text>
                </View>

                <View style={styles.statusContainer}>
                  <View>
                    <Text style={styles.StatusText}>Status</Text>
                  </View>

                  <View>
                    <Text style={styles.statusKeyText}>
                      Name:{" "}
                      <Text style={styles.statusValueText}>
                        ISOLATE_AND_TEST
                      </Text>
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.statusKeyText}>
                      Description:{" "}
                      <Text style={styles.statusValueText}>
                        Isolate and test if certain conditions met
                      </Text>
                    </Text>
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
                  <List.Item title={`name: ${firstName}`} />
                  <List.Item title={`Phone:${phoneNumber}`} />
                </List.Accordion>

                <List.Accordion
                  title="Health Center"
                  left={(props) => (
                    <List.Icon {...props} icon="table" color="#0790CF" />
                  )}
                  expanded={expanded}
                  onPress={handlePress}
                >
                  <List.Item title={value?.label} />
                </List.Accordion>

                {patientQuestions.categoryQuestionGroups?.map(
                  (itemInfo, index) =>
                    itemInfo.questions?.map((question) => (
                      <List.Accordion
                        titleStyle={{ flexWrap: "wrap", width: "100" }}
                        title={question.name}
                        left={(props) => (
                          <List.Icon {...props} icon="table" color="#0790CF" />
                        )}
                      >
                        <List.Item title={question.answer} />
                      </List.Accordion>
                    ))
                )}
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
                      focusedField === "firstName" && {
                        borderColor: "#0790CF",
                      },
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <View style={styles.PreviousButton}>
                    <Text style={styles.PreviousButtonText}>Previous</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleAddPatient();
                    navigation.navigate("Dashboard");
                  }}
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
    marginTop: 40,
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
    fontSize: windowHeight / 40,
    fontWeight: "600",
  },

  pageHeader2: {
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginTop: 40,
  },
  pageHeader2Text: {
    fontSize: windowHeight / 50,
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

  //bleeding assessment styling

  radioHeader: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 20,
  },

  screenHeaderText: {
    fontSize: windowHeight / 40,
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

  radioContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 20,
    marginTop: 10,
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

  //bleeding assessment styling NO

  screenHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  screenHeaderTextNo: {
    fontSize: windowHeight / 45,
    fontWeight: "400",
    color: Colors.lightBlue,
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

  pageHeaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cce3de",
    marginTop: 10,
    padding: 10,
    paddingBottom: 40,
    borderRadius: 10,
  },

  pageHeader3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
    gap: 5,
  },

  pageHeader3Text: {
    fontSize: 20,
    letterSpacing: 1,
    fontWeight: "400",
  },
});

export default AddPatientCase;
