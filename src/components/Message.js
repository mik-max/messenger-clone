import React, {forwardRef} from 'react'
import {Card, CardContent, Typography } from '@mui/material/';
import './Message.css'
const Message = forwardRef(
     ({message, id, username, url}, ref) => {
          const isUser = username === message.userName;
          const isUserImage = url === message.url;
       return (
         <div ref = {ref}>  
              <Card className= {isUserImage ? 'message__user'  : 'message__guest'}>
                   <CardContent>

                        {isUserImage? <div className='message__typography'>
                              <img src={url} className = 'message__image' /> <div>{message.message}</div>
                        </div>: <div className='message__typography'>
                              <img src={message.url} className = 'message__image' data-toggle="tooltip" data-placement="top" title={message.userName}  /> <div>{message.message}</div>
                         </div>}
                         
                   </CardContent>
              </Card>
         </div>
       )
     }
)


export default Message;
