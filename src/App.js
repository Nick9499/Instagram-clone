import React, { useEffect, useState } from 'react'
import './App.css'
import Post from './Post'
import {auth, db} from './firebase'
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core'
import red from '@material-ui/core/colors/red'
import ImageUpload from './ImageUpload'
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))



const App = () => {
        const classes = useStyles()
        const [modalStyle] = useState(getModalStyle)
        const [posts, setPosts]=useState([])
        const [open, setOpen] = useState(false)
        const [openSignIn, setOpenSignIn] = useState(false)
        const [email,setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [userName, setUserName] = useState('')
        const [user, setUser] = useState(null)
        
        
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                console.log(authUser)
                setUser(authUser)
            }else{
                setUser(null)
            }
            return ()=> {
                unsubscribe()
            }
            
        })
    },[user,userName])

    useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({
                id: doc.id,
                post: doc.data()
            })))
        })
    })
    const signUp = (e) =>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=> {
            return authUser.user.updateProfile({
                displayName: userName
            })
        })
        .catch((error)=>alert(error.message))
        setOpen(false)
    }
    const signIn = (e) =>{
        e.preventDefault()
        auth.signInWithEmailAndPassword(email,password)
        .catch((err)=>alert(err.message))
        setOpenSignIn(false)
    }

    return (
        <div className='app'>
            
            <Modal
                open={open}
                onClose={()=> setOpen(false)}
            >
            
                <div style={modalStyle} className={classes.paper}>
                    <form action="" className='app__signup'>
                        <center>
                            <img  className='app__headerImage' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram"/>
                        </center>    
                        <Input placeholder='User Name' type='text' value={userName} onChange={(e)=> setUserName(e.target.value) } />
                        <Input placeholder='email' type='text' value={email} onChange={(e)=> setEmail(e.target.value) } />
                        <Input placeholder='password' type='password' value={password} onChange={(e)=> setPassword(e.target.value) } />
                        <Button color='primary' variant='contained' type='submit' onClick={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={()=> setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form action="" className='app__signup'>
                        <center>
                            <img  className='app__headerImage' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram"/>
                        </center>    
                        <Input placeholder='email' type='text' value={email} onChange={(e)=> setEmail(e.target.value) } />
                        <Input placeholder='password' type='password' value={password} onChange={(e)=> setPassword(e.target.value) } />
                        <Button color='primary' variant='contained' type='submit' onClick={signIn}>Sign In</Button>
                    </form>
                </div>
            </Modal>
            <div className="app__header">
                <img  className='app__headerImage' src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="instagram"/>
                {user? (
                <Button color='primary' variant='contained' onClick={()=> auth.signOut()}>Log out</Button>
            ):(
                <div className="app__loginContainer">
                    <Button color='primary' variant='contained' onClick={()=> setOpenSignIn(true)}>Sign in</Button>
                    <Button color='primary' variant='contained' onClick={()=> setOpen(true)}>Sign up</Button>
                </div>
            )}
            </div>
            
            <div className="app__post">
                {posts.map(({id,post})=>(
                <Post userName={post.userName} caption={post.caption} user={user} imgUrl={post.imgUrl} key={id} postId = {id} />
            ))}
            </div>
            <InstagramEmbed
                url='https://www.instagram.com/p/B_uf9dmAGPw'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
                />`
            {user?.displayName? (
                <ImageUpload  username={user.displayName}/>
            ):(
                <h3>Sorry you need to login</h3>
            )}
        </div>
    )
}

export default App
