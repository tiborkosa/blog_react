import React from 'react';

 const Input = props => {
	let inputElement = null;
 	switch(props.type){
 		case "textarea":
			inputElement = (<textarea {...props} />);
			break;
 		default:
		 	inputElement= (<input {...props} />);
	}
	return (
		<div className={["input-wrapper", props.type === 'checkbox' ? 'checkBox': ''].join(' ')}>
			<div>
				<label className={props.labelshow}>{props.label}</label>
				{inputElement}
			</div>
			<span className="error">{props.error}</span>
		</div>
	)
	 
 }

export default Input;