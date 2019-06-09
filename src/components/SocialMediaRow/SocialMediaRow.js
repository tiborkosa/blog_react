import React from 'react';

const socialMediaRow = (props) => (
	<div className="SocialMediaRow">
		<div className={props.wasLiked ? 'liked' : ''} onClick={props.like}>Like<span>({props.numberOfLikes})</span></div>
		<div onClick={props.comment}>Comment<span>({props.numberOfComments})</span></div>
		<div onClick={props.share}>Share</div>
	</div>
);

export default socialMediaRow;