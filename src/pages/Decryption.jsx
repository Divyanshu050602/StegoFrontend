import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const Decryption = () => {
  const [CommentURL, setCommentURL]=useState('');
  const [imageURL, setImageURL] = useState('');
  const [keywordFile, setKeywordFile] = useState(null);
  const [status, setStatus] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');

  // ✅ On first load: check if fingerprint ID exists, otherwise generate and store it
  useEffect(() => {
    const loadFingerprint = async () => {
      let fingerprint = localStorage.getItem('fingerprint_id');
      if (!fingerprint) {
        try {
          const fp = await FingerprintJS.load();         // Load fingerprint library
          const result = await fp.get();                 // Generate fingerprint
          fingerprint = result.visitorId;
          localStorage.setItem('machine_id', fingerprint);     // Store for compatibility
          localStorage.setItem('fingerprint_id', fingerprint); // Main key used later
        } catch (err) {
          console.error('FingerprintJS error:', err);
        }
      }
    };

    loadFingerprint();
  }, []);

  // ✅ Main decryption handler
  const handleDecrypt = async (e) => {
    e.preventDefault();
    setStatus('Decrypting...');
  
    try {
      // ✅ Step 1: Check keywordFile
      if (!keywordFile) {
        setStatus('Please upload a keyword text file.');
        return;
      }
  
      // ✅ Step 2: Read keyword text
      const keywordText = await keywordFile.text();
      const keywordList = keywordText
        .split(/[\n, ]+/)       // Split on newline, comma, or space (one or more)
        .map((k) => k.trim())   // Trim each word
        .filter(Boolean);       // Remove empty strings

  
      // ✅ Step 3: Get timestamp
      const timestamp = Math.floor(Date.now() / 1000);
  
      // ✅ Step 4: Get geolocation safely
      const position = await new Promise((resolve, reject) => 
        navigator.geolocation.getCurrentPosition(resolve, reject)
      ).catch((error) => {
        console.error('Geolocation error:', error);
        setStatus('Location access denied or unavailable.');
        throw new Error('Location access failed');
      });
  
      const latitude = position.coords.latitude.toString();
      const longitude = position.coords.longitude.toString();
  
      // ✅ Step 5: Get device ID
      const device_id = localStorage.getItem('fingerprint_id');
      if (!device_id) {
        setStatus('Device fingerprint not found. Please reload the page.');
        return;
      }
  
      // ✅ Step 6: Basic validation
      if (!CommentURL || !imageURL) {
        setStatus('Please fill in all fields.');
        return;
      }
  
      // ✅ Step 7: Create FormData
      const formData = new FormData();
      formData.append('comment_url', CommentURL);
      formData.append('image_url', imageURL);
      formData.append('keyword', keywordList);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('machine_id', device_id);
      formData.append('timestamp', timestamp);

      console.log({
        imageURL,
        CommentURL,
        keywordText,
        latitude,
        longitude,
        machine_id:device_id,
        timestamp,
      });
      
  
      // ✅ Step 8: Post to backend
      const response = await axios.post('https://flask-backend-production-d659.up.railway.app/decrypt', formData);
  
      if (response.data.message) {
        setDecryptedMessage(response.data.message);
        setStatus('');
      } else {
        setStatus('Decryption failed: Time expired or invalid data.');
      }
  
    } catch (error) {
      console.error('Error during decryption:', error.response || error.message);
      setStatus('Decryption failed due to error.');
    }
  };

  return (
    <div className='container mx-auto'>
      <form onSubmit={handleDecrypt}>
        <h1 className='text-3xl font-bold text-center mb-6 text-white'>Decryption</h1>

        {/* 🔑 Input field for image URL (required) */}
        <p className='text-2xl text-white'>Enter The Image URL that you want to decrypt</p>
        <input type='text' placeholder='Enter Image URL'
          value={imageURL} onChange={(e) => setImageURL(e.target.value)}
          className='block w-full p-2 border rounded mb-4 text-black bg-white' required />

        {/* 📁 File input for keyword file (.txt only) */}
        <p className='text-2xl text-white'>Enter The Comment Post for Comment Extraction. </p>
        <input type='text' placeholder='Enter Url for comment Extraction'
        value={CommentURL}
          onChange={(e) => setCommentURL(e.target.value)}
          className='block w-full p-2 mb-4 border rounded bg-white text-black' required />

        {/* 📁 File input for keyword file (.txt only) */}
        <p className='text-2xl text-white'>Enter The Keyword Text File for Decryption. <sup className='ml-2'>*</sup><i>.txt file accepted</i></p>
        <input type='file' accept='.txt'
          onChange={(e) => setKeywordFile(e.target.files[0])}
          className='block w-full p-2 mb-4 border rounded bg-white text-black' required />

        {/* 🔓 Decrypt button */}
        <button type='submit' className='px-4 py-2 rounded text-black bg-white'>Decrypt Image</button>
      </form>

      {/* ⌛ Show status like "Decrypting..." or error messages */}
      {status && <p className="mt-4 text-white text-xl">{status}</p>}

      {/* 📬 Display decrypted message from backend */}
      {decryptedMessage && (
        <div className="mt-6 p-4 bg-green-200 text-black rounded-xl">
          <h2 className="text-xl font-bold">Decrypted Message:</h2>
          <p>{decryptedMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Decryption;
