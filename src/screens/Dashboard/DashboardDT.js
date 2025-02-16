import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef, useState,useEffect } from "react";
import Colors from "../../constants/Colors";
import { DataTable, List } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as LucideIcons from "lucide-react-native";
import apiService from "../../apiService/apiService";

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

const DashboardDT = () => {
  const navigation = useNavigation();
  const [focusedField, setFocusedField] = useState(null);
  const [rowValues, setRowValues] = useState({}); 
  
  const [loading,setLoading] =useState({});
  const [casesList, setCasesList] = useState([]);














  useEffect(() => {
    const fetchPatientCaseListData = async () => {
      try {
        setLoading(true);
  
        // Fetch data from API
        const response = await apiService.fetchPatientCaseList();
  
        // Handle different API response formats
        const responseData = response.data?.data || response.data;
        if (!responseData || !Array.isArray(responseData)) {
          throw new Error("Invalid API response format");
        }
  
        console.log("Cases Data:", responseData);
  
        // Format data
       
  
        setCasesList(responseData);
        console.log("Formatted Cases:", responseData);
      } catch (error) {
        console.error("Error fetching patient cases:", error.toString());
      } finally {
        setLoading(false);
      }
    };
  
    fetchPatientCaseListData();
  }, []);  
  
























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
      name: "Rusekeza Simon Pierre",
      healthFacility: "Test Cs",
      location: "KIGALI,Gasabo,Jabana",
      status: "NO THREAT",
      action: "icon icon",
      date: "10/02/2025",
    },
    {
      key: 2,

      name: "Nsoro Raul",
      healthFacility: "Test Cs",
      location: "KIGALI,Gasabo,Jabana",
      status: "NO THREAT",
      action: "icon icon",
      date: "10/02/2025",
    },
    {
      key: 3,
      name: "John Karake",
      healthFacility: "Test Cs",
      location: "KIGALI,Gasabo,Jabana",
      status: "NO THREAT",
      action: "icon icon",
      date: "10/02/2025",
    },
    {
      key: 4,
      name: "Chris Muhawenimana",
      healthFacility: "Test Cs",
      location: "KIGALI,Gasabo,Jabana",
      status: "NO THREAT",
      action: "icon icon",
      date: "10/02/2025",
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  return (
    <View>
      <View style={styles.accordionMainContainer}>
        <List.Section title="Recent Cases">
        <List.Section style={{marginTop:-20}} title="Overview of the most recent patient cases"/>



        {casesList?.map((caseDetails) =>(
          <List.Accordion

            style={styles.accordionContainer}
            title={`${caseDetails.casePersonalInfo.firstName} ${caseDetails.casePersonalInfo.lastName}`}
            titleStyle={{ fontSize: windowHeight / 55 }}
            backgroundColor="red"
            left={(props) => (
              <List.Icon {...props} icon="table" color="#0790CF" />
            )}
          >
            <List.Item style={styles.accordionRow} title={`Status: ${caseDetails.status.name}`} />
            <List.Item
              style={styles.accordionRow}
              title={`Date: ${caseDetails.casePersonalInfo.createdAt.split("T")[0]}`}
            />
          </List.Accordion>

        ))}














          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddPatientCase");
            }}
          >
            <View style={styles.buttonWithIcon1}>
              <Text style={styles.buttonWithIconText}>View All Cases</Text>
            </View>

          </TouchableOpacity>
        </List.Section>

      </View>

        <View style={styles.addNewPatientCaseContainer}>

        <View>
        <Text style={styles.newPatientMainHeader}>Add New Patient Case</Text>
        </View>

        <View>
        <Text style={styles.newPatientSubHeader}>Add a new patient case to your records. This will help you keep track of all patient cases efficiently.</Text>
        </View>

        <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddPatientCase");
            }}
          >
            <View style={styles.buttonWithIcon1}>
              <IconLucide name="Plus" size={20} color={Colors.solidWhite} />
              <Text style={styles.buttonWithIconText}>Patient Case</Text>
            </View>
            
          </TouchableOpacity>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tablecaseHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
  },

  mainHeader: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: windowHeight / 50,
    fontWeight: 400,
    color: Colors.solidWhite,
  },

  subHeader: {
    fontSize: windowHeight / 60,
    fontWeight: 400,
    color: Colors.solidWhite,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    gap: 10,
  },

  buttonWithIconText: {
    fontSize: 15,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.33,
    //backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.solidWhite,
    gap: 5,
  },

  buttonText: {
    fontSize: windowHeight / 70,
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

  accordionRow: {
    //backgroundColor: "#e2eafc",
    paddingLeft: -40,
    marginHorizontal: 10,
    borderRadius: 5,
    //borderWidth: 1,
    //borderColor: "#d7e3fc",
  },

  continersGraber: {
    backgroundColor: Colors.lightBlue,
    height: windowHeight * 0.2,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  LinearGradStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderColor: "#55a630",
    borderWidth: 1,
  },

  accordionMainContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    borderRadius: 10,
    marginBottom: windowHeight * 0.01,
  },

  accordionContainer: {
    backgroundColor: "#e2eafc",
    paddingLeft: -40,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d7e3fc",
  },

  buttonWithIcon1: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.32,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    marginTop: 10,
    gap: 5,
  },

  buttonWithIconText: {
    color: Colors.solidWhite,
    fontSize: windowHeight / 60,
  },

  addNewPatientCaseContainer:{
    marginBottom: windowHeight * 0.2,
    marginTop:20,
    marginHorizontal:20,
    padding:20,
    borderWidth:1,
    borderColor:Colors.lightBlue,
    
  },
  newPatientMainHeader:{
    color:Colors.dark,
    fontWeight:600,
    fontSize: windowHeight / 50,
  },

  newPatientSubHeader:{
    marginTop:10
  }
});

export default DashboardDT;
