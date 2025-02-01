import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useState } from "react";
import Colors from "../../constants/Colors";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
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
  { label: "Isolate and Investigate", value: "1" },
  { label: "Discharge", value: "2" },
  { label: "Isolate and Investigate After Three Days", value: "3" },
  {
    label: "Test for Other Diseases(Malaria,Typhoid,Gastroenteritis",
    value: "4",
  },
  { label: "Retake Test", value: "5" },
  { label: "No Threat", value: "6" },
  { label: "No Test Needed", value: "7" },
  { label: "Error", value: "8" },
  { label: "Linked To Testing", value: "9" },
];

const RoutineCareDT = () => {
  const [focusedField, setFocusedField] = useState(null);
  // Updated to use an object to track values for each row
  const [rowValues, setRowValues] = useState({}); // Track dropdown values for each row

  const renderItem = (item, isSelected) => {
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

  //Icon rotation config section
  const rotation = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    rotation.setValue(0); // Reset the rotation to start from 0
    Animated.timing(rotation, {
      toValue: 1, // Complete one full rotation
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const rotateStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };
  //End of Icon rotation config section

  //pagination section

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  //End of pagination section

  const [items] = React.useState([
    {
      key: 1,
      improvementStartDateRemainingTime: 20120,
      name: "Rusekeza Simon Pierre",
      healthFacility: "Test Cs",
      location: "KIGALI,Gasabo,Jabana",
      status: "NO THREAT",
      action: "icon icon",
    },
    {
      key: 2,
      improvementStartDateRemainingTime: 20120,
      name: "Nsoro Raul",
      healthFacility: "Test Cs",
      location: "KIGALI,Gasabo,Jabana",
      status: "NO THREAT",
      action: "icon icon",
    },
    {
      key: 3,
      improvementStartDateRemainingTime: 20120,
      name: "John Karake",
      healthFacility: "Test Cs",
      location: "KIGALI,Gasabo,Jabana",
      status: "NO THREAT",
      action: "icon icon",
    },
    {
      key: 4,
      improvementStartDateRemainingTime: 20120,
      name: "Chris Muhawenimana",
      healthFacility: "Test Cs",
      location: "KIGALI,Gasabo,Jabana",
      status: "NO THREAT",
      action: "icon icon",
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View>
      <View style={styles.tablecaseHeader}>
        <Text style={styles.mainHeader}>Patients To Test</Text>
        <Text style={styles.subHeader}>
          Patients isolated and ready for testing after 3 days
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={startRotation}>
          <View style={styles.buttonWithIcon}>
            <Text style={styles.buttonWithIconText}>Reset Filters</Text>
            <Animated.View style={rotateStyle}>
              <IconLucide
                name="RefreshCcw"
                size={20}
                color={Colors.lightBlue}
              />
            </Animated.View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.buttons}>
            <Text style={styles.buttonText}>Export</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.buttons}>
            <Text style={styles.buttonText}>Add new Case</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal>
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={{ width: 50 }}>#</DataTable.Title>
              <DataTable.Title style={{ width: 150 }}>Names</DataTable.Title>
              <DataTable.Title style={{ width: 120 }}>
                Health Facility
              </DataTable.Title>
              <DataTable.Title style={{ width: 150 }}>Location</DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>ISDRT</DataTable.Title>
              <DataTable.Title style={{ width: 100 }}>Status</DataTable.Title>
              <DataTable.Title style={{ width: 100,marginLeft:100 }}>Actions</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map((item) => (
              <DataTable.Row key={item.key}>
                <DataTable.Cell style={{ width: 50 }}>
                  {item.key}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}>
                  {item.name}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 120 }}>
                  {item.healthFacility}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}>
                  {item.location}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>
                  {item.improvementStartDateRemainingTime}
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 100 }}>
                  <View>
                    <Dropdown
                      containerStyle={{
                        borderRadius: 10,
                        backgroundColor: Colors.pageBackgroundColor,
                        padding: 10,
                      }}
                      style={[
                        styles.filterdropdown,
                        focusedField === item.key && { borderColor: "#0790CF" },
                      ]}
                      placeholderStyle={styles.dropDownPlaceHolderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={data}
                      maxHeight={300}
                      labelField="label"
                      valueField="value"
                      placeholder="Filter by status"
                      value={rowValues[item.key] || null} // Use row-specific value
                      onChange={(selectedItem) => {
                        setRowValues((prev) => ({
                          ...prev,
                          [item.key]: selectedItem.value, // Set value for this specific row
                        }));
                      }}
                      renderItem={(dropdownItem) =>
                        renderItem(
                          dropdownItem,
                          dropdownItem.value === rowValues[item.key]
                        )
                      }
                      onFocus={() => setFocusedField(item.key)}
                      onBlur={() => setFocusedField(null)}
                    />
                  </View>
                </DataTable.Cell>
                <DataTable.Cell style={{ width: 100, marginLeft:100 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginRight: 10 }}
                      onPress={() =>
                        console.log(`Edit action for ${item.name}`)
                      }
                    >
                      <IconLucide
                        name="Eye"
                        size={20}
                        color={Colors.lightBlue}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        console.log(`Delete action for ${item.name}`)
                      }
                    >
                      <IconLucide
                        name="History"
                        size={16}
                        color={Colors.lightBlue}
                      />
                    </TouchableOpacity>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={(page) => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={"Rows per page"}
            />
          </DataTable>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tablecaseHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  mainHeader: {
    fontSize: 20,
    fontWeight: 600,
    color: Colors.dark,
  },

  subHeader: {
    fontSize: 17,
    fontWeight: 400,
    color: Colors.dark,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
  },

  buttonWithIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.29,
    backgroundColor: Colors.solidWhite,
    borderColor: Colors.lightBlue,
    borderWidth: 1,
    borderRadius: 10,
    gap: 10,
  },

  buttonWithIconText: {
    fontSize: 15,
  },

  buttons: {
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.29,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 15,
    color: Colors.solidWhite,
  },

  //dropdown styling section
  filterdropdown: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.05,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.lightGray,
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

  //dropdown styling section
});

export default RoutineCareDT;
