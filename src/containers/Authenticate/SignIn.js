import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import {IoIosClose} from 'react-icons/io';
import { IconContext } from "react-icons";
import checkValidity from '../../Util/CheckValidity';

class SignIn extends React.Component {
	state={
		userName:'',
		userPassword: '',
		validate:{
			userName:{
				error: '',
                validation:{
					required: true,
					email: true
                }
			},
			userPassword:{
				error: '',
                validation:{
					required: true,
					min: 6
                }
			}
		}
	}

	userNameChangeHandler = e => {
		if(this.props.err) this.props.clearError();
		this.setState({
			...this.state,
			userName: e.target.value
		});
	}

	passwordChangeHandler = e => {
		if(this.props.err) this.props.clearError();
		this.setState({
			...this.state,
			userPassword: e.target.value
		});
	}

	signInFormSubmit = e => {
		e.preventDefault();
		this.props.signInSubmit({
			username: this.state.userName.trim(),
			password: this.state.userPassword.trim()
		});
	}
	passwordValidationHandler = e => {
		let err = checkValidity("Password",e.target.value, this.state.validate.userPassword.validation);
		let stateCopy = JSON.parse(JSON.stringify(this.state));
		stateCopy.validate.userPassword.error = err;
		this.setState(stateCopy);
	}
	userNameValidationHandler = e => {
		let err = checkValidity("Email",e.target.value, this.state.validate.userName.validation);
		let stateCopy = JSON.parse(JSON.stringify(this.state));
		stateCopy.validate.userName.error = err;
		this.setState(stateCopy);
	}

	render(){
		return(
			<div className="Authenticate">
				<IconContext.Provider value={{ className: "a_icon" }}>
					<IoIosClose onClick={this.props.close}/>
				</IconContext.Provider>
				<h3>Login</h3>
				{/* <Button>Login with Facebook</Button>
				<Button className="goo">Login with Google</Button> */}
				<h4>Login with email</h4>
				<form onSubmit={this.signInFormSubmit}>
					<p className="signInError">{this.props.err ? "User name and/or password is incorrect!": null} </p>
					<Input 
						type='text' 
						error={this.state.validate.userName.error}
						value={this.state.userName} 
						placeholder='Email' 
						onChange={this.userNameChangeHandler}
						onBlur={this.userNameValidationHandler} />
					<Input 
						type='text' 
						error={this.state.validate.userPassword.error}
						value={this.state.password} 
						placeholder='Password' 
						onChange={this.passwordChangeHandler}
						onBlur={this.passwordValidationHandler} />
					<Input type="checkbox" name="remember" label="Remember?"/>

					<Button type='submit'>Sign In</Button>
				</form>
				<div className="non_member">
					<p onClick={this.props.signUp}>Not a member yet?</p>
				</div>
				<div className="non_member">
					<p onClick={this.props.forgot}>Forgot your credentials?</p>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.authReducer.tokenId,
		err: state.common.error
	}
}

const mapDispatchToProps = dispatch => {
	return{
		signInSubmit : data => dispatch( actions.signIn(data)),
		signUp : _ => dispatch(actions.showSignUpClick(false)),
		forgot: _ => dispatch( actions.showSignUpClick(true)),
		close: _ => dispatch( actions.closeLogIn()),
		clearError: _ => dispatch(actions.clearAuthError())
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
