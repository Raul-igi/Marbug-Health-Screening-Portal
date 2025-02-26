import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react-native";
import Colors from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import apiService from "../../apiService/apiService";
const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name];
  return LucideIcon ? <LucideIcon size={size} color={color} /> : null;
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const SwitchCategory = ({onCategoryChange }) => {

  const navigation = useNavigation();
  const [focusedField, setFocusedField] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);


  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiService.fetchCategories();
        const formattedCategories = data.map((category) => ({
          label: category.name,
          value: category.id,
        }));
        setCategories(formattedCategories);
        onCategoryChange(formattedCategories[0].value)
        setSelectedCategory(formattedCategories[0].value)
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);




  useEffect(() => {
    const fetchCategoryQuestions = async () => {
      if (!selectedCategory) return;
      try {
        //console.log("Fetching questions for category ID:", selectedCategory);
        const questionsData = await apiService.fetchQuestions(selectedCategory);
        //console.log("Fetched Questions:", questionsData);
        setQuestions(questionsData || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
  
    fetchCategoryQuestions();
  }, []);
  





  
  return (
    <View style={styles.CategoryMainContainer}>
      <View style={styles.Container}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.solidWhite} />
        ) : (
          <Dropdown
            containerStyle={styles.dropdownContainer}
            style={[
              styles.filterdropdown,
              focusedField === "dropDown" && { borderColor: "#0790CF" },
            ]}
            selectedTextStyle={styles.selectedTextStyles}
            inputSearchStyle={styles.inputSearchStyle}
            data={categories}
            value={selectedCategory}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Switch Categories"
            PlaceholderTextColor={Colors.solidWhite}
            onChange={(item) => onCategoryChange(item.value)}
            onFocus={() => setFocusedField("dropDown")}
            onBlur={() => setFocusedField(null)}
            renderRightIcon={() => (
              <IconLucide
                name="ArrowLeftRight"
                size={20}
                color={Colors.solidWhite}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  CategoryMainContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingBottom: 10,
    width: windowWidth,
    backgroundColor: "red",
  },
  Container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginHorizontal:20,

  },
  filterdropdown: {
    width: windowWidth * 0.60,
    height: windowHeight * 0.05,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.solidWhite,
    backgroundColor: Colors.lightBlue,
  },
 
  dropdownContainer: {
    borderRadius: 10,
    backgroundColor: Colors.pageBackgroundColor,
   
  },

  selectedTextStyles:{
    color:Colors.solidWhite,
    fontSize:windowHeight /60,
    textAlign: "center", 
    alignSelf: "center", 
    width: "100%", 
  


  }
});
export default SwitchCategory;