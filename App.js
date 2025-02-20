import React, { useEffect, useReducer, useMemo } from "react";
import "react-native-gesture-handler";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import RolesAndPermissions from "./src/screens/RolesAndPermissions";
import PatientInformation from "./src/screens/PatientInformation/PatientInformation";
import HealthFacilities from "./src/screens/HealthFacilities";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import Login from "./src/screens/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mainScreen from "./src/screens/mainScreen";
import RoutineCare from "./src/screens/RoutineCare/RoutineCare";
import OfflineData from "./src/screens/OfflineData/OfflineData";
import * as LucideIcons from "lucide-react-native";
import AddPatientCase from "./src/screens/AddPatientCase/AddPatientCase";
import AddPatientCaseBleedingAssessment from "./src/screens/AddPatientCase/AddPatientCaseBleedingAssessment";
import AddPatientCaseAssmentReview from "./src/screens/AddPatientCase/AddPatientCaseAssmentReview";
import AddPatientCaseBleedingAssessmentNo from "./src/screens/AddPatientCase/AddPatientCaseBleedingAssessmentNo";
import Profile from "./src/screens/Profile/Profile";
import PatientInformationActionBTN from "./src/screens/PatientInformation/PatientInformationActionBTN";
import { AuthContext } from "./src/context/context";
import axios from 'axios';

const IconLucide = ({ name, size = 24, color = "black" }) => {
  const LucideIcon = LucideIcons[name]; // Access the icon dynamically
  if (!LucideIcon) {
    return null; // Handle cases where the icon name is incorrect
  }
  return <LucideIcon size={size} color={color} />;
};

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator(); // Create the Stack Navigator

const screenOptionStyle = {
  headerShown: false,
};

export default function App() {
  const initialState = {
    isLoading: true,
    token: null,
    user: null,
    role: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
          user: action.user,
          role: action.role,
        };
      case "LOGIN":
        return {
          ...prevState,
          token: action.token,
          isLoading: false,
          user: action.user,
          role: action.role,
        };
      case "LOGOUT":
        return {
          ...prevState,
          isLoading: false,
          token: null,
          user: null,
          role: null,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = useMemo(() => ({
    // otpSignIn: async (user_id,otp) => {
    //   const postObj = JSON.stringify({
    //     doctor_id:user_id,
    //     otp:otp
    //   })
    //   axios
    //         .post(${baseURL}/api/verify-doctor, postObj,{headers:{"Content-Type": "application/json"}})
    //         .then((res) => {
    //           if (res.data.status === true) {
    //             const items = [
    //               ["token", "my token"],
    //               ["user", JSON.stringify(res.data.data)],
    //               ["role", "doctor"],
    //             ];
    //             AsyncStorage.multiSet(items, () => {
    //               console.log("asyncstorage set successfully");
    //             });
    //             dispatch({
    //               type: "LOGIN",
    //               token: res.data.token,
    //               user: JSON.stringify(res.data.data),
    //               role: "doctor",
    //             });
    //           } else {
    //             alert(res.data.message);
    //           }
    //         })
    //         .catch((err) => {
    //           alert(err.message);
    //         });
    // },

    //signin section
    signIn: async (credential, password) => {
      const postObj = JSON.stringify({
        credential: credential,
        password: password,
      });

      console.log(postObj);

      axios.defaults.headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`https://test.ohereza.rw/api-hs/auth/login`, postObj)
        .then((res) => {
          console.log(res.data)
          if (res.data.success === true) {
            const items = [
              ["token", res.data.data.token],
              ["user", JSON.stringify(res.data.data)],
              ["role", res.data.data.role.name],
            ];
            AsyncStorage.multiSet(items, () => {
              console.log("asyncstorage set successfully");
            });
            dispatch({
              type: "LOGIN",
              token: res.data.data.token,
              user: JSON.stringify(res.data.data),
              role: res.data.data.role.name,
            });
          } else {
            alert(res.data.message);
          }
        })
        .catch((error) => {
          if (error.status === 401) {
            alert("Wrong credentials");
          } else {
            alert("Something went wrong");
          }
        });
    },

    signOut: async () => {
      try {
        await AsyncStorage.multiRemove(["token", "user"]);
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: "LOGOUT" });
    },
  }));

  const retrieveData = async () => {
    let token;
    let user;
    let role;
    try {
      const data = await AsyncStorage.multiGet(["token", "user", "role"]);
      const new_data = data.map((entry) => entry[1]);
      token = new_data[0];
      user = new_data[1];
      role = new_data[2];

      dispatch({
        type: "RETRIEVE_TOKEN",
        token: token,
        user: user,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  // Define the Stack Navigator for Login (Auth)
  // const AuthStack = () => {
  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  } else {
    if (loginState.token !== null) {
      return (
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator screenOptions={{headerShown:false}}>
              {/* stack navigation for several screen section */}
              {/* The first screen is the Auth Stack (Login screen) */}
              

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
                    drawerContent={(props) => (
                      <CustomDrawerContent {...props} />
                    )} // Use custom drawer content
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
                      name="AddPatientCaseBleedingAssessmentNo"
                      component={AddPatientCaseBleedingAssessmentNo}
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

                    <Drawer.Screen
                      name="Dashboard"
                      component={Dashboard}
                      options={{
                        drawerItemStyle: { display: "none" }, // Hides from Drawer
                      }}
                    />

                    <Drawer.Screen
                      name="Profile"
                      component={Profile}
                      options={{
                        drawerItemStyle: { display: "none" }, // Hides from Drawer
                      }}
                    />

                    <Drawer.Screen
                      name="PatientInformationActionBTN"
                      component={PatientInformationActionBTN}
                      options={{
                        drawerItemStyle: { display: "none" }, // Hides from Drawer
                      }}
                    />
                  </Drawer.Navigator>
                )}
              </Stack.Screen>
              <Stack.Screen name="Dashboard" component={Dashboard} />
              <Stack.Screen name="AddPatientCase" component={AddPatientCase} />
              <Stack.Screen
                name="AddPatientCaseBleedingAssessmentNo"
                component={AddPatientCaseBleedingAssessmentNo}
              />
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }} // Hide the header for the Login screen
              />
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      );
    }
  }

  // };
}
