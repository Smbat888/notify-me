import React, { Component } from 'react';
import {
	StyleSheet,
    View,
    Text
} from 'react-native';

export default class HomeScreen extends Component {

	render() {
		return (
			<View style={styles.container}>
				<Text>
                    Here will be Home component!!!
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	}
});