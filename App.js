import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import RolesAndPermissions from "./src/screens/RolesAndPermissions";
import PatientInformation from "./src/screens/PatientInformation/PatientInformation";
import HealthFacilities from "./src/screens/HealthFacilities";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import Login from "./src/screens/Login";
import mainScreen from "./src/screens/mainScreen";
import RoutineCare from "./src/screens/RoutineCare/RoutineCare";
import OfflineData from "./src/screens/OfflineData/OfflineData";
import * as LucideIcons from "lucide-react-native";
import AddPatientCase from "./src/screens/AddPatientCase/AddPatientCase";
import AddPatientCaseBleedingAssessment from "./src/screens/AddPatientCase/AddPatientCaseBleedingAssessment";
import AddPatientCaseAssmentReview from "./src/screens/AddPatientCase/AddPatientCaseAssmentReview";

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name]; // Access the icon dynamically
  if (!LucideIcon) {
    return null; // Handle cases where the icon name is incorrect
  }
  return <LucideIcon size={size} color={color} />;
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // Create the Stack Navigator

// Define the Stack Navigator for Login (Auth)
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} // Hide the header for the Login screen
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* stack navigation for several screen section */}
        {/* The first screen is the Auth Stack (Login screen) */}
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false }} // Hide header for Auth Stack
        />
        <Stack.Screen name="AddPatientCase" component={AddPatientCase} />

        {/* stack navigation for several screen section */}

        {/* After login, navigate to the Drawer Navigator (Main App) */}
        <Stack.Screen name="mainScreen" options={{ headerShown: false }}>
          {() => (
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                drawerActiveTintColor: "#0790CF",
                drawerInactiveTintColor: "#000000",
              }}
              drawerContent={(props) => <CustomDrawerContent {...props} />} // Use custom drawer content
            >
              <Drawer.Screen
                name="OverView"
                component={Dashboard}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <IconLucide
                      name="LayoutDashboard"
                      size={23}
                      color={focused ? "#0790CF" : "#000000"}
                    />
                  ),
                  drawerLabelStyle: {
                    //color: "black",
                  },
                }}
              />

              <Drawer.Screen
                name="Patient Information"
                component={PatientInformation}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <IconLucide
                      name="UserRoundCog"
                      size={23}
                      color={focused ? "#0790CF" : "#000000"}
                    />
                  ),
                  drawerLabelStyle: {
                    //color: "black",
                  },
                }}
              />

              <Drawer.Screen
                name="Health Facilities"
                component={HealthFacilities}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <IconLucide
                      name="Hospital"
                      size={23}
                      color={focused ? "#0790CF" : "#000000"}
                    />
                  ),
                  drawerLabelStyle: {
                    //color: "black",
                  },
                }}
              />

              <Drawer.Screen
                name="Roles & Permissions"
                component={RolesAndPermissions}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <IconLucide
                      name="ShieldHalf"
                      size={23}
                      color={focused ? "#0790CF" : "#000000"}
                    />
                  ),
                  drawerLabelStyle: {
                    //color: "black",
                  },
                }}
              />

              <Drawer.Screen
                name="Routine care"
                component={RoutineCare}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <IconLucide
                      name="ShieldHalf"
                      size={23}
                      color={focused ? "#0790CF" : "#000000"}
                    />
                  ),
                  drawerLabelStyle: {
                    //color: "black",
                  },
                }}
              />

              <Drawer.Screen
                name="Offline Data"
                component={OfflineData}
                options={{
                  drawerIcon: ({ focused, size }) => (
                    <IconLucide
                      name="ShieldHalf"
                      size={23}
                      color={focused ? "#0790CF" : "#000000"}
                    />
                  ),
                  drawerLabelStyle: {
                    //color: "black",
                  },
                }}
              />

              <Drawer.Screen
                name="AddPatientCase"
                component={AddPatientCase}
                options={{
                  drawerItemStyle: { display: "none" }, // Hides from Drawer
                }}
              />

              <Drawer.Screen
                name="AddPatientCaseBleedingAssessment"
                component={AddPatientCaseBleedingAssessment}
                options={{
                  drawerItemStyle: { display: "none" }, // Hides from Drawer
                }}
              />

              <Drawer.Screen
                name="AddPatientCaseAssmentReview"
                component={AddPatientCaseAssmentReview}
                options={{
                  drawerItemStyle: { display: "none" }, // Hides from Drawer
                }}
              />
            </Drawer.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
