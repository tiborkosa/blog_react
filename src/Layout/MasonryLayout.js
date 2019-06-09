import React from 'react';
import PropTypes from 'prop-types';

import Blog from '../components/Blog/Blog';

const MasonryLayout = props => {

    const columnWrapper = {};
    const result = [];

    // create column
    for(let i = 0; i < props.column; i++){
        columnWrapper[`column${i}`] = [];
    }

    // devide children into columns
    for(let i = 0; i < props.blogs.length; i++){
        const columIndex = i % props.column;
        columnWrapper[`column${columIndex}`].push(
            <Blog
                isMyBlog={props.isMine || false}
                deleteClick={props.deleteBlog}
                editClick={props.editBlog}
                blog={props.blogs[i]}
                historyPush={props.hisPush}
                key={i}/>
        );
    }
        // wrap children in each column with a div
    for(let i = 0; i < props.column; i++){
        result.push(
            <div key={`column${i}`}>
                {columnWrapper[`column${i}`]}
            </div>
        );
    }

    return (
        <div className={["Masonry", props.isMine? 'MyBlog': ''].join(' ')}>
            {result}
        </div>
    )
}

MasonryLayout.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object),
    column: PropTypes.number.isRequired
};

export default MasonryLayout;
