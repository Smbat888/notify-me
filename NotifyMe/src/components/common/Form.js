import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	KeyboardAvoidingView,
	Keyboard,
	View,
	Animated,
	ActivityIndicator,
	TouchableOpacity,
	Image,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../assets/username.png';
import passwordImg from '../assets/password.png';
import eyeImg  from '../assets/eye_black.png';

const window = Dimensions.get('window');
const CONTENT_HEIGHT = window.width / 2;
const CONTENT_HEIGHT_SMALL = window.width / 5;

export default class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			press: false,
		};
		this.showPass = this.showPass.bind(this);
		this.imageHeight = new Animated.Value(CONTENT_HEIGHT);
	}

	showPass() {
  		this.state.press === false ? this.setState({ showPass: false, press: true }) :this.setState({ showPass: true, press: false });
	}

  	componentWillMount () {
    	this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    	this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  	}

	componentWillUnmount() {
		this.keyboardWillShowSub.remove();
		this.keyboardWillHideSub.remove();
	}

	keyboardWillShow = (event) => {
		Animated.timing(this.imageHeight, {
		duration: event.duration,
		toValue: CONTENT_HEIGHT_SMALL,
		}).start();
	};

	keyboardWillHide = (event) => {
		Animated.timing(this.imageHeight, {
		duration: event.duration,
		toValue: CONTENT_HEIGHT,
		}).start();
	};

	render() {
		return (
			<KeyboardAvoidingView 
				behavior='padding'
				style={styles.container}>
				<UserInput 
					source={usernameImg}
				    onChangeText={this.props.onChangeEmailText}
                    value={this.props.emailValue}
					placeholder='Email'
					autoCapitalize={'none'}
					returnKeyType={'done'}
					autoCorrect={false} />
				<UserInput 
					source={passwordImg}
					onChangeText={this.props.onChangeEmailText}
                    value={this.props.emailValue}
					secureTextEntry={this.state.showPass}
					placeholder='Password'
					returnKeyType={'done'}
					autoCapitalize={'none'}
					autoCorrect={false} />
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.btnEye}
						onPress={this.showPass}>
						<Image source={eyeImg} style={styles.iconEye} />
					</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	btnEye: {
		position: 'absolute',
		top: 65,
		right: 28,
 	},
  	iconEye: {
    	width: 25,
    	height: 25,
    	tintColor: 'rgba(0,0,0,0.2)',
  	}
});
