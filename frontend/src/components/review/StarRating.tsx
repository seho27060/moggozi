import React from "react";

const StarRating: React.FC<{
  rate: number;
  rateChangeHandler: (star: number) => void;
}> = ({ rate, rateChangeHandler }) => {
  const starArray = [1, 2, 3, 4, 5];

  const starHandler = (star: number, event: React.MouseEvent) => {
    event.preventDefault();
    rateChangeHandler(star);
  };

  return (
    <div>
      {starArray.map((starIndex) => {
        return (
          <button key={starIndex} onClick={(e) => starHandler(starIndex, e)}>
            {rate < starIndex ? <p>on</p> : <p>off</p>}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
