import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {IoIosClose} from 'react-icons/io';
import { IconContext } from "react-icons";

class EmailValidation extends React.Component {
	state={
		userEmail: '',
		error: ''
	}

	emailChangeHandler = e => {
		this.setState({
			error: '',
			userEmail: e.target.value
		})
	}

	verifyEmailFormSubmitted = e => {
		e.preventDefault();
		const email = this.state.userEmail.trim();
		if(!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email)){
			this.setState({
				...this.state,
				error: 'Email is invalid!'
			});
			return;
		}
		this.props.verifyEmailFormSubmit({
			userEmail: email,
			forgotPass: this.props.isForgot
		})
	}

	render(){
		return(
			<div className="Authenticate Next">
				<IconContext.Provider value={{ className: "a_icon" }}>
					<IoIosClose onClick={this.props.close}/>
				</IconContext.Provider>
				<h3>Send email code</h3>
				<form onSubmit={this.verifyEmailFormSubmitted}>
					<p className="error">{this.props.err ? this.props.err: null} </p>
					<Input 
						type="text"
						error={this.state.error ? this.state.error: null}
						value={this.state.userEmail}
						onChange={this.emailChangeHandler}
						placeholder="Email" />
					<Button type="submit">Submit</Button>
				</form>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		err: state.common.error,
		isForgot: state.authReducer.isForgotPassword
	}
}
const mapDispatchToProps = dispatch => {
	return {
		verifyEmailFormSubmit : (data) => dispatch( actions.verifyEmail(data) ),
		close: _ => dispatch( actions.closeLogIn()),
		clearError: _ => dispatch(actions.clearAuthError())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailValidation);