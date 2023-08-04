import React from "react";
import useStreamMessages from "../hooks/useStreamMessages";
import MessageCard from "./MessageCard";
import { useContext, useEffect } from "react";
import { XmtpContext } from "../contexts/XmtpContext";

const MessageList = ({ isNewMsg, convoMessages, selectedConvo }) => {
  useStreamMessages(selectedConvo);
  const [providerState] = useContext(XmtpContext);
  const { client } = providerState;

  // useEffect(()=>{
  //   const getMessages = async() =>{
  //     const conversation = await client.conversations.newConversation(selectedConvo)
  //       const opts = {
  //         // Only show messages from last 24 hours
  //         startTime: new Date(new Date().setDate(new Date().getDate() - 7)),
  //         endTime: new Date(),
  //       };
  //       const messagesInConversation = await conversation.messages(opts);
  //       console.log(messagesInConversation)
  //   }
  //   getMessages();
  // },[])
  
  return (
    <div className="msgs-container flex flex-dir-col">
      <div className="mt-auto">
        {!isNewMsg &&
          convoMessages.map((msg, index) => {
            
            return <MessageCard key={msg.id} msg={msg} />;
          })}
      </div>
    </div>
  );
};

export default MessageList;
