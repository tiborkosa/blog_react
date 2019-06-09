import React from 'react';
import Logo from '../TopMenu/Logo/Logo';

const footer = () => (
 <div className="Footer">
 	<div className="footerSections">
	 	<section>
			 <Logo />
			 <h4>T-blog is where you blog</h4>
		 </section>
		<section>
			<h5>Follow us</h5>
			<ul>
				<li>Facebook</li>
				<li>Twitter</li>
				<li>Instagram</li>
				<li>LinkedIn</li>
			</ul>
		</section>
		<section>
			<h5>Page</h5>
			<ul>
				<li>Home</li>
				<li>About</li>
				<li><p>LogedIn ></p>
					<ul>
						<li>Create Blog</li>
						<li>Your Blogs</li>
						<li>Your Settings</li>
						<li>About You</li>
					</ul>	
				</li>
			</ul>
		</section>
	</div>
	<p>@2019 All rights reserved.</p>
 </div>
)

export default footer;