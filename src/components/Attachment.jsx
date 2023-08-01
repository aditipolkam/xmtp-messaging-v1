import React, { useContext } from 'react'
import uploadWithWeb3 from '../utils/uploadWithWeb3';
import { useState } from 'react';
import { Client } from '@xmtp/xmtp-js';
import {
  AttachmentCodec,
  RemoteAttachmentCodec,
} from "@xmtp/content-type-remote-attachment";
import { WalletContext } from '../contexts/WalletContext';

const Attachment = () => {
  const {signer} = useContext(WalletContext)
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files[0])
    }

    const handleUploadAndSend = async() =>{
      const xmtp = await Client.create(signer, { env: "dev" });
      // Register the codecs. AttachmentCodec is for local attachments (<1MB)
      xmtp.registerCodec(new AttachmentCodec());
      //RemoteAttachmentCodec is for remote attachments (>1MB) using thirdweb storage
      xmtp.registerCodec(new RemoteAttachmentCodec());
              
      console.log("created xmtp client")

        const readAsArrayBuffer = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () =>
            reader.result instanceof ArrayBuffer
              ? resolve(reader.result)
              : reject(new Error("Not an ArrayBuffer"));
          reader.readAsArrayBuffer(file);
        });

        const data = await readAsArrayBuffer(file);

        console.log("read buffer")

        // Local file details
        const attachment = {
          filename: "Socon1",
          mimeType: "png",
          data: new Uint8Array(data),
        };

        console.log("created attachment")

        const encryptedEncoded = await RemoteAttachmentCodec.encodeEncrypted(
          attachment,
          new AttachmentCodec(),
        );

        console.log("encrypted file")

        const cid = await uploadWithWeb3(encryptedEncoded.payload, "SoCon1")
        console.log(cid);
        const url = `https://${cid}.ipfs.w3s.link/SoCon1`;
        console.log("file uploaded to web3.storage")
        console.log(url)

        const remoteAttachment = {
          url: url,
          contentDigest: encryptedEncoded.digest,
          salt: encryptedEncoded.salt,
          nonce: encryptedEncoded.nonce,
          secret: encryptedEncoded.secret,
          scheme: "https://",
          filename: attachment.filename,
          contentLength: attachment.data.byteLength,
        };
        console.log("created remote attachment")

        await conversation.send(remoteAttachment, {
          contentType: ContentTypeRemoteAttachment,
        });

        console.log("sent msg")
    }
  return (
    <div className='flex'>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUploadAndSend}>Upload and Send</button>
  </div>
  )
}

export default Attachment