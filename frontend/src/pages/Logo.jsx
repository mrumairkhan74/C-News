import React, { useEffect, useState } from 'react';
import './logo.css';
import { Timer } from 'lucide-react';

const Logo = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Optional: for AM/PM format
  });

  return (
    <div className='flex flex-col items-center mt-[50px] m-3 p-2'>
      <img 
        src="./images/logo.png" 
        alt="Logo" 
        className="logo-animation mix-blend-darken block w-[100px] h-[100px] m-auto drop-shadow-lg drop-shadow-blue-700 rounded-lg" 
      />


      {/* Live Numeric Clock */}
      <div className="flex items-center space-x-2 text-gray-700 text-xl font-mono m-4">
      <p className="text-gray-500 text-sm m-4">{formattedDate} || </p>

        <span>⏱ {formattedTime}</span>
      </div>
    </div>
  );
};

export default Logo;
