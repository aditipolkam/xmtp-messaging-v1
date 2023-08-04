import React, { useEffect, useState } from "react";
import { shortAddress } from "../utils/utils";
import { useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import { AttachmentCodec, ContentTypeAttachment, ContentTypeRemoteAttachment, RemoteAttachmentCodec } from "@xmtp/content-type-remote-attachment";


const TextView = ({content,msg}) => {
  return(
    <div className="msg-header flex justify-start">
        <div className="identicon" />
        <div className="convo-info align-start flex-dir-col flex justify-start">
          <div>
            <b>{shortAddress(msg.senderAddress)}</b>
          </div>
          <div>{content}</div>
        </div>
      </div>
  )
}

const ImageView = ({content}) =>{
  return(
    <div>
        <img
          onLoad={() => {
          window.scroll({ top: 10000, behavior: "smooth" });
          }}
          src={content}
          // title={attachment.filename}
        />
    </div> 
  )
}

const MessageCard = ({msg}) => {
  const [providerState] = useContext(XmtpContext);
  const { client } = providerState;
  const [content, setContent] = useState();
  const [isAttachment, setIsAttachment] = useState(false);


  useEffect(()=>{
    const getContent = async() => {
      // console.log(msg)
      if (msg.contentType.sameAs(ContentTypeRemoteAttachment) || msg.contentType.sameAs(ContentTypeAttachment)) {
        setIsAttachment(true)
        let attachment;
        if (msg.contentType.sameAs(ContentTypeRemoteAttachment)) {
          attachment = await RemoteAttachmentCodec.load(msg.content, client);
        }
        else{
          attachment = await AttachmentCodec.load(msg.content,client)
        }
        
        console.log(attachment)
        if(!attachment)
          return;
      
        console.log(attachment)
        if (attachment.mimeType.startsWith("image/")) {
          const objectURL = URL.createObjectURL(
            new Blob([Buffer.from(attachment.data)], {
              type: attachment.mimeType,
            })
          );
          setContent(objectURL);
        }
      }
      else{
        setIsAttachment(false)
        setContent(msg.content)
      }
    }
    getContent();

  },[msg])

  return isAttachment ? <ImageView content={content} /> : <TextView content={content} msg={msg}/>
 
}

export default MessageCard;
