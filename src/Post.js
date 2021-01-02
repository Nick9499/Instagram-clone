import React, { useEffect, useState } from 'react'
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './firebase'
import firebase from 'firebase'
const Post = ({postId,userName, user, imgUrl, caption}) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(()=> {
        let unsubscribe
        if(postId){
            unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timestamp','desc').onSnapshot((snapshot)=> {
                setComments(snapshot.docs.map((doc)=> doc.data()))
            })
        }
        return ()=> {
            unsubscribe()
        }
    },[postId])

    const postComment = (e) => {
        e.preventDefault()
        db.collection('posts').doc(postId).collection('comments').add({
            text: comment,
            userName: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    return (
        <div className='post'>
            <div className="post__header">    
                <Avatar className='post__avatar' alt={userName} src="/static/images/avatar/1.jpg" />
                <h3>{userName}</h3>
            </div>
            <img src={imgUrl} className='post__image' alt=""/>
            <h4 className='post__text'><b>{userName}</b>  {" " +caption}</h4>
            <div className="post__comments">
                {comments.map((comment)=> (
                    <p>
                        <b>{comment.userName}</b> {comment.text}
                    </p>
                ))}
            </div>
            {user && (
                <form action="" className='post__commentBox'>
                <input type="text" className='post__input' placeholder='Add a comment' value={comment} onChange={(e)=> setComment(e.target.value)} />
                <button className='post__button' disabled={!comment} type='submit' onClick={postComment} >
                    Post
                </button>

            </form>
            )}
        </div>
    )
}

export default Post
