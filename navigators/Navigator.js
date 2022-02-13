import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../components/Profile';
import Browse from '../views/Browse';
import Add from '../views/Add';
import Favorites from '../views/Favorites';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Single from '../views/Single';
import {MainContext} from '../contexts/MainContext';
import Login from '../views/Login';
import Register from '../views/Register';
import SuccessfulRegister from '../views/SuccessfulRegister';
import { Ionicons } from "@expo/vector-icons";
import MyProfile from '../views/MyProfile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({color}) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home-outline';
            break;
          case 'Browse':
            iconName = 'menu-outline';
            break;
          case 'Add':
            iconName = 'add-circle-outline';
            break;
          case 'Favorites':
            iconName = 'heart-outline';
            break;
          case 'Profile':
            iconName = 'person-circle-outline';
            break;
        }
        return <Ionicons name={iconName} size={30} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}}></Tab.Screen>
      <Tab.Screen name="Browse" component={Browse}></Tab.Screen>
      <Tab.Screen name="Add" component={Add}></Tab.Screen>
      <Tab.Screen name="Favorites" component={Favorites}></Tab.Screen>
      <Tab.Screen name="Profile" component={MyProfile} options={{headerShown: false}}></Tab.Screen>
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(MainContext);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="MainPage"
            component={TabScreen}
            options={{headerShown: false}}
          />
          {/* <Stack.Screen
            name="List"
            component={TabScreen}
            options={{headerTransparent: true, headerShown: false}}
          ></Stack.Screen> */}
          <Stack.Screen
            name="Single"
            component={Single}
            options={{headerShown: false}}
          ></Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
          <Stack.Screen
            name="SuccessfulRegister"
            component={SuccessfulRegister}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
