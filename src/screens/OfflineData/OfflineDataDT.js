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
  import { DataTable,Provider } from "react-native-paper";
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
  
  const OfflineData = () => {
    const [focusedField, setFocusedField] = useState(null);
    const [rowValues, setRowValues] = useState({}); 

    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectRow = (key) => {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.includes(key)
          ? prevSelectedRows.filter((rowKey) => rowKey !== key)
          : [...prevSelectedRows, key]
      );
    };

    const handleSelectAll = () => {
      if (selectAll) {
        setSelectedRows([]);
      } else {
        setSelectedRows(items.map((item) => item.key));
      }
      setSelectAll(!selectAll);
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
  
    const rotation = useRef(new Animated.Value(0)).current;
  
    const startRotation = () => {
      rotation.setValue(0);
      Animated.timing(rotation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
  
    const rotateInterpolate = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });
  
    const rotateStyle = {
      transform: [{ rotate: rotateInterpolate }],
    };
  
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
      numberOfItemsPerPageList[0]
    );
  
    const [items] = React.useState([
      {
        key: 1,
        date: "21/02/2025",
        type: "NO THREAT",
        data: "data",
      },
      {
        key: 2,
        date: "21/02/2025",
        type: "NO THREAT",
        data: "data",
      },
      {
        key: 3,
        date: "21/02/2025",
        type: "NO THREAT",
        data: "data",
      },
      {
        key: 4,
        date: "21/02/2025",
        type: "NO THREAT",
        data: "icon icon",
      },
    ]);
  
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);
  
    React.useEffect(() => {
      setPage(0);
    }, [itemsPerPage]);
  
    return (
        <Provider>
      <View>
        <View style={styles.tablecaseHeader}>
          <Text style={styles.mainHeader}>Unsynced Data</Text>
          <Text style={styles.subHeader}>
          Data that has not been synced with the server
          </Text>
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={startRotation}>
            <View style={styles.buttonWithIcon}>
              <Text style={styles.buttonWithIconText}>Sync All Data</Text>
              <Animated.View style={rotateStyle}>
                <IconLucide
                  name="RefreshCcw"
                  size={20}
                  color={Colors.solidWhite}
                />
              </Animated.View>
            </View>
          </TouchableOpacity>
  
          {/* <TouchableOpacity>
            <View style={styles.buttons}>
              <Text style={styles.buttonText}>Export</Text>
            </View>
          </TouchableOpacity> */}
  
          {/* <TouchableOpacity>
            <View style={styles.buttons}>
              <Text style={styles.buttonText}>Add new Case</Text>
            </View>
          </TouchableOpacity> */}
        </View>
  
        <ScrollView horizontal>
          <ScrollView>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={{ width: 50 }}>
                  <TouchableOpacity onPress={handleSelectAll}>
                    <IconLucide
                      name={selectAll ? "CheckSquare" : "Square"}
                      size={20}
                      color={Colors.lightBlue}
                    />
                  </TouchableOpacity>
                </DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>Date</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>Type</DataTable.Title>
                <DataTable.Title style={{ width: 150 }}>Data</DataTable.Title>
              </DataTable.Header>
  
              {items.slice(from, to).map((item) => (
                <DataTable.Row key={item.key}>
                  <DataTable.Cell style={{ width: 50 }}>
                    <TouchableOpacity onPress={() => handleSelectRow(item.key)}>
                      <IconLucide
                        name={selectedRows.includes(item.key) ? "CheckSquare" : "Square"}
                        size={20}
                        color={Colors.lightBlue}
                      />
                    </TouchableOpacity>
                  </DataTable.Cell>

                  <DataTable.Cell style={{ width: 150 }}>
                    {item.date}
                  </DataTable.Cell>

                  <DataTable.Cell style={{ width: 150 }}>
                    {item.type}
                  </DataTable.Cell>

                  <DataTable.Cell style={{ width: 150 }}>
                    {item.data}
                  </DataTable.Cell>
                  
                  
                  {/* <DataTable.Cell style={{ width: 100 }}>
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
                  </DataTable.Cell> */}
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
      </Provider>
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
      fontWeight: "600",
      color: Colors.dark,
    },
  
    subHeader: {
      fontSize: 17,
      fontWeight: "400",
      color: Colors.dark,
    },
  
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginHorizontal: 15,
      marginTop: 10,
    },
  
    buttonWithIcon: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: windowHeight * 0.05,
      width: windowWidth * 0.35,
      backgroundColor: Colors.lightBlue,
      borderColor: Colors.lightBlue,
      borderWidth: 1,
      borderRadius: 10,
      gap: 10,
    },
  
    buttonWithIconText: {
      color:Colors.solidWhite,
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
  });
  
  export default OfflineData;
