import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import Colors from "../../constants/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight =Dimensions.get("window").height;

const DashboardLineChart = () => {
  const data = [
    { value: 40, label: "Fever" },
    { value: 85, label: "Intense Fatigue" },
    { value: 340, label: "Headache" },
    { value: 170, label: "Abdominal Pain" },
    { value: 10, label: "Vomiting" },
    { value: 85, label: "Muscle/Joint pain" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Sign Based Distribution</Text>
      <LineChart
        data={data}
        width={windowWidth * 0.65} 
        height={200} 
        initialSpacing={10} // Spacing from the start
        color="#3498db" 
        thickness={2} 
        yAxisThickness={1} 
        xAxisThickness={1}
        yAxisTextStyle={styles.axisText} // Style for y-axis text
        xAxisTextStyle={styles.axisText} // Style for x-axis text
        hideDataPoints={false} // Show data points
        dataPointsRadius={4} // Radius of the data points
        dataPointsColor="#3498db" // Color of the data points
        isAnimated // Animate the chart
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.solidWhite,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    marginHorizontal:20,
    marginTop:10
  },
  title: {
    fontSize: windowHeight / 50,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  axisText: {
    fontSize: 12,
    color: "#666",
  },
});

export default DashboardLineChart;
