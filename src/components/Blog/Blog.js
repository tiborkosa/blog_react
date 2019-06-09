import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import Image from '../../UI/Image/Image';
import Author from '../Author/Author';

import { IoMdCalendar, IoIosThumbsUp } from 'react-icons/io';
import { MdComment } from 'react-icons/md';
import { IconContext } from "react-icons";

const blog = (props) => {
	let buttons = null;
	if(!props.isMyBlog){
		buttons = (
			<Link 
				to={{ pathname: 'read-blog/'+props.blog._id,
					state:{
						author: props.blog.author, 
						likes: props.blog.numLikes,
						comments: props.blog.numComments
					}
				}}>
				<Button>Read More</Button>
			</Link>
		)
	} else {
		buttons = (<div className="row right">
			<Button clicked={ () => props.deleteClick(props.blog._id)}>Delete</Button>
			<Button clicked={ () => props.editClick(props.historyPush, props.blog._id)}>Edit</Button>
		</div>)
	}
	return (
		<div className="Blog">
			<div className="BlogTop">
				<div className="ImgWrapper">
					<Image name={props.blog.image} />
				</div>
				<div className="HalfOver">
					<h1>{props.blog.title}</h1>
					<div>
						<span>
							<IconContext.Provider value={{ className: "Icon" }}>
								<IoMdCalendar />
							</IconContext.Provider>
							{props.blog.update_date ? props.blog.update_date.substring(0,10) : props.blog.create_date.substring(0,10)}
						</span>
						<span>
							<IconContext.Provider value={{ className: "Icon" }}>
								<IoIosThumbsUp />
							</IconContext.Provider>
							{props.blog.numLikes}
						</span>
						<span>
							<IconContext.Provider value={{ className: "Icon" }}>
								<MdComment />
							</IconContext.Provider>
							{props.blog.numComments}
						</span>
					</div>
				</div>
			</div>
			<div className="BlogBottom">
				<p>{props.blog.desc}</p>
				<Author
					firstname={props.blog.author.first_name} 
					lastname={props.blog.author.last_name} 
					image={props.blog.author.image} />
				{buttons}
			</div>
		</div>
	);
}

export default blog;