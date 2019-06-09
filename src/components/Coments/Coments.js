import React from 'react';
import Coment from './Coment/Coment';

const coments = (props) => {
	let cmts = null;
	let moreCommentButton = null;
	if(props.coments && props.coments.length > 0) {
		cmts = props.coments.map( (coment, idx) => {
			return (
				<Coment
					key={idx}
					editComment={props.edit}
					deleteComment={props.remove}
					id={coment._id}
					user={coment.userid}
					isEditable={props.theBoss===coment.userid._id}
					comment={coment.comment}/>
				)
		});
		moreCommentButton = (<button className="loadComments"  onClick={props.loadMoreComments}>Load Comments</button>);
	}

	return (
		<div className="CommentsWrapper">
			{cmts}
			{moreCommentButton}
		</div>
		)
}

export default coments;