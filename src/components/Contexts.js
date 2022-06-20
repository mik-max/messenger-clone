import { createContext, useState, useEffect } from "react";
const Contexts = createContext({
     signIn: () => {},
     signOut: () => {},
     setUserName: () => {},
     setUserImage: () => {},
     status: false,
     userName: '',
     userImage: '',
});

export function UserSlice (props) {
     const [userActiveStatus, setUserActiveStatus] = useState(false);
     const [displayName, setDisplayName] = useState('');
     const [photoUrl, setPhotoUrl] = useState('');
     function signedIn(){
          setUserActiveStatus(true);
     } 
     function signedOut(){
          setUserActiveStatus(false);
     }
     function setName(item){
          setDisplayName(item);
     }
     function setImage(item){
          setPhotoUrl(item)
     }
     const value = {
          status : userActiveStatus,
          userName: displayName,
          userImage: photoUrl,
          signIn: signedIn,
          setUserName: setName,
          setUserImage: setImage,
          signOut: signedOut
     }

     return <Contexts.Provider value = {value}>
          {props.children}
     </Contexts.Provider>
}
export default Contexts;