import React, {useContext} from 'react';
import styled from 'styled-components';
import Contexts from './Contexts';
import { logOut } from '../firebase';
function Header({user}) {
     const userStatus = useContext(Contexts)
  return (
    <Nav>
          <Logo src = 'https://i.pinimg.com/originals/f5/28/cc/f528cc010d8a9bfcef07d08106976d0f.png' />
          <h2>Whisper Chat</h2>
          {user && 
               <div className='user-div'>
                    <h6>{user}</h6>
                    <img src ={userStatus.userImage} onClick = {() => {userStatus.signOut(); logOut()}} />
               </div>
          }
    </Nav>
  )
}

export default Header
let Nav = styled.nav`
     display: flex;
     background: #0E0E10;
     padding: 10px;
     border-bottom: 1px solid #ccc;
     font-weight: 700;
     font-size: 28px;
     height: 80px;
     padding: 5px;
     align-items: center;
     justify-content: space-between;
     color: #f5f5f5;
     div.user-div{
          display: flex;
          align-items: center;
          justify-content:space-between;
          padding: 5px 2px;
     }
     div.user-div h6{
          color: #3FCA89;
          font-size: 18px;
          font-weight: 500;
     }
     div.user-div img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 0 4px;
          cursor: pointer;
     }

      
     /* small mobile :320px. */
     @media (max-width: 767px) {
          h2{
               font-size: 17px;
          }
          div.user-div img{
               width: 40px;
               height: 40px;
          }
          div.user-div h6{
               font-size: 16px;
               font-weight: 700;
          }
     
     }
     @media screen and (max-device-width: 480px) and (orientation: portrait){
          h2{
               font-size: 16px;
          }
          div.user-div img{
               width: 30px;
               height: 30px;
          }
          div.user-div h6{
               font-size: 14px;
               font-weight: 700;
          }
     }

     /* Large Mobile :480px. */
     @media only screen and (min-width: 480px) and (max-width: 767px) {
          div.user-div img{
               width: 40px;
               height: 40px;
          }
          div.user-div h6{
               font-size: 16px;
               font-weight: 700;
          }
     }
`
let Logo = styled.img`
     width: 70px;
     height: 70px;
     @media (max-width: 767px) {
          &{
               width: 40px;
               height: 40px;
          }
     
     }
     
     /* Large Mobile :480px. */
     @media only screen and (min-width: 480px) and (max-width: 767px) {
          &{
               width: 40px;
               height: 40px
          }
     }
`