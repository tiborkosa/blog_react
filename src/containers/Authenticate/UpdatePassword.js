import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import {IoIosClose} from 'react-icons/io';
import { IconContext } from "react-icons";

class UpdatePassword extends React.Component {
	constructor(props){
		super(props);
		
		this.state= {
			emailCode: '',
			password:'',
			reEnterPassword:'',
			error: '',
			time: 180
		}
	}

	timer = setInterval( () => {
		this.setState({
			...this.state,
			time: this.state.time -1
			})
		},1000);
	onEmailCodeChange = e => {
		if(this.props.err){
			this.props.clearError()
		}
		this.setState({
			...this.state,
			emailCode: e.target.value,
			error: ''
		})
	}

	passwordChangeHandler = e => {
		if(this.props.err){
			this.props.clearError()
		}
		this.setState({
			...this.state,
			password: e.target.value,
			error: ''
		})
	}

	reenterPasswordChangeHandler = e => {
		if(this.props.err){
			this.props.clearError()
		}
		this.setState({
			...this.state,
			reEnterPassword: e.target.value,
			error: ''
		})
	}
	changePasswordFormSubmit = e => {
		e.preventDefault();
		if(this.state.password.trim() !== this.state.reEnterPassword.trim()){
			this.setState({
				...this.state,
				error: "Password don't match"
			});
			return;
		}
		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
		if(!strongRegex.test(this.state.password.trim())){
			this.setState({
				...this.state,
				error: "Your password is not strong enough!"
			});
			return;
		}
		
		this.props.updatePasswordSubmit({
			secretCode: this.state.emailCode.trim(),
			password: this.state.password.trim(),
			userEmail: this.props.email
		})
	}
	componentWillUnmount(){
		clearInterval(this.timer);
	}
	render(){
		let timer = <p className="error">Expired</p>
		if(this.state.time === 0){
			clearInterval(this.timer);	
		}else {
			let min = Math.floor(this.state.time/60);
			let sec = this.state.time-min*60;
			timer = (<p className="error">{min}:{sec < 10 ? '0'+sec: sec}</p>);
		}
		return(
			<div className="Authenticate Next">
				<IconContext.Provider value={{ className: "a_icon" }}>
					<IoIosClose onClick={this.props.close}/>
				</IconContext.Provider>
				<h3>Set password</h3>
				<form onSubmit={this.changePasswordFormSubmit}>
					<p className="error">{this.props.err ? this.props.err: null} </p> 
					<p className="error">{this.state.error ? this.state.error: null} </p> 
					<Input 
						type="text"
						value={this.state.emailCode}
						onChange={this.onEmailCodeChange}
						placeholder="Enter email code" />
						{timer}
					<Input 
						type='text' 
						value={this.state.password} 
						placeholder='Enter password' 
						onChange={this.passwordChangeHandler} />
					<Input 
						type='text' 
						value={this.state.reEnterPassword} 
						placeholder='Re enter password' 
						onChange={this.reenterPasswordChangeHandler} />
					<Button type='submit' >Submit</Button>
				</form>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		err: state.common.error,
		email: state.authReducer.email
	}
}
const mapDispatchToProps = dispatch =>{
	return {
		updatePasswordSubmit : data => dispatch( actions.changePassword(data)),
		close: _ => dispatch( actions.closeLogIn()),
		clearError: _ => dispatch(actions.clearAuthError())
	}
}

export default connect( mapStateToProps , mapDispatchToProps)(UpdatePassword);