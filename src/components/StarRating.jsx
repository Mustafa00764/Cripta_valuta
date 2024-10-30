import React, { useState } from 'react';

const StarRating = ({ maxRating = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  return (
    <div className="flex space-x-1 cursor-pointer">
      {Array.from({ length: maxRating }, (_, index) => {
        const wholeStarValue = index + 1;
        const halfStarValue = index + 0.5;

        return (
          <div key={index} className="relative">
            {/* Половина звезды - левая */}
            <span
              className={`text-2xl relative z-[1] overflow-hidden ${
                hover >= halfStarValue || rating >= halfStarValue ? 'text-yellow-400' : 'text-gray-300'
              }`}
              style={{ width: '50%', display: 'inline-block' }}
              onClick={() => handleClick(halfStarValue)}
              onMouseEnter={() => handleMouseEnter(halfStarValue)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </span>

            {/* Половина звезды - правая */}
            <span
              className={`text-2xl relative overflow-hidden  right-0 ${
                hover >= wholeStarValue || rating >= wholeStarValue ? 'text-yellow-400' : 'text-gray-300'
              }`}
              style={{ width: '100%', display: 'inline-block', position: 'absolute' }}
              onClick={() => handleClick(wholeStarValue)}
              onMouseEnter={() => handleMouseEnter(wholeStarValue)}
              onMouseLeave={handleMouseLeave}
            >
              ★
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
