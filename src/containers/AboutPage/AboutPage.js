import React from 'react';
import {connect} from 'react-redux'

import Image from '../../UI/Image/Image';
import {MAIN_ABOUT} from '../../Common';
import * as actions from '../../store/actions';

class AboutPage extends React.Component {
	constructor(props){
		super(props);
		let expTime = localStorage.getItem('tblogExpTime');
    	if(expTime && Date.now() > new Date(expTime)) {
    		this.props.logout();
    	}
	}
	componentDidMount(){
		if(!this.props.aboutMe){
			this.props.loadAbout(MAIN_ABOUT);
		}
	}
	render(){
		if(this.props.axiosError === 'logout'){
			this.props.logout()
		}
		let abt = (<p>Loading ...</p>);
		if(this.props.aboutMe){
			abt = (<div>
				<h1>{ (this.props.aboutMe.user.first_name || '') +" "+ (this.props.aboutMe.user.last_name || '')}</h1>
				<div className="ImgWrapper">
					<Image name={this.props.aboutMe.image} />
				</div>
				<p>{this.props.aboutMe.about}</p>
				{/* <div className="AboutContact">Connect with me...</div> */}
			</div>)
		}
		return(
			<div className="About">
				{abt}
			</div>
		)	
	}
}
const mapStateToProps = state => {
	return {
		aboutMe: state.blogReducer.about
	}
}
const mapDispatchToProps = dispatch => {
	return {
		logout : _ => dispatch(actions.logOut()),
		loadAbout: id => dispatch(actions.getAbout(id))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);