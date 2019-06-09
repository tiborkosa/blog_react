import React from 'react';

import Input from '../../../UI/Input/Input';
import Image from '../../../UI/Image/Image';

class Coment extends React.Component {
	state = {
		edit : false,
		text: this.props.comment
	}
	editClickedHandler = _ => {
		this.setState({
		...this.state,
		edit: !this.state.edit
	})};

	commentFormEditHandler = e => {
		e.preventDefault();
		if(this.state.text.trim() !== ''){
			this.props.editComment({
				id:this.props.id, 
				comment: this.state.text
			})
			this.setState({
				...this.state,
				edit : false
			})
		}
	}
	commentChangeHandler = e => this.setState({
		...this.state,
		text: e.target.value
	});

	render(){
		let buttons = null;
		if(this.props.isEditable && !this.state.edit){
			buttons = (
				<div className="ComentButton">
					<span onClick={() => this.props.deleteComment(this.props.id)}>delete</span>
					<span onClick={this.editClickedHandler} >edit</span>
				</div>
			)
		}
		let commentField = <p>{this.state.text}</p>;
		if(this.state.edit){
			commentField = (
				<form onSubmit={this.commentFormEditHandler}>
					<Input
						type='text'
						value={this.state.text}
						onChange={ (e) => this.commentChangeHandler(e)} />
					<div className="ComentButton">
						<span onClick={this.editClickedHandler}>cancel</span>
						<span><button type="submit">submit</button></span>
					</div>
				</form>
			)
		}
		return(
			<div className= "Coment">
				<div className="commentUser">
					<Image imgFor="icon" name={this.props.user.image} />
					<p>{this.props.username}</p>
				</div>
				{commentField}
				{buttons}	
			</div>
		)
	}
}

export default Coment;