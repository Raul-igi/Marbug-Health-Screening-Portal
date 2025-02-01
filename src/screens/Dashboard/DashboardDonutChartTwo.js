import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import Colors from "../../constants/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const  DashboardDonutChartTwo = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const data = [
    {
      value: 56.21,
      color: "#AD746D",
      label: "Test for Other Diseases",
      description: "Diseases (Malaria, Typhoid, Gastroenteritis) 56.21%",
    },
    {
      value: 19.14,
      color: "#8FD0A0",
      label: "Isolate and Investigate",
      description: "Isolate and Investigate 19.14%",
    },
    {
      value: 21.94,
      color: "#FF8042",
      label: "No Threat",
      description: "No Threat 21.94%",
    },
    {
      value: 5.4,
      color: "#DFA21F",
      label: "No Test Needed",
      description: "No Test Needed 2.4%",
    },
    {
      value: 3.3,
      color: "#0088FE",
      label: "Linked to Testing",
      description: "Linked to Testing 0.3%",
    },

    {
        value: 3.3,
        color: "#00C49F",
        label: "Linked to Testing",
        description: "Linked to Testing 0.3%",
      },


      {
        value: 3.3,
        color: "#BD3F15",
        label: "Linked to Testing",
        description: "Linked to Testing 0.3%",
      },
  ];

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Total Patient Activities Based Distribution</Text>
      </View>

      <PieChart
        data={data.map((item, index) => ({
          ...item,
          onPress: () => setSelectedIndex(index), // Tap to display description
        }))}
        radius={100}
        innerRadius={60} // Donut chart effect
        donut
        showText
        text={selectedIndex !== null ? data[selectedIndex].label : "Total"}
        textStyle={{ fontSize: 18, fontWeight: "bold" }}
      />
        
      {selectedIndex !== null && ( 
        <Text style={[styles.descriptionText, {color:data[selectedIndex].color}]}>   
          {data[selectedIndex].description}  
        </Text>
      )}

      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.solidWhite,
    marginHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  legendContainer: {
    marginTop: 20,
    justifyContent: "flex-start",
    width: windowWidth * 0.86,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    marginBottom: 5,
  },
  legendColor: {
    width: 15,
    height: 15,
    marginRight: 5,
    borderRadius: 10,
  },
  legendLabel: {
    fontSize: 14,
  },
});

export default DashboardDonutChartTwo;
