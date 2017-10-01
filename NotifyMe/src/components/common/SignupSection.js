import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SignupSection extends Component {

	createAccount() {
	  // TODO action
	  Actions.registerScreen();
	}

	forgotPassword() {
       // TODO 
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.createAccount.bind(this)}>
					<Text style={styles.text}>Create Account</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.forgotPassword.bind(this)}>
					<Text style={styles.text}>Forgot Password?</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: 65,
		width: DEVICE_WIDTH,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
});
