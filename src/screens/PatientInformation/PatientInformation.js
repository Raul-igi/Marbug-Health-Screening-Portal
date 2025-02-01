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
import PatientInformationDT from "./PatientInformationDT";
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

const PatientInformation = () => {
  const [focusedField, setFocusedField] = useState(null);
  const navigation = useNavigation();
  const [filtered, setFiltered] = useState("");
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

  return (
    <ScrollView>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.maincontainer}>
        <View>
          <Headers />
          <View style={styles.menuHamburger}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <IconLucide name="AlignJustify" size={23} color={"black"} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.contentHeaderTextContainer}>
            <Text style={styles.contentHeaderText}>
              Marburg Health Screening Portal
            </Text>
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
          </View>
        </View>

        <View style={styles.filterContainer}>
          <View
            style={[
              styles.filterInput,
              focusedField === "textInput" && { borderColor: "#0790CF" },
            ]}
          >
            <TextInput
              placeholder="Filter by any..."
              placeholderTextColor={Colors.gray}
              style={styles.textInputPlaceHolderStyle}
              value={filtered}
              onChangeText={(text) => setFiltered(text)}
              keyboardType="default"
              autoCapitalize="none"
              onFocus={() => setFocusedField("textInput")}
              onBlur={() => setFocusedField(null)}
            />
          </View>

          <View>
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
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Filter by status"
              value={value}
              onChange={(item) => {
                setValue(item.value);
              }}
              renderItem={renderItem}
              onFocus={() => setFocusedField("dropDown")}
              onBlur={() => setFocusedField(null)}
            />
          </View>
        </View>
        <PatientInformationDT />
        <Menu />
      </View>
    </TouchableWithoutFeedback>
    </ScrollView>
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

  contentContainer: {
    marginHorizontal: 20,
  },

  contentHeaderTextContainer: {
    marginTop: 30,
    marginHorizontal: 20,
  },

  contentHeaderText: {
    fontSize: 25,
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
    fontSize: 17,
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
    fontSize: 20,
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
});

export default PatientInformation;
