import React from "react";
import { shortAddress } from "../utils/utils";
import { useContext } from "react";
import { XmtpContext } from "../contexts/XmtpContext";
import { ContentTypeRemoteAttachment, RemoteAttachmentCodec } from "@xmtp/content-type-remote-attachment";

const MessageCard = ({msg}) => {
  const [providerState] = useContext(XmtpContext);
  const { client } = providerState;

  const decryptAttachment = async(message) =>{
    const attachment = await RemoteAttachmentCodec.load(message, client);
    return attachment
  }
  
  
  if (msg.contentType.sameAs(ContentTypeRemoteAttachment)) {
    const attachment = decryptAttachment(msg.content);
    return(
      <div>
        {attachment.fileName}
      </div> 
    )
  }

 
  return (
    <>
      <div className="msg-header flex justify-start">
        <div className="identicon" />
        <div className="convo-info align-start flex-dir-col flex justify-start">
          <div>
            <b>{shortAddress(msg.senderAddress)}</b>
          </div>
          <div>{msg.content}</div>
        </div>
      </div>
    </>
  );
}

export default MessageCard;
