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
         {/* <Header url = {photoUrl} name = {displayName} /> */}
         <Container>
               <ImageDiv>
                    <img src='./images/chat-img.svg' />
               </ImageDiv>
               <FormDiv>
                    <h1>Welcome to Whisper Chat</h1>
                    <p>A simple group chat for everyone</p>
                    <Button onClick={handleSignUp}><span> <img src='./images/google-icon2.png'/> </span> Login With Google</Button>
               </FormDiv>
         </Container>
         {/* <Content>
              <h3>Welcome to Whisper Chat</h3>
              <Button onClick = {handleSignUp}>
                    Login With Google
              </Button>
         </Content> */}
    </div>
  )
}

export default Login

const Container = styled.div`
     display: flex;
     height: 100vh;
     /* small mobile :320px. */
     @media (max-width: 767px) {
          flex-wrap: wrap;
     
     }
     
     /* Large Mobile :480px. */
     @media only screen and (min-width: 480px) and (max-width: 767px) {
          flex-wrap: wrap;
     
     }
     /* Tablet desktop :768px. */
     @media (min-width: 768px) and (max-width:1024px) {
          flex-wrap: wrap;
     }

`
const ImageDiv = styled.div`
     flex: 50%;
     img{
          width: 100%;
          height: 100%;
          object-fit: cover;
     }
     @media (max-width: 767px) {
          flex: 100%;
     }
     
     /* Large Mobile :480px. */
     @media only screen and (min-width: 480px) and (max-width: 767px) {
          flex: 100%;
     }
     @media (min-width: 768px) and (max-width: 1024px) {
          flex: 100%;
     }
`
const FormDiv = styled.div`
     flex: 50%;
     display: flex; 
     flex-direction: column;
     padding: 0px 25px 0px;
     justify-content: center;
     /* border-left: 1px solid lightgrey; */
     @media (max-width: 767px) {
          flex: 100%;
          padding: 0px 15px 0px;
          h1{
               font-size: 20px;
               font-weight: 700;
          }
          p{
               font-size: 16px;
          }
     }
     
     /* Large Mobile :480px. */
     @media only screen and (min-width: 480px) and (max-width: 767px) {
          flex: 100%;
          padding: 0px 15px 0px;
          h1{
               font-size: 24px;
               font-weight: 700;
          }
          p{
               font-size: 16px;
          }
     }
     h1{
          text-align: center;
          color: #47C756;
          margin: 10px 0px ;
     }
     p{
          text-align: center;
          font-size: 18px;
          margin-bottom: 10px;
     }
`
// const Content = styled.div`
//      display: flex;
//      flex-direction: column;
//      padding: 100px 50px;
//      position: absolute;
//      top: 50%;
//      left: 50%;
//      width: 100%;
//      max-width: 950px;     
//      background-color: #088f7f;
//      transform: translate(-50%, -50%);  
//      h3{
//           color: black;
//           font-size: 30px;
//           font-weight: 700;
//      }   
// `
const Button = styled.button`
     padding: 20px;
     border-radius: 4px;
     display: flex;
     align-items: center;
     justify-content: center;
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
     @media (max-width: 767px) {
          margin-top: 5px;
     }
     span{
          width: 20px;
          height: 20px;
          margin-right: 5px;
          img{
               height: 100%;
               width: 100%;
               object-fit: cover;
          }
     }
     &:hover{
          background-color: #075E55;
     }
`