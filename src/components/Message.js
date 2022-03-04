import React, {forwardRef} from 'react'
import {Card, CardContent, Typography } from '@mui/material/';
import './Message.css'
const Message = forwardRef(
     ({message, id, username}, ref) => {
          const isUser = username === message.userName;
       return (
         <div ref = {ref}>  
              <Card className= {isUser ? 'message__user'  : 'message__guest'}>
                   <CardContent>
                        <Typography className='message__typography' variant = "h5" component = "h2">
                        {!isUser && `${message.userName || 'Unknown User'} : `} {message.message}
                        </Typography>
                   </CardContent>
              </Card>
         </div>
       )
     }
)

export default Message
