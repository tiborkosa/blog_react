import React from 'react';
import ReactLoading from "react-loading";

//export const Article = styled('div')`
//w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`;
//spinningBubbles
export default () => (
	<div className="Backdrop">
  		<ReactLoading type={"spinningBubbles"} width="100px" heigh="100px" color="rgb(156, 42, 42)" />
  	</div>
  )
