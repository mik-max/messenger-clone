import React from 'react';
import styled from 'styled-components';
function Header({user}) {
  return (
    <Nav>
          <Logo src = 'https://i.pinimg.com/originals/f5/28/cc/f528cc010d8a9bfcef07d08106976d0f.png' />
          <h2>Group Chatbot</h2>
          <h6>Hi {user} </h6>
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
     h6{
          color: #3FCA89;
          font-size: 18px;
          font-weight: 500;
     }

      
     /* small mobile :320px. */
     @media (max-width: 767px) {
          h2{
               font-size: 18px;
          }
          h6{
               font-size: 16px;
               font-weight: 700;
          }
     
     }
     
     /* Large Mobile :480px. */
     @media only screen and (min-width: 480px) and (max-width: 767px) {
          h2{
               font-size: 19px;
          }
          h6{
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
               width: 50px;
               height: 50px;
          }
     
     }
     
     /* Large Mobile :480px. */
     @media only screen and (min-width: 480px) and (max-width: 767px) {
          &{
               width: 50px;
               height: 50px
          }
     }
`