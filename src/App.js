import React, {useRef} from "react";
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
import './App.css'
function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); 
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(prompt('Please Enter Username'))
    
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
  
  
  const sendMessage = (event =>{
    event.preventDefault();
    try {
      const docRef = addDoc(collection(db, "messages"), {
        message: input,
        userName: username,
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
      {/* <h1>Hello {username}</h1> */}

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
                <Message username = {username} message = {message} key = {id} />
              ))
            }
        </FlipMove>
        <div ref={messagesEndRef} />  
     </Container>
    </div>
  );
}

export default App;


const Container = styled.div`
     width: 100%;
     height: 70vh;
     overflow: scroll;
     &::-webkit-scrollbar{
          display: none;
     }
`