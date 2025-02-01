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
} from "react-native";
import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Menu from "../../components/Menu";
import Headers from "../../components/Headers";
import { Dropdown } from "react-native-element-dropdown";
import DashboardDonutChart from "./DashboardDonutChart";
import DashboardBarChart from "./DashboardBarChart";
import DashboardLineChart from "./DashboardLineChart";
import DashboardDonutChartTwo from "./DashboardDonutChartTwo";
import DashboardDonutChartThree from "./DashboardDonutChartThree";
import DashboardDT from "./DashboardDT";

import * as LucideIcons from "lucide-react-native";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name];
  if (!LucideIcon) {
    return null;
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;

const data = [
  { label: "Test CS", value: "1" },
  { label: "Butare Teaching University (CHUB)", value: "2" },
  { label: "Gakoma DH", value: "3" },
  { label: "Gitwe DH", value: "4" },
  {
    label: "Huye Isange Rehabilitation Center",
    value: "5",
  },
  { label: "HVP Gatagara specialised Hospital", value: "6" },
  { label: "Kabgayi TH", value: "7" },
  { label: "Nyabikenke DH", value: "8" },
  { label: "Kabutare DH", value: "9" },
  { label: "Kaduha DH", value: "10" },
  { label: "Kibilizi DH", value: "10" },
  { label: "Kigeme DH", value: "10" },
];

const Dashboard = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const [value, setValue] = useState(null);

  const handleSearch = (text) => {
    setSearchText(text);
    //I will  Implement my search logic here
    console.log("Search for:", text);
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

  return (
    <View style={{ height: windowHeight }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <View style={styles.maincontainer}>
            <Headers />

            <View style={styles.contentContainer}>
              <View style={styles.userNameWelcomeContainer}>
                <Text style={styles.userNameWelcomeText1}>Welcome back</Text>

                <Text style={styles.userNameWelcomeText2}>Raul Gisa</Text>
              </View>
            </View>
          </View>
          <View style={{ height: windowHeight - 200 }}>
            <ScrollView style={{ backgroundColor: Colors.pageBackgroundColor }}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity>
                  <View style={styles.buttonWithIcon2}>
                    <Text style={styles.buttonWithIconText2}>Filter By</Text>

                    <IconLucide
                      name="ListFilter"
                      size={20}
                      color={Colors.gray}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.buttonWithIcon2}>
                    <Text style={styles.buttonWithIconText2}>Date Range</Text>

                    <IconLucide
                      name="CalendarCheck2"
                      size={20}
                      color={Colors.gray}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddPatientCase");
                  }}
                >
                  <View style={styles.buttonWithIcon1}>
                    <IconLucide
                      name="Plus"
                      size={20}
                      color={Colors.solidWhite}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <View>
                <View style={styles.contentCards1}>
                  <View>
                    <View style={styles.Card}>
                      <View style={styles.cardFirstRow}>
                        <Text style={styles.cardFirstRowText}>
                          Total Screenings
                        </Text>
                      </View>

                      <View style={styles.cardSecondRow}>
                        <View>
                          <Text style={styles.cardSecondRowText}>130</Text>
                        </View>

                        <View>
                          <Text style={styles.cardSecondRowText}>
                            <IconLucide
                              name="Users"
                              size={20}
                              color={Colors.lightBlue}
                            />
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View style={styles.Card}>
                      <View style={styles.cardFirstRow}>
                        <Text style={styles.cardFirstRowText}>
                          Test for Other Diseases{" "}
                        </Text>
                      </View>

                      <View style={styles.cardSecondRow}>
                        <View>
                          <Text style={styles.cardSecondRowText}>105</Text>
                        </View>

                        <View>
                          <Text style={styles.cardSecondRowText}>
                            <IconLucide
                              name="Clock"
                              size={20}
                              color={Colors.lightBlue}
                            />
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.contentCards2}>
                  <View>
                    <View style={styles.Card}>
                      <View style={styles.cardFirstRow}>
                        <Text style={styles.cardFirstRowText}>
                          Isolate and Investigate
                        </Text>
                      </View>

                      <View style={styles.cardSecondRow}>
                        <View>
                          <Text style={styles.cardSecondRowText}>500</Text>
                        </View>

                        <View>
                          <Text style={styles.cardSecondRowText}>
                            <IconLucide
                              name="CircleAlert"
                              size={20}
                              color={Colors.lightBlue}
                            />
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View>
                    <View style={styles.Card}>
                      <View style={styles.cardFirstRow}>
                        <Text style={styles.cardFirstRowText}>
                          Linked to Testing
                        </Text>
                      </View>

                      <View style={styles.cardSecondRow}>
                        <View>
                          <Text style={styles.cardSecondRowText}>25</Text>
                        </View>

                        <View>
                          <Text style={styles.cardSecondRowText}>
                            <IconLucide
                              name="CircleCheck"
                              size={20}
                              color={Colors.lightBlue}
                            />
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <DashboardDonutChart />
                <DashboardBarChart />
                <DashboardLineChart />
                <DashboardDonutChartTwo />
                <DashboardDonutChartThree />
                <DashboardDT />
              </View>
            </ScrollView>
          </View>
          <Menu />
        </>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Colors.pageBackgroundColor,
  },

  menuHamburger: {
    alignItems: "center",
    marginTop: -24,
    marginHorizontal: 20,
    backgroundColor: "#f8f8f8",
    width: 30,
  },

  contentContainer: {
    //marginHorizontal: 20,
  },

  contentHeaderTextContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 20,
  },

  contentHeaderText: {
    fontSize: windowHeight / 50,
    color: Colors.lightBlue,
  },

  contentCards: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  contentCards1: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  contentCards2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },

  Card: {
    marginTop: 10,
    width: windowWidth * 0.45,
    height: windowHeight * 0.1,
    borderRadius: 10,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  cardFirstRow: {
    marginHorizontal: 10,
    marginTop: 5,
  },

  cardFirstRowText: {
    fontSize: windowHeight / 50,
    fontWeight: 200,
    color: Colors.dark,
  },

  cardSecondRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  cardSecondRowText: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
    fontSize: windowHeight / 55,
    fontWeight: 600,
  },

  filterContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
  },

  filterInput: {
    justifyContent: "center",
    padding: 10,
    width: windowWidth * 0.45,
    height: windowHeight * 0.05,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },

  filterdropdown: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.05,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    elevation: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },

  textInputPlaceHolderStyle: {
    fontSize: 16,
  },

  dropDownPlaceHolderStyle: {
    fontSize: 16,
    color: Colors.gray,
  },

  item: {
    padding: 3,
    borderRadius: 8,
    marginVertical: 2,
  },

  textItem: {
    fontSize: 16,
    color: Colors.dark,
  },

  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 2,
  },

  userNameWelcomeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    gap: 10,
  },

  userNameWelcomeText1: {
    fontWeight: 600,
    color: Colors.lightBlue,
    fontSize: windowHeight / 50,
  },

  userNameWelcomeText2: {
    fontSize: windowHeight / 45,
    fontWeight: 300,
    color: Colors.lightBlue,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 20,
    gap: 10,
  },

  buttonWithIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.25,
    backgroundColor: Colors.lightBlue,
    borderColor: Colors.lightBlue,
    borderWidth: 1,
    borderRadius: 10,
    gap: 10,
  },

  buttonWithIconText: {
    color: Colors.solidWhite,
    fontSize: windowHeight / 60,
    
  },

  buttonWithIconText2: {
    color: Colors.gray,
    fontSize: 15,
  },

  buttonWithIcon1: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.12,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    gap: 10,
  },

  buttonWithIcon2: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.35,
    backgroundColor: Colors.solidWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    gap: 10,
  },
  buttonText: {
    fontSize: 15,
    color: Colors.solidWhite,
  },
});

export default Dashboard;
