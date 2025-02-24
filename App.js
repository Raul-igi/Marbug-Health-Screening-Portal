import React, { useEffect, useReducer, useMemo } from "react";
import "react-native-gesture-handler";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/Login"


import * as LucideIcons from "lucide-react-native";
import { AuthContext } from "./src/context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import Navigator from "./src/Navigator/Navigator";




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
      console.log(data)
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
          <Navigator/>
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
