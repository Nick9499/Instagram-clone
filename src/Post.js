import React from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
const Post = ({userName, imgUrl, caption}) => {
    return (
        <div className='post'>
            <div className="post__header">    
                <Avatar className='post__avatar' alt={userName} src="/static/images/avatar/1.jpg" />
                <h3>{userName}</h3>
            </div>
            <img src={imgUrl} className='post__image' alt=""/>
            <h4 className='post__text'><b>{userName}</b>  {" " +caption}</h4>
        </div>
    )
}

export default Post
