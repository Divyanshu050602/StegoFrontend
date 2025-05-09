import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

function Encryption() {
  // State variables for storing input values
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [keyword, setKeyword] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [startTimestamp, setStartTimestamp] = useState('');
  const [endTimestamp, setEndTimestamp] = useState('');
  const [loading, setLoading] = useState(false); // Indicates loading state during encryption
  const [encryptedImageURL, setEncryptedImageURL] = useState(null); // Stores encrypted image blob URL
  const [error, setError] = useState(''); // Stores any errors

  // Function to generate URL and send email to recipient using EmailJS
  const handleGenerateAndSendEmail = () => {
    console.log({
      image,
      message,
      keyword,
      recipientEmail,
      senderEmail,
      startTimestamp,
      endTimestamp,
    });

    // Generate unique URL using sender's email
    const generatedURL = `https://tracking-location-page.vercel.app/index.html?sender=${senderEmail}`;

    // Params for emailjs template
    const templateParams = {
      sender_email: senderEmail,
      recipient_email: recipientEmail,
      custom_url: generatedURL,
    };

    // Send email using EmailJS service
    emailjs
      .send('service_io7gjss', 'template_a8iehlk', templateParams, '0TWLfwQ7PCz8TbICC')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        alert('Email sent!');
      })
      .catch((error) => {
        console.error('Email send failed:', error);
      });
  };

  // Function to send encryption request to backend
  const handleEncryptImage = async () => {
    if (!message || !keyword || !startTimestamp || !endTimestamp || !senderEmail || !recipientEmail || !image) {
      setError('Please fill in all fields and upload an image before encryption.');
      return;
    }
  
    setLoading(true);
    setError('');
    setEncryptedImageURL(null);
  
    try {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('message', message);
        formData.append('keyword', keyword);
        formData.append('startTimestamp', startTimestamp);
        formData.append('endTimestamp', endTimestamp);
      
        const response = await fetch('https://flask-backend-production-d659.up.railway.app/encrypt', {
          method: 'POST',
          body: formData,
        });
      
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData?.error || 'Encryption failed.');
          return;
        }
      
        // ✅ Read the response as a Blob (binary file)
        const blob = await response.blob();
      
        // ✅ Create a temporary object URL from the blob
        const url = URL.createObjectURL(blob);
      
        // ✅ Set URL to trigger download link
        setEncryptedImageURL(url);
      } catch (err) {
        console.error(err);
        setError('Something went wrong while encrypting.');
      } finally {
        setLoading(false);
      }
      
  
    // Clear inputs
    // setImage(null);
    // setMessage('');
    // setKeyword('');
    // setRecipientEmail('');
    // setSenderEmail('');
    // setStartTimestamp('');
    // setEndTimestamp('');
    // document.getElementById('uploadImage').value = null;
  };
  

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">

        {/* Page heading */}
        <h1 className="text-3xl font-bold text-center mb-6">Encryption</h1>

        {/* File upload input */}
        <div className="space-y-4">
          <input
            id="uploadImage"
            type="file"
            className="w-full p-2 border rounded bg-white text-black"
            onChange={(e) => setImage(e.target.files[0])}
          />
          
          {/* Secret message input */}
          <textarea
            placeholder="Enter your secret message"
            className="w-full p-2 border rounded bg-white text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Keyword for encryption */}
          <input
            type="text"
            placeholder="Enter Keyword"
            className="w-full p-2 border rounded bg-white text-black"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          {/* Recipient Email */}
          <input
            type="email"
            placeholder="Recipient Email"
            className="w-full p-2 border rounded bg-white text-black"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />

          {/* Sender Email */}
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border rounded bg-white text-black"
            value={senderEmail}
            onChange={(e) => setSenderEmail(e.target.value)}
          />
        </div>

        {/* Timestamp Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          
          {/* Start Time */}
          <div className="flex flex-col">
            <label className="mb-1">Start Time</label>
            <input
              type="datetime-local"
              className="p-2 border rounded bg-white text-black"
              value={startTimestamp}
              onChange={(e) => setStartTimestamp(e.target.value)}
            />
          </div>
          
          {/* End Time */}
          <div className="flex flex-col">
            <label className="mb-1">End Time</label>
            <input
              type="datetime-local"
              className="p-2 border rounded bg-white text-black"
              value={endTimestamp}
              onChange={(e) => setEndTimestamp(e.target.value)}
            />
          </div>
        </div>

        {/* Access Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">

          {/* Button to generate tracking URL and send via email */}
          <button
            className="bg-yellow-500 px-4 py-2 rounded"
            onClick={handleGenerateAndSendEmail}
          >
            Generate URL & Send Email
          </button>

          {/* Button to start image encryption */}
          <button
            className="bg-blue-600 px-4 py-2 rounded"
            onClick={handleEncryptImage}
            disabled={loading}
          >
            {loading ? 'Encrypting...' : 'Encrypt Image'}
          </button>
        </div>

        {/* Display any error message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Show download button after successful encryption */}
        {encryptedImageURL && (
          <div className="mt-6 text-center">
            <p className="mb-2 text-green-400 font-medium">✅ Encrypted image ready!</p>
            <a
              href={encryptedImageURL}
              download="encrypted_image.png"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Download PNG
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Encryption;
