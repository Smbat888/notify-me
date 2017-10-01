import React, { Component } from 'react';
import { 
    Router, 
    Scene, 
    Actions, 
    ActionConst 
} from 'react-native-router-flux';

import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomeScreen from './components/HomeScreen';

const RouterComponent = () => { 
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="loginScreen"
	            component={LoginScreen}
	            animation='fade'
	            hideNavBar={true}
	            initial={true}
	        />
	        <Scene key="registerScreen"
	            component={RegisterScreen}
	            animation='fade'
	            hideNavBar={true}
	        />
            <Scene key="homeScreen"
	            component={HomeScreen}
	            animation='fade'
	            hideNavBar={true}
	        />
	      </Scene>
	    </Router>
	  );
}

export default RouterComponent;