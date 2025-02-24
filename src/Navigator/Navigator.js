import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../../src/screens/Dashboard/Dashboard";
import PatientInformation from "../screens/PatientInformation/PatientInformation";
import OfflineData from "../screens/OfflineData/OfflineData";
import Profile from "../screens/Profile/Profile";
import AddPatientCase from "../screens/AddPatientCase/AddPatientCase";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator>
     <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />

    <Stack.Screen
        name="PatientInformation"
        component={PatientInformation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OfflineData"
        component={OfflineData}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
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
