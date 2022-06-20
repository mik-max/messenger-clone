import React, {useRef, useContext} from "react";
import { useState, useEffect } from "react";
import db from "./firebase";
import { collection, getDocs ,doc, onSnapshot, query, addDoc , orderBy, serverTimestamp } from "firebase/firestore"; 
import FlipMove from 'react-flip-move';
import {Button, FormControl, InputLabel, Input } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import styled from "styled-components";
import Message from "./components/Message";
import Header from "./components/Header";
import Contexts from "./components/Contexts";
import './App.css'

function Home() {
     const userStatus = useContext(Contexts)
     const [input, setInput] = useState('');
     const [messages, setMessages] = useState([]); 
     const [username, setUsername] = useState('');
     useEffect(() => {
       setUsername(userStatus.userName)
       
     }, [])
   
   
     //For scrolling to the button each time the message is updated.
     const messagesEndRef = useRef(null)
   
     const scrollToBottom = () => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
     }
   
     useEffect(() => {
       scrollToBottom()
     }, [messages]);
   
   
     const userData = async () => {
   
       const q = query(collection(db, "messages"), orderBy('timestamp', 'asc'));
   
       //const querySnapshot = await getDocs(q);
       /* const data = querySnapshot.docs.map((doc) => ({
         ...doc.data(),
         id: doc.id,
       })); */ // Used for getting all data once!
       
       const unsubscribe = await onSnapshot(q, (querySnapshot) => {
         let arrayOfData = []
        const result = querySnapshot.docs.map((doc) => ({
           message: doc.data(),
           id: doc.id
         }));
         arrayOfData.push(result)
         setMessages(result)
       });
   
      
     }
   
     useEffect(() => {
        
       userData();
       
     }, [])
     
     
     const sendMessage = ( event =>{
       event.preventDefault();
       try {
         const docRef = addDoc(collection(db, "messages"), {
           message: input,
           userName: username,
           url: userStatus.userImage,
           timestamp: serverTimestamp()
         });
       } catch (e) {
         console.error("Error adding document: ", e);
       }
          
         setInput('')
     })
     return (
       <div className="App">
          <Header user = {username}/>
   
         <form className="app__form">
         <FormControl className = 'app__formControl'>
           <Input className="app__input" placeholder="Enter a message..." value = {input} onChange = {event => setInput(event.target.value)} />
   
           <IconButton className="app__iconButton" variant = 'contained' color = "primary" disabled = {!input} type="submit" onClick={sendMessage}>
               <SendIcon/>
           </IconButton>
         </FormControl>
         </form>
   
        <Container>
          
           <FlipMove>
               {
                 messages.map(({message, id}) => (
                   <Message username = {username} message = {message} key = {id} url = {userStatus.userImage} />
                 ))
               }
           </FlipMove>
           <div ref={messagesEndRef} />  
        </Container>
       </div>
     );
}

export default Home;

const Container = styled.div`  
     width: 100%;
     height: 70vh;
     overflow: scroll;
     &::-webkit-scrollbar{
          display: none;
     }
        /* Tablet desktop :768px. */
    @media (min-width: 768px) and (max-width: 991px) {
        height: 85vh;
    }
    /* Normal desktop :992px. */
    @media (min-width: 992px) and (max-width: 1200px) {

      height: 85vh;
    }
`