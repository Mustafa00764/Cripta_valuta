// src/components/LoadingScreen.js

import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex justify-center w-[100vw] items-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full border-8 border-t-8 border-blue-500 w-16 h-16 mx-auto mb-4"></div>
        <p className="text-lg text-gray-700">Загрузка...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
