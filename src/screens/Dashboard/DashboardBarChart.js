import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Colors from "../../constants/Colors";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DashboardDonutChart = ({data}) => {
  const [selectedIndex, setSelectedIndex] = useState(null);


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Case Status Comparison</Text>
      </View>

      <BarChart
        data={data.map((item, index) => ({
          value: item.value, 
          frontColor: item.color, 
          //label: item.label, // Pass label
          onPress: () => setSelectedIndex(index), 
        }))}
        barWidth={25} 
        spacing={20} 
        //roundedTop
        yAxisThickness={1}
        xAxisThickness={1} 
        height={200}
        width={windowWidth * 0.65}  
      />
        
      {selectedIndex !== null && ( 
        <Text style={[styles.descriptionText, {color:"red"}]}>   
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
    fontSize: windowHeight / 50,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    marginTop: 20,
    fontSize: 16,
    color: "red",
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

export default DashboardDonutChart;
