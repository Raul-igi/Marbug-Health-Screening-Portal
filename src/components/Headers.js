import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import React from "react";
import * as LucideIcons from "lucide-react-native";
import Colors from "../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/context";
import { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import apiService from "../apiService/apiService";



const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name]; // Access the icon dynamically
  if (!LucideIcon) {
    return null; // Handle cases where the icon name is incorrect
  }
  return <LucideIcon size={size} color={color} />;
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const Headers = ({onCategoryChange }) => {


  const { signOut } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [user, setUser] = useState(null);



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

        console.log("Formatted categories nsoro:", formattedCategories); 
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
  

  





  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        //console.log("logged userssss:", storedUser)

        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Parse and store user data
        }
      } catch (error) {
        console.log("Error retrieving user data:", error);
      }
    };

    fetchUserData();
  }, []);




  return (
    <View style={styles.mainContainer}>
      {route.name !== "Dashboard" ? (
        <View>
          <View style={styles.menuHamburger}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconLucide
                name="ChevronLeft"
                size={23}
                color={Colors.solidWhite}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (











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








      )}

      <View style={styles.notificatioinProfileMainContainer}>
        {/* <TouchableOpacity>
          <View style={styles.notificationContainer}>
            <IconLucide name="Bell" size={16} color={Colors.solidWhite} />
          </View>
        </TouchableOpacity> */}

        {route.name == "Profile" ? (


          <TouchableOpacity onPress={() => signOut()}>
          <View style={styles.logoutContainer}>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

      ) : (

        <TouchableOpacity onPress={() =>navigation.navigate("Profile")}>
          <View style={styles.profileContainer}>
            <Text style={styles.profileText}>{user?.userName?.slice(0,2).toUpperCase()}</Text>
          </View>
        </TouchableOpacity>


      )}


        






      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    padding: 20,
    paddingTop: 60,
    //marginTop: 20,
    width: windowWidth,
    height: 110,
    backgroundColor: Colors.lightBlue,
  },

  notificationContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.solidWhite,
    width: 28,
    height: 28,
  },

  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBlue,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.solidWhite,
    width: 40,
    height: 40,
    
  },

  profileText: {
    fontSize: windowHeight / 55,
    color: Colors.solidWhite,
  },

  logoutContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBlue,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.solidWhite,
    width: 60,
    height: 28,
    
  },

  logoutText: {
    fontSize: windowHeight / 55,
    color: Colors.solidWhite,
  },
  

  menuHamburger: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightBlue,
    width: 30,
  },

  notificatioinProfileMainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },




  //switch category styling

   CategoryMainContainer: {
      //flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
     
      
      //width: windowWidth,
      //backgroundColor: "red",
      
      //marginHorizontal:20
    },
    Container: {
      flexDirection: "row",
      justifyContent: "center",
      //gap: 10,
      //marginHorizontal:20,
  
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

export default Headers;
