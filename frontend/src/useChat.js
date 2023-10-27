import {useEffect,useRef,useState,UseState} from "react"
import socketIOClient from 'socket.io-client'
const connectedUsers={};
const NEW_CHAT_MESSAGE_EVENT="newChatMessage"
const SOCKET_SERVER_URL="http://localhost:3001"




const useChat =(roomId)=>{
    
    const [messages,setMessages] =useState([])
    const socketRef =useRef()
    useEffect(()=>{
        socketRef.current=socketIOClient(SOCKET_SERVER_URL,{
            query:{roomId}
        })
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT,(message)=>{
            const incomingMessage={
                ...message,
                ownedByCurrentUser:message.senderId === socketRef.current.id,
                senderName: message.senderName // Include sender's name
            }
            setMessages((messages)=>[...messages,incomingMessage])
        })
        return ()=>{
            socketRef.current.disconnect();
        }
    },[roomId])
    const sendMessage =(messageBody,senderName)=>{
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT,{
            body:messageBody,
            senderName:senderName,//includes sender's name
            senderId:socketRef.current.id
        })
    }
    // console.log(messages[0])
    return {messages,sendMessage}
    
}
export default useChat;