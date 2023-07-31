import React from 'react'
import uploadWithWeb3 from '../utils/uploadWithWeb3';
import { useState } from 'react';

const Attachment = () => {
    const [file, setFile] = useState(null);
    const handleFileChange = (e) => {
        setFile(e.target.files)
    }

    const handleUploadAndSend = async() =>{
        const cid = await uploadWithWeb3(file, "SoCon1")
        console.log(cid);
    }
  return (
    <div className='flex'>
    <input type="file" onChange={handleFileChange} />
    <button onClick={handleUploadAndSend}>Upload and Send</button>
  </div>
  )
}

export default Attachment