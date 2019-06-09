import React from 'react';

export default props => {
	const options = props.options.map( (op, idx) => {
		return <option key={idx} disabled={op.disabled} value={op.name}>{op.name}</option>});
	return (
		<select 
			onChange={props.changed} 
			value='' 
			className="Select">
			<option key='-1' value=''>{props.initValue}</option>
			{options}
		</select>
	)
}
