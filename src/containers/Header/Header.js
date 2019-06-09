import React from 'react';
import { connect } from 'react-redux';

import SingIn from '../Authenticate/SignIn';
import EmailValidation from '../Authenticate/EmailValidation';
import UpdatePassword from '../Authenticate/UpdatePassword';
import Backdrop from '../../UI/Backdrop/Backdrop';

import TopMenu from '../../components/TopMenu/TopMenu';
import NavMenu from '../../components/TopMenu/NavMenu/NavMenu';
import NavMenuWide from '../../components/TopMenu/NavMenu/NavMenuWide';
import Aux from '../../hoc/Aux/Aux';

import * as actions from '../../store/actions';

class TopNav extends React.Component {
	state = {
		isWide : false
	}

	checkWidth = _ => {
		let isWide = false;
		if(window.innerWidth > 600){
			isWide = true;
		} 
		this.setState({
			isWide : isWide
		});
	}
	componentDidMount(){
		this.checkWidth();
		window.addEventListener("resize", this.checkWidth.bind(this));
	}

	render(){
		let modal = null;

		if(this.props.showSignIn) {
			modal = <Backdrop><SingIn /></Backdrop>;
		}else if(this.props.showEmailValidation){
			modal = <Backdrop><EmailValidation /></Backdrop>;
		} else if(this.props.showUpdatePassword){
			modal = <Backdrop><UpdatePassword /></Backdrop>;
		}
		let header = (
			<Aux>
				<div className={this.props.isNavOpen? 'navBackdrop': ''} 
					onClick={ e => this.props.menuOpenHandler(e)}></div>
				<TopMenu
					click={this.props.menuOpenHandler}
					active={this.props.isNavOpen} />
				
					<NavMenu 
						open={this.props.isNavOpen}
						isAuthenticated={this.props.isAuthenticated}
						click={this.props.menuOpenHandler}
						login={this.props.logIn}
						logout={this.props.logOut}
					/>
			</Aux>
		);
		if(this.state.isWide){
			header = (<NavMenuWide
				isAuthenticated={this.props.isAuthenticated}
				login={this.props.logIn}
				logout={this.props.logOut}
			/>)
		}

		return(
			<div className="Header">
				{header}
				 {modal}
			</div>

		);
	}
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.authReducer.tokenId,
		showSignIn: state.authReducer.showSignIn,
		showEmailValidation: state.authReducer.showEmailValidation,
		showUpdatePassword: state.authReducer.showUpdatePassword,
		isNavOpen: state.authReducer.showNavigation,
		loggedinUser: state.authReducer.user
	}
}

const mapDispatchToProps = dispatch => {
	return{
		logIn: e => dispatch(actions.showSignInClick(e)),
		logOut: e => dispatch(actions.logOut(e)),
		menuOpenHandler: e => dispatch( actions.showNavigationClick(e))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(TopNav);
