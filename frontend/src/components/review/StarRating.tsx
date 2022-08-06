import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { rateChange } from "../../store/review";
import { RootState } from "../../store/store";

const StarRating: React.FC = () => {
  const rate = useSelector((state: RootState) => state.review.rate);
  const starArray = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();

  const starHandler = (star: number, event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(rateChange(star));
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
