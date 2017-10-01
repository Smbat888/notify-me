import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import Logo from './common/Logo';
import Form from './common/Form';
import Wallpaper from './common/Wallpaper';
import ButtonSubmit from './common/ButtonSubmit';
import SignupSection from './common/SignupSection';

class LoginScreen extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const { email, password } = this.props;

        this.props.loginUser({ email, password });
    }
    
	render() {
		return (
			<Wallpaper>
				<Logo />
				<Form
                    onChangeEmailText={this.onEmailChange.bind(this)}
                    emailValue={this.props.email}
                    onChangePasswordText={this.onPasswordChange.bind(this)}
                    passwordValue={this.props.password}
                />
				<SignupSection/>
				<ButtonSubmit
                    onPress={this.onButtonPress.bind(this)}
                />
			</Wallpaper>
		);
	}
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginScreen);