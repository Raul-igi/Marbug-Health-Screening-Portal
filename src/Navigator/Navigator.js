import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Menu from "../components/Menu";
import AddPatientCase from "../screens/AddPatientCase/AddPatientCase";


const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />


<Stack.Screen
        name="AddPatientCase"
        component={AddPatientCase}
        options={{ headerShown: false }}
      />



    </Stack.Navigator>
  );
};

export default Navigator;
