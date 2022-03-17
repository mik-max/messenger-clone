import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, provider, signIn } from '../firebase';
import Contexts from './Contexts';
function Login() {
     const navigate = useNavigate();
     const userStatus = useContext(Contexts)
     const [photoUrl, setPhotoUrl] = useState('');
     const [displayName , setDisplayName] = useState('');
     const handleSignUp = () => {
          signIn(provider).then((result) => {
               userStatus.setUserName(result.user.displayName);
               userStatus.setUserImage(result.user.photoURL);
               setDisplayName(result.user.displayName)
               setPhotoUrl(result.user.photoURL);
               userStatus.signIn();
               navigate('/home')
               /* setPhotoUrl(result.user.photoURL);
               setDisplayName(result.user.displayName) */
             console.log(result)
          })
     }
     useEffect(() =>{
          onAuthStateChanged(auth,  user => {
               if(user){
                    userStatus.setUserName(user.displayName);
                    userStatus.setUserImage(user.photoURL);
               }else{
               }
          })
     }, [])
     
  return (
    <div>
         <Header url = {photoUrl} name = {displayName} />
         <Content>
              <h3>Welcome to Whisper Chat</h3>
              <Button onClick = {handleSignUp}>
                    Login With Google
              </Button>
         </Content>
    </div>
  )
}

export default Login

const Content = styled.div`
     display: flex;
     flex-direction: column;
     padding: 100px 50px;
     position: absolute;
     top: 50%;
     left: 50%;
     width: 100%;
     max-width: 950px;     
     background-color: #088f7f;
     transform: translate(-50%, -50%);  
     h3{
          color: black;
          font-size: 30px;
          font-weight: 700;
     }   
`
const Button = styled.button`
     padding: 20px;
     border-radius: 4px;
     background-color:#075E54;
     color: white;
     cursor: pointer;
     outline: none;
     border: none;
     text-transform: uppercase;
     transition: all 0.2s ease 0s;
     font-size: 20;
     font-weight: 600;
     margin-top: 10px;
`