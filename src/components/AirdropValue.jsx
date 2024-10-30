import React from 'react';

const AirdropValue = () => {
  const daysLeft = 5; 
  const userPoints = 500; 
  const totalReward = "500 ALC"; 
  const description = "Join the revolution of decentralized finance!"; 

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h1 className="text-2xl font-bold">AlphaCoin Airdrop</h1>
      <p className="mt-2">Ends in: {daysLeft} days</p>
      <p className="mt-2">Your Points: {userPoints}</p>
      <div className="mt-4">
        <img src="/path-to-banner.jpg" alt="Project Banner" className="w-full rounded-lg" />
      </div>
      <p className="mt-4">{description}</p>
      <div className="mt-4">
        <span className="bg-green-600 px-4 py-2 rounded-full text-white">
          Reward: {totalReward}
        </span>
      </div>
    </div>
  );
};

export default AirdropValue;
