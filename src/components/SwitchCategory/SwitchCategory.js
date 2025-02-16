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

const SwitchCategory = () => {
  const navigation = useNavigation();
  const [focusedField, setFocusedField] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(null);

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
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.mainContainer}>
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
            placeholderStyle={styles.dropDownPlaceHolderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={categories}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Switch Categories"
            PlaceholderTextColor={Colors.solidWhite}
            value={value}
            onChange={(item) => setValue(item.value)}
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
  mainContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingBottom: 10,
    width: windowWidth,
    backgroundColor: Colors.lightBlue,
  },
  Container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  filterdropdown: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.05,
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.solidWhite,
    backgroundColor: Colors.lightBlue,
  },
  dropDownPlaceHolderStyle: {
    fontSize: windowHeight / 60,
    color: Colors.solidWhite,
  },
  dropdownContainer: {
    borderRadius: 10,
    backgroundColor: Colors.pageBackgroundColor,
    padding: 10,
  },
});

export default SwitchCategory;
