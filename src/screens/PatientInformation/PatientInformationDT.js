import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { DataTable, List } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import * as LucideIcons from "lucide-react-native";
import apiService from "../../apiService/apiService";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

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

const PatientInformationDT = () => {
  const navigation = useNavigation();

  const [focusedField, setFocusedField] = useState(null);
  const [rowValues, setRowValues] = useState({});
  //const toggleFirstModal = () => setShow(!show);
  const [show, setShow] = useState(false);

  const [selectedCase, setSelectedCase] = useState(null);
  const [casesList, setCasesList] = useState([]);
  const [loading, setLoading] = useState({});

  const toggleFirstModal = (caseDetails = null) => {
    if (caseDetails) {
      console.log(caseDetails)
      setSelectedCase(caseDetails);
      setShow(true);
    } else {
      setShow(false);
      setSelectedCase(null);
    }
  };




  const formatDate = (isoString) => {
    const date = new Date(isoString);
  
    // Extract components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
  
    // Format time in 12-hour format with AM/PM
    const hours = date.getHours() % 12 || 12; // Convert 0 to 12 for AM/PM format
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
  
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${ampm}`;
  };
  
  
  

  









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

        //console.log("Cases Data:", responseData);

        // Format data

        setCasesList(responseData);
       // console.log("Formatted Cases:", responseData);
      } catch (error) {
        console.error("Error fetching patient cases:", error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchPatientCaseListData();
  }, []);







  const fetchCaseDetailsById = async (caseId) => {
    try {
   
      const response = await apiService.fetchCaseById(caseId);
      console.log(response)
      if (response.success) {
        toggleFirstModal(response.data)
      }
  
    } catch (error) {
      console.error(`Error fetching details for case ${caseId}:`, error.toString());
      return null; // Return null if fetching fails
    }
  };
  





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

  return (
    <View>
      <View style={styles.tablecaseHeader}>
        <Text style={styles.mainHeader}>Patient Cases (10)</Text>
        <Text style={styles.subHeader}>Monitoring your patient cases</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <View style={styles.buttons}>
            <Text style={styles.buttonText}>Export</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>{navigation.navigate("AddPatientCase")}}>
          <View style={styles.buttons}>
            <IconLucide name="Plus" size={20} color={Colors.solidWhite} />
            <Text style={styles.buttonText}>New Case</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.accordionMainContainer}>
        <List.Section title="Data Table">
          {casesList?.map((caseDetails) => (
            <List.Accordion
              style={styles.accordionContainer}
              title={`${caseDetails.casePersonalInfo.firstName} ${caseDetails.casePersonalInfo.lastName}`}
              titleStyle={{ fontSize: windowHeight / 55 }}
              backgroundColor="red"
              left={(props) => (
                <List.Icon {...props} icon="table" color="#0790CF" />
              )}
            >
              <List.Item
                style={styles.accordionRow}
                title={`Date: ${
                  caseDetails.casePersonalInfo.createdAt.split("T")[0]
                }`}
              />

              <List.Item
                style={styles.accordionRow}
                title={`Health Facility: ${caseDetails.healthFacility.name}`}
              />

              <List.Item
                style={styles.accordionRow}
                title={`Location: ${caseDetails.healthFacility.province} ,${caseDetails.healthFacility.district} ,${caseDetails.healthFacility.sector} ,${caseDetails.healthFacility.cell}`}
              />

              <List.Item
                style={styles.accordionRow}
                title={`Status: ${caseDetails.status.name}`}
              />

              <List.Item
                style={styles.accordionRow}
                title="Actions:"
                right={(props) => (
                  <TouchableOpacity
                    style={styles.viewStatus}
                    onPress={() => fetchCaseDetailsById(caseDetails.id)}
                  >
                    <IconLucide name="Eye" size={20} color={Colors.lightBlue} />
                  </TouchableOpacity>
                )}
              />
            </List.Accordion>
          ))}
        </List.Section>

        <Modal
          isVisible={show}
          backdropOpacity={0.5} // Disable the black background
          onBackdropPress={()=>toggleFirstModal()}
          //animationType="fade"
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Suspect details</Text>
            </View>

            <ScrollView>
              {selectedCase ? (
                <>
                  <View style={styles.modalSubHeader}>
                    <Text style={styles.modalSubHeaderText}>
                      Showing suspect details for{" "}
                      {selectedCase.casePersonalInfo?.firstName}
                    </Text>
                  </View>

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>Name</Text>
                    <Text style={styles.userTextDescription}>
                      {selectedCase.casePersonalInfo?.firstName}{" "}
                      {selectedCase.casePersonalInfo?.lastName}
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>Telephone</Text>
                    <Text style={styles.userTextDescription}>
                      {selectedCase.casePersonalInfo?.telephone}
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>Status</Text>
                    <Text style={styles.userTextDescription}>
                      {selectedCase.status?.name}
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>
                      Registered At
                    </Text>
                    <Text style={styles.userTextDescription}>
                    {formatDate(selectedCase.casePersonalInfo.createdAt)}
                    </Text>
                  </View>

                  <View style={styles.modalHeader2}>
                    <Text style={styles.modalHeaderText}>
                      Assessment Review
                    </Text>
                  </View>

                  <View style={styles.modalSubHeader2}>
                    <Text style={styles.modalSubHeaderText}>
                      Information of the suspect gathered
                    </Text>
                  </View>

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>Name</Text>
                    <Text style={styles.userTextDescription}>
                    {selectedCase.casePersonalInfo?.firstName}{" "}
                    {selectedCase.casePersonalInfo?.lastName}
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>
                      Health Center
                    </Text>
                    <Text style={styles.userTextDescription}>{selectedCase.healthFacility?.name}</Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.leftSideHeader}>
                    <Text style={styles.leftSideHeaderText}>
                      Has he/she had any unexplained bleeding?
                    </Text>
                  </View>

                  <View style={styles.leftSideHeader}>
                    <Text style={styles.leftSideHeaderText}>
                      Select all symptoms that the patient is experiencing
                    </Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.modalHeader2}>
                    <Text style={styles.modalHeaderText}>
                      Screening Officer
                    </Text>
                  </View>

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>Name</Text>
                    <Text style={styles.userTextDescription}>{selectedCase.screenerPersonalInfo?.firstName || 'N/A'}</Text>
                  </View>

                  <View style={styles.userDescription}>
                    <Text style={styles.userTextDescription}>Phone</Text>
                    <Text style={styles.userTextDescription}>{selectedCase.screenerPersonalInfo?.telephone || "N/A"}</Text>
                  </View>

                  <View style={styles.separator} />

                  <View style={styles.modalHeader2}>
                    <Text style={styles.modalHeaderText}>Status History</Text>
                  </View>

                  <View style={styles.historyContainer}>
                  {selectedCase.statusTracks.length === 0 && (

                    <Text style={styles.historyText}>
                     No status history available.
                    </Text>
                  )}

                  {/* {selectedCase.statusTracks.length>0 && (
                    selectedCase.statusTracks.map(track=>(
                      <Text>{track.name}</Text>
                    ))
                  )} */}
                  </View>
                </>
              ) : (
                <Text>No case data available</Text>
              )}

              <View style={styles.buttonContainer2}>
                <TouchableOpacity onPress={() => toggleFirstModal()}>
                  <View style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
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
    fontSize: windowHeight / 50,
    fontWeight: 600,
    color: Colors.dark,
  },

  subHeader: {
    fontSize: windowHeight / 50,
    fontWeight: 400,
    color: Colors.dark,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10,
    gap: 20,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.29,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    gap: 5,
  },

  buttonText: {
    fontSize: windowHeight / 55,
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
  accordionContainer: {
    backgroundColor: "#e2eafc",
    paddingLeft: -40,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d7e3fc",
  },
  accordionMainContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    borderRadius: 10,
    marginBottom: windowHeight * 0.2,
  },
  accordionRow: {
    paddingLeft: -40,
    marginHorizontal: 10,
    borderRadius: 5,
  },

  viewStatus: {
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth * 0.2,
    height: windowHeight * 0.035,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
  },

  //modal

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    height: "140%",
    marginTop: "100%",
  },

  //modal content

  modalHeader: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalHeaderText: {
    fontSize: windowHeight / 50,
    fontWeight: "600",
    color: Colors.lightBlue,
  },

  modalSubHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  modalSubHeaderText: {
    fontSize: windowHeight / 50,
    fontWeight: "500",
    color: Colors.dark,
  },

  userDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
    marginTop: 20,
  },

  userTextDescription: {
    fontSize: windowHeight / 55,
    color: Colors.gray,
  },

  modalHeader2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  modalSubHeader2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  leftSideHeader: {
    marginTop: 15,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  leftSideHeaderText: {
    fontSize: windowHeight / 55,
    fontWeight: "600",
    color: Colors.dark,
  },

  historyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  historyText: {
    fontSize: windowHeight / 50,
    fontWeight: "400",
    color: Colors.gray,
  },

  buttonContainer2: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  cancelButton: {
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.05,
    width: windowWidth * 0.39,
    backgroundColor: Colors.solidWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlue,
    marginTop: 10,
  },

  cancelButtonText: {
    color: Colors.lightBlue,
    fontSize: 14,
    fontWeight: 700,
  },

  separator: {
    height: 1,
    marginTop: 15,
    backgroundColor: Colors.lightGray,
  },
});

export default PatientInformationDT;
