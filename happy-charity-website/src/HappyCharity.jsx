import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const MAX_AMOUNT = 1000;

export default function HappyCharity() {
  const [happyReason, setHappyReason] = useState('');
  const [donors, setDonors] = useState([]);
  const [totalDonated, setTotalDonated] = useState(0);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');

  const handleDonate = () => {
    if (!happyReason) return;
    const newDonor = { id: uuidv4(), reason: happyReason };
    const newTotal = totalDonated + 4;
    const updatedDonors = [...donors, newDonor];
    setDonors(updatedDonors);
    setTotalDonated(newTotal);
    setHappyReason('');

    if (newTotal >= MAX_AMOUNT) {
      const randomDonor = updatedDonors[Math.floor(Math.random() * updatedDonors.length)];
      setSelectedDonor(randomDonor);
      setVideoUrl('https://yourdomain.com/videos/kfc-celebration.mp4');
      setCertificateUrl(`https://yourdomain.com/certificates/${randomDonor.id}.pdf`);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>😊 Taste Don't Need Money, It Needs Our Happiness</h1>
      <p style={{ textAlign: 'center' }}>Feeling happy? Tell us why and donate ₹4 to help take someone to KFC!</p>
      <input
        placeholder="I'm happy because..."
        value={happyReason}
        onChange={(e) => setHappyReason(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={handleDonate} disabled={!happyReason} style={{ width: '100%', padding: '10px', backgroundColor: 'green', color: 'white' }}>
        Donate ₹4
      </button>
      <progress value={totalDonated} max={MAX_AMOUNT} style={{ width: '100%', marginTop: '20px' }}></progress>
      <p style={{ textAlign: 'center' }}>Raised: ₹{totalDonated} / ₹{MAX_AMOUNT}</p>
      {totalDonated >= MAX_AMOUNT && selectedDonor && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ textAlign: 'center', color: 'orange' }}>🎉 We took someone to KFC!</h2>
          <video controls style={{ width: '100%' }}>
            <source src={videoUrl} type="video/mp4" />
          </video>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <a href={certificateUrl} target="_blank" rel="noopener noreferrer">🎖 Download Certificate for {selectedDonor.reason}</a>
          </div>
        </div>
      )}
    </div>
  );
}
