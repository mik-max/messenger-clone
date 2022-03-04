import React from "react";
import { useState, useEffect } from "react";
import db from "./firebase";
import { collection, getDocs ,doc, onSnapshot, query, addDoc , orderBy, serverTimestamp } from "firebase/firestore"; 
import FlipMove from 'react-flip-move';
import {Button, FormControl, InputLabel, Input } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import Message from "./components/Message";
import './App.css'
function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); 
  const [username, setUsername] = useState('');
  useEffect(() => {
    setUsername(prompt('Please Enter Username'))
    
  }, [])

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
      <img src = 'https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100' />
      <h1>Hello {username}</h1>

      <form className="app__form">
      <FormControl className = 'app__formControl'>
        <Input className="app__input" placeholder="Enter a message..." value = {input} onChange = {event => setInput(event.target.value)} />

        <IconButton className="app__iconButton" variant = 'contained' color = "primary" disabled = {!input} type="submit" onClick={sendMessage}>
            <SendIcon/>
        </IconButton>
      </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({message, id}) => (
            <Message username = {username} message = {message} key = {id} />
          ))
        }
      </FlipMove>
    </div>
  );
}

export default App;


